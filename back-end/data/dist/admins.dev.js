"use strict";

var bcrypt = require("bcryptjs");

var admins = [{
  admin: true,
  firstname: "Eliott",
  lastname: "Morcillo",
  email: "eliott.morcillo@gmail.com",
  birthdate: "29/04/1999",
  password: bcrypt.hashSync("1234", bcrypt.genSaltSync())
}];
module.exports = admins;