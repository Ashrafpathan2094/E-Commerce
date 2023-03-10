const userController = require("../controllers/user");
const express = require("express");

const router = express.Router();

//user api's
router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);

//user Profile Edit
router.post("/add-address", userController.userAddress);

module.exports = router;
