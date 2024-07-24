const Order = require('../models/Order');

const placeOrder = async (userId, products, shippingAddress, status) => {
  try {
    const newOrder = new Order({
      userId,
      products,
      shippingAddress,
      status,
    });
    await newOrder.save();
    return newOrder;
  } catch (error) {
    console.log(error)
    throw new Error('Error placing order');
  }
};

const getOrdersByUserId = async (userId) => {
  try {
    const orders = await Order.find({ userId });
    return orders;
  } catch (error) {
    throw new Error('Error fetching orders');
  }
};

const getAllOrders = async () => {
  return Order.find();
};

module.exports = {
  placeOrder,
  getOrdersByUserId,
  getAllOrders
};
