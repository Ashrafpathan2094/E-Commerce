const express = require("express");
const router = express.Router();
const Products = require("../models/products");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find(req.body).sort({
      id: 1,
    });

    if (products.length === 0) {
      res.status(404).json({ error: "No products found" });
    } else {
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
