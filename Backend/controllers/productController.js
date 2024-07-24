
const ProductService = require('../services/productService');

const Product = require('../models/Product');
// GET all products
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new product
const createProduct = async (req, res) => {
    try {
        const newProduct = await ProductService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id; // Extract product ID from request parameters
   console.log(productId)
    try {
        const product = await ProductService.getProductById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updateData = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        await ProductService.deleteProduct(productId);
        res.status(204).end(); // No content response
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
