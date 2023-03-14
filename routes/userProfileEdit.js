const userController = require("../controllers/user");
const express = require("express");

const router = express.Router();


//user Profile Edit
router.post("/add-address", userController.userAddressAdd);


module.exports = router;
