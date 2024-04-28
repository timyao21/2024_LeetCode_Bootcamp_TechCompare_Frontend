import * as React from 'react';
import axios from 'axios';
import { Box, Rating, Typography, TextField} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';


const token = localStorage.getItem("authToken");
if (token!="signin"){
    axios.defaults.headers.common = {"signin": "sign"};
}
else{
  axios.defaults.headers.common = {"signout": "signout"};
}


const labels = {
  0: 'Unacceptable',
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function RateReview() {
  const { user2, login, logout } = useContext(UserContext);
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  //console.log("we got id " + id);

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [reviewText, setReviewText] = React.useState('');
  ///////
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('success');
  ///////

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };
  const email2 = user2.email;


  const handleReviewSubmit = async () => {
    try {
      const url = `http://techcompare.azurewebsites.net/techCompare/products/sendreview`;
      const body = {
        comment: reviewText,
        rating: value,
        time: new Date(), 
        email: email2 } // Static email for example; this can be dynamic if needed
      ;
      
      const response = await axios.post(url, body, {params: { id }}, {headers: {
        'Custom-Header': 'value', // 设置 Content-Type 头部
        'auth': token // 设置 Authorization 头部
      }});
      console.log("wrote data:" + response.data);
      setReviewText('');  // Clear the text field after successful submission
      setSnackbarMessage('Review submitted successfully');
      setOpenSnackbar(true);
      setSeverity('success');
    } catch (error) {
      console.error('Error submitting review', error);
      setSnackbarMessage('Failed to submit review');
      setOpenSnackbar(true);
      setSeverity('error');
    }    
    };
    
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };

  return (
    <Box sx={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'left' , p: 2}}>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Your Rating
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'left', width: '100%', mb: 2 }}>
        <Rating
          name="hover-feedback"
          value={value}
          precision={1.0}
          getLabelText={getLabelText}
          onChange={handleRatingChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      {value !== null && (
        <Box sx={{ ml: 2, width: 150, whiteSpace: 'nowrap'}}>
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
      </Box>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Your Review
      </Typography>
      <Box 
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '100%' }, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'left' 
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ width: '100%', mb:1 }}
          id="outlined-multiline-static"
          label=""
          multiline
          rows={4}
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
        />
      <Button className="ms-auto" size="small" variant="contained" color="primary" onClick={handleReviewSubmit}>
        Submit Review
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      </Box>
    </Box>
  );
}
