"use strict";

var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  publishingDate: {
    type: String,
    required: true
  },
  rating: {
    type: Array,
    required: false
  },
  comments: {
    type: Array,
    required: false
  },
  category: {
    type: String,
    required: true
  }
});
var Product = mongoose.model("product", productSchema);
module.exports = Product;