require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
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

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server started at Port ${3000}`);
});

app.use("/user", routes);
app.use("/", () => {
  console.log("working");
  return res.status(200).json({ message: "Working" });
});
