const Products = require("../models/products");
const { ObjectId } = require("mongodb");
const { productSchema } = require("../joiSchemas/productSchema");

exports.getAllProducts = async (req, res) => {
  try {
    user = req.user;
    const products = await Products.find({
      ...req.body,
      isDeleted: false,
    }).sort({
      id: 1,
    });

    if (products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    } else {
      return res.status(200).json({ products: products });
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

    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(403).json({ error: error.message });
    }
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

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params;
    const deleted = await Products.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } }
    );

    if (deleted.isDeleted === true) {
      return res
        .status(201)
        .json({ message: "Deleted SuccessFully", Product: deleted });
    }
  } catch (err) {
    return res
      .status(404)
      .json({ message: "No products found", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateProduct = req.body;

    if (!ObjectId.isValid(productId)) {
      return res.status(404).json({ message: "Invalid Product ID" });
    }

    const updated = await Products.findByIdAndUpdate(productId, updateProduct, {
      new: true,
    });

    return res
      .status(201)
      .json({ message: "Product Updated SuccessFully", Product: updated });
  } catch (err) {
    return res
      .status(409)
      .json({ message: "Failed to Update Products", error: err.message });
  }
};

exports.searchProductsByTitle = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ error: "Title parameter is missing in the body" });
    }

    const products = await Products.find({
      title: { $regex: new RegExp(title, "i") }, // Case-insensitive search
      isDeleted: false,
    }).sort({
      id: 1,
    });

    if (products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    } else {
      return res.status(200).json({ products: products });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
