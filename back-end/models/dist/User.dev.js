"use strict";

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: false
  },
  birthdate: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: Array,
    required: false
  },
  wishlist: {
    type: Array,
    required: false
  }
});
var User = mongoose.model("user", userSchema);
module.exports = User;