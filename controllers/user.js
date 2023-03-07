const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

exports.userRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExist = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (userExist) {
      return res
        .status(422)
        .json({ error: "Email or Phone number already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const saveUser = await user.save();
    user.password = undefined;
    return res
      .status(201)
      .json({ message: "User Registered SuccessFully", user: saveUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not Register User", error: err.message });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    user.password = undefined;
    return res.status(201).json({ message: "Login Succes", user: user });
  } else {
    return res.status(409).json({ message:"Invalid Credential",user:req.body });
  }
};
