const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId:{type:String, required: true},
  products: [
    {type:String, required: true}
    
  ],
  shippingAddress: {
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    address: {type:String, required: true},
    city: {type:String, required: true},
    zip: {type:String, required: true},
    country: {type:String, required: true},
  },
  status: {type:String, required: true},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
