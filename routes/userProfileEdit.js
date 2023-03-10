const userController = require("../controllers/user");
const express = require("express");

const router = express.Router();


//user Profile Edit
router.post("/add-address", userController.userAddress);


module.exports = router;
