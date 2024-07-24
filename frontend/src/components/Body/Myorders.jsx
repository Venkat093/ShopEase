import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from "../context/UserContext";
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Container, Box, Typography, Grid, Paper, Chip, Avatar } from '@mui/material';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/orders/${id}`);
        
        const fetchedOrders = response.data.orders;
        const total = fetchedOrders.reduce((sum, order) => sum + order.totalprice, 0);

        setOrders(fetchedOrders);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [id]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 3, bgcolor: '#f5f7fa', borderRadius: 1 }}>
        <Typography variant="h4" gutterBottom>
          Order #{id}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Chip label="Paid" color="success" />
          <Chip label="Unfulfilled" color="warning" />
        </Box>
        <Typography variant="h5" gutterBottom>
          Total Price: $2600
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Overview
              </Typography>
              <Box>
                {orders.map(order => (
                  <Box key={order._id} sx={{ display: 'flex', gap: 2, mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                    <Carousel showThumbs={false} dynamicHeight={false} infiniteLoop useKeyboardArrows>
                      {order.products.map(product => (
                        <div key={product.productId}>
                          <img src={product.img} alt={product.productName} style={{ maxHeight: 150 }} />
                        </div>
                      ))}
                    </Carousel>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{order.products[0].productName}</Typography>
                      <Typography>Item: {order.products[0].productId}</Typography>
                      <Typography>Material: {order.products[0].material}</Typography>
                      <Typography>Color: {order.products[0].color}</Typography>
                      <Typography variant="h6" color="primary">$1300</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Customer
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar src="customer_image_url" />
                <Box>
                  <Typography variant="h6">David Tempelhov</Typography>
                  <Typography>david_tempelhov@gmail.com</Typography>
                  <Typography>+38 (050) 071-91-98</Typography>
                </Box>
              </Box>
              <Typography><strong>Shipping address:</strong> 39, Hilbert Shore, New York, NY, United States</Typography>
              <Typography><strong>Billing address:</strong> 39, Hilbert Shore, New York, NY, United States</Typography>
            </Paper>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Risk level
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" color="primary">36</Typography>
                <Typography>Medium level</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyOrders;
