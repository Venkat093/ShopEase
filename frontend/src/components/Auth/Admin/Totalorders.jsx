import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { All_ORDERS } from '../../constants';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(All_ORDERS);
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotalPrice = (products) => {
    return products.reduce((sum, product) => sum + product.listPrice, 0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Shipping Address</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell>
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                {order.shippingAddress.zip}, {order.shippingAddress.country}
              </TableCell>
              <TableCell>
                {order.products.map((product, index) => (
                  <div key={index}>
                    {product}
                  </div>
                ))}
              </TableCell>
              <TableCell>$1300</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
