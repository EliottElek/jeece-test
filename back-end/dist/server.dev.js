"use strict";

require("dotenv").config();

var cors = require("cors");

var express = require("express");

var connectDB = require("./config/db");

var productRoutes = require("./routes/productRoutes");

var userRoutes = require("./routes/userRoutes");

var adminRoutes = require("./routes/adminRoutes");

var orderRoutes = require("./routes/orderRoutes");

connectDB();
var app = express();
app.use(express.json());
app.use(cors()); //routes

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/admins", adminRoutes);
app.use("/orders", orderRoutes);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});