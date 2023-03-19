const cartController = require("../controllers/cart");
const express = require("express");

const router = express.Router();

router.post("/", cartController.cartAdd);

module.exports = router;
