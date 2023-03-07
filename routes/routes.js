const userController = require("../controllers/user");
const express = require("express");

const router = express.Router();

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);

module.exports = router;
