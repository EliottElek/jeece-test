"use strict";

var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  creation: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: Object,
    required: true
  },
  facturationAddress: {
    type: Object,
    required: true
  },
  paymentMethod: {
    type: Object,
    required: true
  }
});
var Order = mongoose.model("order", orderSchema);
module.exports = Order;