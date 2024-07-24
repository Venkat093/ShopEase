// product.service.js

const Product = require('../models/Product');

// Get all products
const getAllProducts = async () => {
    try {
        return await Product.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Create a new product
const createProduct = async (productData) => {
    try {
        const newProduct = new Product(productData);
        return await newProduct.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const getProductById = async (productId) => {
    try{
    return await Product.findById(productId); 
    }
    catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const deleteProduct = async (productId) => {
    await Product.findByIdAndDelete(productId);
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    deleteProduct
};
