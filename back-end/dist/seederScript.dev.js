"use strict";

require("dotenv").config();

var productsData = require("./data/products");

var adminsData = require("./data/admins");

var connectDB = require("./config/db");

var Product = require("./models/Product");

var Admin = require("./models/Admin");

var User = require("./models/User");

var Order = require("./models/Order");

connectDB();

var importDataProducts = function importDataProducts() {
  return regeneratorRuntime.async(function importDataProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.deleteMany({}));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(Product.insertMany(productsData));

        case 5:
          console.log("Products imported correctly.");
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          process.exit(1);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var importOrderProducts = function importOrderProducts() {
  return regeneratorRuntime.async(function importOrderProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Order.deleteMany({}));

        case 3:
          console.log("Orders cleared correctly.");
          _context2.next = 10;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          process.exit(1);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var importDataAdmins = function importDataAdmins() {
  return regeneratorRuntime.async(function importDataAdmins$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.deleteMany({}));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(Admin.deleteMany({}));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(Admin.insertMany(adminsData));

        case 7:
          console.log("Admins imported correctly.");
          process.exit();
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          process.exit(1);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

importOrderProducts();
importDataProducts();
importDataAdmins();