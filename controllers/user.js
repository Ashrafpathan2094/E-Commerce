const express = require("express");
const router = express.Router();
const User = require("../models/user");

exports.userRegister = async () => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const saveUser = await user.save();
    res
      .status(201)
      .json({ message: "User Registered SuccessFully", user: saveUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not Register User", error: err.message });
  }
};
