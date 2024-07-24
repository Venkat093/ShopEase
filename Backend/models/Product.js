const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    brand: { type: String },
    ram: { type: String },
    rom: { type: String },
    weight: { type: String },
    publisher: { type: String },
    listPrice: { type: Number, required: true },
    img: { type: String },
    description: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
