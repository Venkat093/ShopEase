import React, { useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Paper,
  Grid,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext'; // Import UserContext
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext); // Get token from UserContext
  const navigate = useNavigate();

  useEffect(()=>{
console.log(cart)
let ids = cart.map(product => product._id);

console.log(ids);
  },[])

  const handleQuantityChange = (itemId, newQuantity) => {
    // Implement quantity change logic here
  };

  const handlePlaceOrder = () => {
    // Implement your order placement logic here
    // Redirect to order confirmation or thank you page after successful order placement
    navigate('/checkout');
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.listPrice , 0).toFixed(2);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1" style={{ marginTop: '1rem' }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
              <List>
                {cart.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={item.img}
                          alt={item.productName}
                          style={{ width: '100px', height: '100px' }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6" component="span">
                            {item.productName}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="span"
                            >
                              Price: ${item.listPrice}
                            </Typography>
                            <br />
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="span"
                            >
                              In Stock
                            </Typography>
                            <br />
                            <FormControl variant="outlined" size="small">
                              <InputLabel>Qty</InputLabel>
                              <Select
                                value={item.quantity || 1}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                label="Qty"
                              >
                                {[...Array(10).keys()].map((num) => (
                                  <MenuItem key={num + 1} value={num + 1}>
                                    {num + 1}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </React.Fragment>
                        }
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </ListItem>
                    {index < cart.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: '1rem' }}
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
              <Typography variant="h6">Subtotal ({cart.length} items):</Typography>
              <Typography variant="h5" gutterBottom>
                {calculateSubtotal()}
              </Typography>
              <Box>
                <Carousel>
                  {cart.map((item, index) => (
                    <div key={index}>
                      <img src={item.img} alt={item.productName} />
                      <p className="legend">{item.productName}</p>
                    </div>
                  ))}
                </Carousel>
              </Box>
              {user?.token ? ( // Render button only if token is present (user is logged in)
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '1rem' }}
                  onClick={handlePlaceOrder}
                >
                  Proceed to checkout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '1rem' }}
                  onClick={() => navigate('/login')} // Redirect to login page if not logged in
                >
                  Login to Checkout
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
