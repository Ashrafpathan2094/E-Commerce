const productsController = require("../controllers/productsController");
const express = require("express");
const authMiddleware = require("../helper/authMiddleware");
const router = express.Router();

//admin api's
router.get("/getProduct", productsController.getAllProducts);
router.post("/addProduct", productsController.createProduct);
router.post("/deleteProduct", productsController.deleteProduct);

module.exports = router;
