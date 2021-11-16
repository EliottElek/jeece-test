require("dotenv").config();
const productsData = require("./data/products");
const adminsData = require("./data/admins");

const connectDB = require("./config/db");
const Product = require("./models/Product");
const Admin = require("./models/Admin");
const User = require("./models/User");
const Order = require("./models/Order");

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
const importOrderProducts = async () => {
  try {
    await Order.deleteMany({});
    console.log("Orders cleared correctly.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const importDataAdmins = async () => {
  try {
    await User.deleteMany({});
    await Admin.deleteMany({});
    await Admin.insertMany(adminsData);
    console.log("Admins imported correctly.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
importOrderProducts();
importDataProducts();
importDataAdmins();
