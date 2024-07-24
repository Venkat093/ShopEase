const authService = require('../services/authService');

const signup = async (req, res) => {
  try {
   
    const user = await authService.signup(req.body.username, req.body.email, req.body.password, req.body.address, req.body.mobile);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  try {
    const { user, token } = await authService.login(req.body.email, req.body.password);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};
const Getdata = async (req, res) => {
   console.log("venkatas")
}

const fetchUserByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await authService.fetchUserByUserId(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { signup, login, Getdata, fetchUserByUserId };
