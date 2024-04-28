import * as React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../context/UserContext';
const token = localStorage.getItem("authToken");
if (token!="signin"){
    axios.defaults.headers.common = {"signin": "sign"}
}
else{
  axios.defaults.headers.common = {"signout": "signout"}
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { user2, login, logout } = useContext(UserContext); // 使用 useContext 钩子访问 Context

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //API
    const apiUrl = `https://techcompare.azurewebsites.net/techCompare/user/login`;

    const singinRequest = {
      email: data.get('email'),
      password: data.get('password')
    };

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    axios.post(apiUrl, singinRequest,{headers: {
      'Custom-Header': 'value', // 设置 Content-Type 头部
      'auth': token // 设置 Authorization 头部
    }})
    .then(response => {
        setUser(response.data);
        console.log(123); // tr
        console.log(response); // true or false
        localStorage.setItem('email', data.get('email'));
        localStorage.setItem('authToken', "signin");  // Save the token
        console.log(localStorage.getItem('email'));
        if (response.data){
          console.log(data.get('email'));
          login(data.get('email'));
          setShowAlert(false);
          navigate('/');
        }
        else{
          setShowAlert(true);
        }
    })
    .catch(error => {
        console.log('Response parsing failed. Error: ', error);
        setShowAlert(true);
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Alert */}
          {showAlert && <Alert severity="warning">You have entered an invalid username or password</Alert>}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}