// src/Signup.js

import React, { useState,useContext } from 'react';

import { Container, Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { SIGNUP_API } from '../constants';
import UserContext from '../context/UserContext';
import { useNavigate  } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate  = useNavigate ();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(SIGNUP_API, { username, email, password, address, mobile });
      setUser(response.data);
      console.log(response.data);
      navigate('/Home');
    } catch (error) {
      console.error('There was an error signing up!', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Grid container justifyContent="center">
          <Avatar style={{ backgroundColor: '#3f51b5' }}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Typography component="h1" variant="h5" align="center" style={{ margin: '20px 0' }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile"
            name="mobile"
            autoComplete="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '20px 0' }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
