const cartController = require("../controllers/cart");
const express = require("express");

const router = express.Router();

router.post("/", cartController.cartAdd);
router.post("/delete", cartController.cartDelete);

module.exports = router;
