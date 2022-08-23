const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  if (!email || !password) {
    throw Error("please fill al the fields");
  }

  if (exists) {
    throw Error("email in use");
  }
  if (!validator.isEmail(email)) {
    throw Error("enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("enter a strong password");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
