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
  var user, order, ord;
  return regeneratorRuntime.async(function createOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log(req.body);
          user = req.body.order.customer;

          if (!(user === null)) {
            _context2.next = 7;
            break;
          }

          res.json({
            creation: false,
            message: "Utilisateur introuvable."
          });
          _context2.next = 14;
          break;

        case 7:
          order = req.body.order;
          _context2.next = 10;
          return regeneratorRuntime.awrap(Order.insertMany(order));

        case 10:
          ord = _context2.sent;
          _context2.next = 13;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: user._id
          }, {
            cart: []
          }));

        case 13:
          res.json({
            creation: true,
            message: "Commande passée avec succès.",
            order: ord
          });

        case 14:
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = {
  getOrders: getOrders,
  createOrder: createOrder
};