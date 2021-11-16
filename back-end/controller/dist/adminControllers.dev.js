"use strict";

var Admin = require("../models/Admin");

var bcrypt = require("bcrypt");

var getAdmins = function getAdmins(req, res) {
  var admins;
  return regeneratorRuntime.async(function getAdmins$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Admin.find({}));

        case 3:
          admins = _context.sent;
          res.json(admins);
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

var getAdminByEmail = function getAdminByEmail(req, res) {
  var admin;
  return regeneratorRuntime.async(function getAdminByEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Admin.findOne({
            email: req.params.email
          }));

        case 3:
          admin = _context2.sent;
          if (admin === null) res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });else res.json({
            auth: true,
            admin: admin
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var login = function login(req, res) {
  var admin;
  return regeneratorRuntime.async(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Admin.findOne({
            email: req.params.email
          }));

        case 3:
          admin = _context3.sent;
          if (admin === null) res.json({
            auth: false,
            message: "Identifiant ou mot de passe incorect."
          });else if (bcrypt.compareSync(req.params.password, admin.password)) {
            res.json({
              auth: true,
              admin: admin
            });
          } else if (!bcrypt.compareSync(req.params.password, admin.password)) {
            res.json({
              auth: false,
              message: "Mauvais mot de passe."
            });
          }
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  getAdmins: getAdmins,
  getAdminByEmail: getAdminByEmail,
  login: login
};