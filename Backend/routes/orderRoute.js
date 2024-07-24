const express = require("express");

const {
  placeOrder,
  getAllOrders,
  getOrdersByUserId,
} = require("../controllers/orderController");
const router = express.Router();
router.post("/place-order", placeOrder);

router.get("/:userId", getOrdersByUserId);
router.get('/', getAllOrders); 
module.exports = router;
