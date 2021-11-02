const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  customer: {
    type: Object,
    required: true,
  },
  articles: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  date:{
      type:Array,
      required:true,
  }
});

const Order = mongoose.model("order", productSchema);
module.exports = Order;
