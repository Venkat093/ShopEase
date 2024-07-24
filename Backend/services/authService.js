const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (username, email, password, address, mobile) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({
    username,
    email,
    password: hashedPassword,
    address,
    mobile,
  });

  // Save user to database
  await user.save();

  // Generate JWT token for user
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    'your_jwt_secret', // Replace with your actual JWT secret key
    { expiresIn: '1h' } // Token expiration time
  );

  // Return user and token
  return { user, token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(user);
  console.log(hashedPassword);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
  console.log(user)

  return { user, token };
};


const Getdata = async () =>{
    return "Sai"
}
const fetchUserByUserId = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Error fetching user by ID");
  }
};


module.exports = { signup, login , Getdata, fetchUserByUserId};
