require("dotenv").config();
const productsData = require("./data/products");
const usersData = require("./data/users");

const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");

connectDB();

const importDataProducts = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(productsData);
    console.log("Products imported correctly.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const importDataUsers = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(usersData);
    console.log("Users imported correctly.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
importDataProducts();
importDataUsers();