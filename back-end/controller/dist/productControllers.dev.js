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
            message: "Erreur serveur."
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getProductsByCategory = function getProductsByCategory(req, res) {
  var products;
  return regeneratorRuntime.async(function getProductsByCategory$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.find({
            category: req.params.category
          }));

        case 3:
          products = _context2.sent;

          if (products.length === 0) {
            res.json({
              message: "Aucun résultat trouvé"
            });
          } else {}

          res.json({
            results: products,
            message: "".concat(products.length, " r\xE9sultat(s) trouv\xE9(s)")
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: "Erreur serveur."
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var getProductsByAuthor = function getProductsByAuthor(req, res) {
  var products;
  return regeneratorRuntime.async(function getProductsByAuthor$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.find({
            author: req.params.author
          }));

        case 3:
          products = _context3.sent;

          if (products.length === 0) {
            res.json({
              message: "Aucun résultat trouvé"
            });
          } else {}

          res.json({
            results: products,
            message: "".concat(products.length, " r\xE9sultat(s) trouv\xE9(s)")
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: "Erreur serveur."
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var getProductById = function getProductById(req, res) {
  var product;
  return regeneratorRuntime.async(function getProductById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 3:
          product = _context4.sent;
          res.json(product);
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: "Erreur serveur."
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var addRating = function addRating(req, res) {
  var item, newRating;
  return regeneratorRuntime.async(function addRating$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: req.params.id
          }));

        case 3:
          item = _context5.sent;

          if (!(item === null)) {
            _context5.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet article n'existe pas."
          });
          _context5.next = 13;
          break;

        case 8:
          newRating = item.rating;
          newRating.push(req.body.rate);
          _context5.next = 12;
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
          _context5.next = 18;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          res.json({
            add: false,
            message: "Impossible d'ajouter la note."
          });

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var addComment = function addComment(req, res) {
  var item, newComments;
  return regeneratorRuntime.async(function addComment$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: req.params.id
          }));

        case 3:
          item = _context6.sent;

          if (!(item === null)) {
            _context6.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet article n'existe pas."
          });
          _context6.next = 13;
          break;

        case 8:
          newComments = item.comments;
          newComments.push(req.body.comment);
          _context6.next = 12;
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
          _context6.next = 18;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);
          res.json({
            add: false,
            message: "Impossible d'ajouter le commentaire."
          });

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var modifyProduct = function modifyProduct(req, res) {
  var product, newP;
  return regeneratorRuntime.async(function modifyProduct$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: req.params.id
          }));

        case 3:
          product = _context7.sent;
          console.log(product);

          if (!(product === null)) {
            _context7.next = 9;
            break;
          }

          res.json({
            auth: false,
            message: "Ce produit n'existe pas."
          });
          _context7.next = 21;
          break;

        case 9:
          _context7.prev = 9;
          _context7.next = 12;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: req.params.id
          }, {
            $set: {
              author: req.body.author,
              title: req.body.title,
              price: req.body.price
            }
          }));

        case 12:
          newP = _context7.sent;
          console.log(newP);
          res.json({
            add: true,
            message: "Produit modifié avec succès."
          });
          _context7.next = 21;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](9);
          console.log(_context7.t0);
          res.json({
            add: false,
            message: "Impossible de modifier le produit."
          });

        case 21:
          _context7.next = 26;
          break;

        case 23:
          _context7.prev = 23;
          _context7.t1 = _context7["catch"](0);
          res.json({
            add: false,
            message: "Impossible de modifier le produit."
          });

        case 26:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 23], [9, 17]]);
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  addRating: addRating,
  addComment: addComment,
  modifyProduct: modifyProduct,
  getProductsByCategory: getProductsByCategory,
  getProductsByAuthor: getProductsByAuthor
};