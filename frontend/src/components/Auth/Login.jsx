import React, { useState, useContext } from 'react';
import { Container, Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LOGIN_API } from '../constants';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom'; // Import Link as RouterLink for routing

import UserContext from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(LOGIN_API, { email, password });
      console.log('Login response:', response.data);
      setUser(response.data);
      navigate('/Home');
    } catch (error) {
      console.error('Error logging in:', error);
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
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '20px 0' }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
