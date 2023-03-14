const productsController = require("../controllers/productsController");
const express = require("express");

const router = express.Router();

//user api's
router.get("/", productsController.getAllProducts);

module.exports = router;
