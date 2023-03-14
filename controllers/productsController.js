const express = require("express");
const router = express.Router();
const Products = require("../models/products");
const authMiddleware = require("../helper/authMiddleware");

exports.getAllProducts = async (req, res) => {
  try {
    user = req.user;
    const products = await Products.find(req.body).sort({
      id: 1,
    });

    if (products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    } else {
      return res.status(200).json({ products: products, user: user });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    } = req.body;

    const newProduct = new Products({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    });

    const saveProduct = await newProduct.save();
    return res.status(201).json({
      message: "Product Saved SuccessFully",
      product: saveProduct,
    });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Error in Product Saving ", error: err.message });
  }
};
