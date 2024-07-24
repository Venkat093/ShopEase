const express = require('express');
const { signup, login, Getdata,fetchUserByUserId } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get("/user",Getdata);

router.get('/:id', fetchUserByUserId);

module.exports = router;
