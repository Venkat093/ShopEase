const paymentService = require('../services/PaymentService');

const createPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    console.log(paymentData)
    const payment = await paymentService.createPayment(paymentData);
    res.status(201).json({payment:"success"});
  } catch (error) {
    res.status(500).json({ message: 'Failed to process payment', error: error.message });
  }
};

module.exports = {
  createPayment,
};
