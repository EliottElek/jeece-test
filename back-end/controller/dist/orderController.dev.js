"use strict";

var Order = require("../models/Order");

var User = require("../models/User");

var getOrders = function getOrders(req, res) {
  var orders;
  return regeneratorRuntime.async(function getOrders$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Order.find({}));

        case 3:
          orders = _context.sent;
          res.json(orders);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: "Server error."
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var createOrder = function createOrder(req, res) {
  var email, order, ord;
  return regeneratorRuntime.async(function createOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log(req.body);
          email = req.body.order.email;
          order = req.body.order;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Order.insertMany(order));

        case 6:
          ord = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            email: email
          }, {
            cart: []
          }));

        case 9:
          res.json({
            creation: true,
            message: "Commande passée avec succès.",
            order: ord
          });
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

module.exports = {
  getOrders: getOrders,
  createOrder: createOrder
};