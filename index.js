require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userLogin = require("./routes/userLogin");
const userProfileEdit = require("./routes/userProfileEdit");
const products = require("./routes/productsRoute");
const admin = require("./routes/adminRoutes");
const cart = require("./routes/cart");
const authMiddleware = require("./helper/authMiddleware");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log("Database Connection Error");
  console.log(error);
});

database.once("connected", () => {
  console.log("Connected to DataBase");
});
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  const response = {
    message: 'Server is working!'
  };

  res.json(response);
});
app.listen(3000, () => {
  console.log(`Server started at Port ${3000}`);
});

app.use("/user", userLogin);
app.use(authMiddleware);

app.use("/profile-edit", userProfileEdit);
app.use("/products", products);
app.use("/cart", cart);
app.use("/admin", admin);
