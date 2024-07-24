const Payment = require('../models/Payment');

const createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  await payment.save();
  return payment;
};

module.exports = {
  createPayment,
};
