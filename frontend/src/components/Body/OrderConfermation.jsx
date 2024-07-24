import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const OrderConfirmation = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h6" gutterBottom>
          Thank you for your order!
        </Typography>
        <Typography variant="body1">
          Your order has been successfully placed. You will receive an email confirmation shortly.
        </Typography>
        {/* You can optionally display order details here */}
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;
