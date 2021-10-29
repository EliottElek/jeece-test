const bcrypt = require("bcryptjs");
const users = [
  {
    firstname: "Eliott",
    lastname: "Morcillo",
    email: "eliott.morcillo@gmail.com",
    birthdate: "29/04/1999",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync()),
    cart: [],
    wishlist: [],
  },
];
module.exports = users;
