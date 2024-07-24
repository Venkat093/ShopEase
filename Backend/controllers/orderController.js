
const orderService = require('../services/orderService');
const productService = require('../services/productService');
const placeOrder = async (req, res) => {
  const { userId, products, shippingAddress, status } = req.body;
  try {
    const order = await orderService.placeOrder(userId, products, shippingAddress, status);
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
};
const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch orders for the user
    const orders = await orderService.getOrdersByUserId(userId);

    // Extract all unique product IDs from all orders
    const productIds = [...new Set(orders.reduce((acc, order) => {
      acc.push(...order.products);
      return acc;
    }, []))];

    // Fetch product details for all product IDs
    const productPromises = productIds.map(productId => productService.getProductById(productId));
    const products = await Promise.all(productPromises);

    // Replace product IDs with product details in each order
    const ordersWithProducts = orders.map(order => ({
      ...order,
      products: order.products.map(productId => products.find(p => p._id.toString() === productId)),
      totalPrice : order.products.reduce((sum, product) => sum + product.listPrice, 0)
    }));

    // Return the updated orders object with detailed product information
    res.status(200).json({ orders: ordersWithProducts });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};
  

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    const productIds = [...new Set(orders.reduce((acc, order) => {
      acc.push(...order.products);
      return acc;
    }, []))];

    const productPromises = productIds.map(productId => productService.getProductById(productId));
    const products = await Promise.all(productPromises);



    const ordersWithProducts = orders.map(order => ({
      ...order,
      totalPrice: order.products.reduce((sum, product) => sum + product.listPrice, 0)
    }));

    res.status(200).json( orders );
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrdersByUserId,
  getAllOrders
};
