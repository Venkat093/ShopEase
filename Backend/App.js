// app.js (or server.js)

const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/Db.js');
const authRoutes =require('./routes/authRoute.js');
const productRoutes= require('./routes/productRoutes.js');
const reviewRoutes = require('./routes/reviewRoute.js');
const paymentRoute =require('./routes/paymentroute.js');
const orderRoutes = require('./routes/orderRoute.js');
//const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
// Connect to MongoDB
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews',reviewRoutes)
app.use('/api/payments',paymentRoute)
app.use('/api/orders', orderRoutes);
const PORT = 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
