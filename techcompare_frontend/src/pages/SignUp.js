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

export default function SignUp() {
  const { user2, login, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("signnupppp");
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    // const singupRequest = {
    //   email: data.get('email'),
    //   password: data.get('password')
    // };

    //API url
    const apiUrlRegister = `http://techcompare.azurewebsites.net/techCompare/user/register`;

  const email = data.get('email');  // 从注册表单获取用户输入的邮箱
  const password = data.get('password'); // 从注册表单获取用户输入的密码
  const wishlist = []; // 从注册表单获取用户的愿望清单
  const firebaseId = ''; // 从注册表单获取用户的 Firebase ID，如果有的话

  // 构造注册请求的用户对象
  const user = {
    email: email,
    password: password,
    wishlist: wishlist,
    firebase_id: firebaseId
    // 其他字段...
  };

    axios.post(apiUrlRegister, user,{headers: {
      'Custom-Header': 'value', // 设置 Content-Type 头部
      'auth': token // 设置 Authorization 头部
    }})
      .then(response => {
        setUser(response.data);
        console.log(response.data)
        if (response.data) {
          setShowAlert(false);
          login(email);
          navigate('/');
        }
        else{
          setShowAlert(true);
        }
      })
      .catch(error => {
        console.log('Response parsing failed. Error: ', error);
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
          {showAlert && <Alert severity="error">You already have an account.</Alert>}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}