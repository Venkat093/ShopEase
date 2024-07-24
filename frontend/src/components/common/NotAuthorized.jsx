import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" gutterBottom>
          You are not authorized to access this page.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoBack} sx={{ mt: 3 }}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default NotAuthorized;
