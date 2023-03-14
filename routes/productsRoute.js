const productsController = require("../controllers/productsController");
const express = require("express");
const authMiddleware = require("../helper/authMiddleware");
const router = express.Router();

//products api's
router.get("/", productsController.getAllProducts);
// router.post("/addProduct", productsController.createProduct);

module.exports = router;
