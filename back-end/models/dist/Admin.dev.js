"use strict";

var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
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
var Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;