const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  publishingDate: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
