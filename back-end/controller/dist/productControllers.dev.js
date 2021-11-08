"use strict";

var Product = require("../models/Product");

var getAllProducts = function getAllProducts(req, res) {
  var products;
  return regeneratorRuntime.async(function getAllProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.find({}));

        case 3:
          products = _context.sent;
          res.json(products);
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

var getProductById = function getProductById(req, res) {
  var product;
  return regeneratorRuntime.async(function getProductById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 3:
          product = _context2.sent;
          res.json(product);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: "Server error."
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var addRating = function addRating(req, res) {
  var item, newRating;
  return regeneratorRuntime.async(function addRating$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: req.params.id
          }));

        case 3:
          item = _context3.sent;

          if (!(item === null)) {
            _context3.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet article n'existe pas."
          });
          _context3.next = 13;
          break;

        case 8:
          newRating = item.rating;
          newRating.push(req.body.rate);
          _context3.next = 12;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: item._id
          }, {
            rating: newRating
          }));

        case 12:
          res.json({
            add: true,
            message: "Note ajoutée avec succès."
          });

        case 13:
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          res.json({
            add: false,
            message: "Impossible d'ajouter la note."
          });

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var addComment = function addComment(req, res) {
  var item, newComments;
  return regeneratorRuntime.async(function addComment$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: req.params.id
          }));

        case 3:
          item = _context4.sent;

          if (!(item === null)) {
            _context4.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet article n'existe pas."
          });
          _context4.next = 13;
          break;

        case 8:
          newComments = item.comments;
          newComments.push(req.body.comment);
          _context4.next = 12;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: item._id
          }, {
            comments: newComments
          }));

        case 12:
          res.json({
            add: true,
            message: "Commentaire ajouté avec succès."
          });

        case 13:
          _context4.next = 18;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          res.json({
            add: false,
            message: "Impossible d'ajouter le commentaire."
          });

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  addRating: addRating,
  addComment: addComment
};