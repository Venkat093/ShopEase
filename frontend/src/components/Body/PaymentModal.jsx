import React, { useState,useContext } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { CREATE_ORDER } from "../constants";

import CartContext from '../context/CartContext';
const PaymentModal = ({ open, handleClose, orderData }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const { cart, clearCart } = useContext(CartContext);
  const handlePayment = async () => {
    const paymentDetails = { cardNumber, expiryDate, cvv };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/payments",
        paymentDetails
      );

      console.log("Payment response:", response.data.payment);
      console.log(response);
      if (response.data.payment === "success") {
        navigate("/order-confirmation");
      }

      try {
        const response = await axios.post(CREATE_ORDER, orderData);
        console.log("Place Order Response:", response.data);
        clearCart();
        navigate("/order-confirmation"); // Redirect to order confirmation page
      } catch (error) {
        console.error("Error placing order:", error);
       // setSnackbarMessage("Failed to place order");
       // setOpenSnackbar(true);
      }
      handleClose();
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.modalContainer}>
        <Typography variant="h6" gutterBottom>
          Payment Information
        </Typography>
        <TextField
          label="Card Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <TextField
          label="Expiry Date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <TextField
          label="CVV"
          variant="outlined"
          fullWidth
          margin="normal"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        <Box sx={styles.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handlePayment}>
            Pay
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    mt: 2,
  },
};

export default PaymentModal;
