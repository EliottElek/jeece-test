const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  creation: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: Object,
    required: true,
  },
  facturationAddress: {
    type: Object,
    required: true,
  },
  paymentMethod: {
    type: Object,
    required: true,
  },
});

const Order = mongoose.model("order", productSchema);
module.exports = Order;
