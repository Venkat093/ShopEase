import React, { useContext, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { CREATE_ORDER } from '../constants';
import PaymentModal from './PaymentModal';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const {user} =useContext(UserContext)
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [orderProduct, setOrderProduct] = useState([])
  const handlePlaceOrder = async () => {
   
    console.log(cart.map(product => product._id),);
    const orderData = {
      userId: user.user._id, 
      products: cart.map(product => product._id),
      shippingAddress: shippingInfo,
      status: 'Success',
    };
    setOrderProduct(orderData)
    handleOpenPaymentModal();
    console.log(orderData);
    // try {
    //   const response = await axios.post(CREATE_ORDER, orderData);
    //   console.log('Place Order Response:', response.data);
    //   clearCart();
    //   navigate('/order-confirmation'); // Redirect to order confirmation page
    // } catch (error) {
    //   console.error('Error placing order:', error);
    //   setSnackbarMessage('Failed to place order');
    //   setOpenSnackbar(true);
    // }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleOpenPaymentModal = () => {
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
  };
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Grid container spacing={2}>
          {cart.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="subtitle1">
                {item.productName} - ${item.listPrice}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Quantity: {item.quantity}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" style={{ marginTop: '1rem' }}>
          Shipping Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              value={shippingInfo.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              value={shippingInfo.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              value={shippingInfo.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              value={shippingInfo.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="ZIP Code"
              fullWidth
              value={shippingInfo.zip}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              value={shippingInfo.country}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '2rem' }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Paper>
      <PaymentModal open={isPaymentModalOpen} handleClose={handleClosePaymentModal} orderData={orderProduct} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
     
    </Container>
  );
};

export default Checkout;
