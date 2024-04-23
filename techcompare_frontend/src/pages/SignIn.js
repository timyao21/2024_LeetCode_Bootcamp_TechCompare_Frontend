import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Navigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Collapse } from '@mui/material';
import { setToken, setEmail } from '../app/userInfoReducer';
import { useSelector, useDispatch } from 'react-redux';

const defaultTheme = createTheme();

export default function SignIn() {
  // const token = useSelector(state => state.userInfo.token)
  const dispatch = useDispatch()
  const [user, setUser] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(showAlert){
      setOpen(open => true);
      const timeoutId = setTimeout(() => {
          setOpen(open => false)
          setShowAlert(showAlert => false)
      }, 2000)
      return () => clearTimeout(timeoutId)
    }
  }, [showAlert])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //API
    const apiUrl = `http://localhost:8080/techCompare/user/login`;

    const singinRequest = {
      email: data.get('email'),
      password: data.get('password')
    };

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    axios.post(apiUrl, singinRequest)
    .then(response => {
        dispatch(setToken(response.headers)); // true or false
        if (response.data){
          setUser(true);
        }
        else{
          setShowAlert(showAlert => true);
        }
    })
    .catch(error => {
        console.log('Response parsing failed. Error: ', error);
        setShowAlert(showAlert => true);
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
          {
            user ? <Navigate replace to="/"/> : 
            <Collapse in={open}>
              <Alert severity="warning">You have entered an invalid username or password</Alert>
            </Collapse>
          }
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
                <Link href="/signup" variant="body2">
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