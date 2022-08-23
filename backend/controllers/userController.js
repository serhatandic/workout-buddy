const User = require("../models/userModel");

const loginUser = async (req, res) => {
  res.json({ msg: "logged in" });
};
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

module.exports = { loginUser, signupUser };
