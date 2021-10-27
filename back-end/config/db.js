require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://admin:admin@cluster0.69hmd.mongodb.net/products?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGODB Connection SUCCESS.");
  } catch (err) {
    console.error("MONGODB Connection FAILED.");
    process.exit(1);
  }
};
module.exports = connectDB;
