const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Address = require("../models/address");

//User Register
exports.userRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // check if  user already exists
    const userExist = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (userExist) {
      return res
        .status(422)
        .json({ error: "Email or Phone number already exists" });
    }

    //encrypting password
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

// user Login
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // check if email valid and decrypt password for check
  if (user && (await bcrypt.compare(password, user.password))) {
    user.password = undefined;
    return res.status(201).json({ message: "Login Succes", user: user });
  } else {
    return res
      .status(409)
      .json({ message: "Invalid Credential", user: req.body });
  }
};

//User Add Address
exports.userAddress = async (req, res) => {
  try {
    //check if user id is valid
    const user = await User.find({_id:req.body.userId});
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not found", user: req.body.userId });
    }
    const address = new Address({
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      user: user._id,
    });
    await address.save();
    return res.status(201).json({
      message: `Address Added to ${user[0].email}`,
      Address: address,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message, user: req.body });
  }
};
