const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes for products
router.get('/products', productController.getAllProducts);
router.post('/createProducts', productController.createProduct);

router.get('/:id', productController.getProductById);

router.put('/update/:id', productController.updateProduct);
// Define other routes for getProductById, updateProduct, deleteProduct, etc.

router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
