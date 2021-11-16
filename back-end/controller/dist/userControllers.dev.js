"use strict";

var User = require("../models/User");

var Order = require("../models/Order");

var bcrypt = require("bcrypt");

var getUsers = function getUsers(req, res) {
  var users;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find({}));

        case 3:
          users = _context.sent;
          res.json(users);
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

var getUserByEmail = function getUserByEmail(req, res) {
  var user;
  return regeneratorRuntime.async(function getUserByEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context2.sent;
          if (user === null) res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });else res.json({
            auth: true,
            user: user
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
  var user;
  return regeneratorRuntime.async(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context3.sent;
          if (user === null) res.json({
            auth: false,
            message: "Identifiant ou mot de passe incorect."
          });else if (bcrypt.compareSync(req.params.password, user.password)) {
            res.json({
              auth: true,
              user: user
            });
          } else if (!bcrypt.compareSync(req.params.password, user.password)) {
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

var createAccount = function createAccount(req, res) {
  var usr, user;
  return regeneratorRuntime.async(function createAccount$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.user.email
          }));

        case 3:
          usr = _context4.sent;

          if (!(usr !== null)) {
            _context4.next = 8;
            break;
          }

          res.json({
            creation: false,
            message: "Cet email est déjà pris."
          });
          _context4.next = 12;
          break;

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(User.insertMany(req.body.user));

        case 10:
          user = _context4.sent;
          res.json({
            creation: true,
            message: "Utilisateur créé avec succès.",
            user: user
          });

        case 12:
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var addToCart = function addToCart(req, res) {
  var user, newcart;
  return regeneratorRuntime.async(function addToCart$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context5.sent;

          if (!(user === null)) {
            _context5.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });
          _context5.next = 13;
          break;

        case 8:
          newcart = user.cart;
          newcart.push(req.body.item);
          _context5.next = 12;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: user._id
          }, {
            cart: newcart
          }));

        case 12:
          res.json({
            add: true,
            message: "Ajouté au panier avec succès."
          });

        case 13:
          _context5.next = 18;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          res.json({
            add: false,
            message: "Impossible d'ajouter au panier."
          });

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var getCart = function getCart(req, res) {
  var user;
  return regeneratorRuntime.async(function getCart$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context6.sent;
          if (user === null) res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });else res.json({
            cart: user.cart
          });
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var addToWishlist = function addToWishlist(req, res) {
  var user, newWishlist;
  return regeneratorRuntime.async(function addToWishlist$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context7.sent;

          if (!(user === null)) {
            _context7.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });
          _context7.next = 13;
          break;

        case 8:
          newWishlist = user.wishlist;
          newWishlist.push(req.body.item);
          _context7.next = 12;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: user._id
          }, {
            wishlist: newWishlist
          }));

        case 12:
          res.json({
            add: true,
            message: "Ajouté à la liste des souhaits avec succès."
          });

        case 13:
          _context7.next = 18;
          break;

        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](0);
          res.json({
            add: false,
            message: "Impossible d'ajouter à la liste des souhaits."
          });

        case 18:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var removeFromWishlist = function removeFromWishlist(req, res) {
  var user, item, newWishlist;
  return regeneratorRuntime.async(function removeFromWishlist$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context8.sent;

          if (!(user === null)) {
            _context8.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });
          _context8.next = 13;
          break;

        case 8:
          item = req.body.item;
          newWishlist = user.wishlist.filter(function (e) {
            return e._id !== item._id;
          });
          _context8.next = 12;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: user._id
          }, {
            wishlist: newWishlist
          }));

        case 12:
          res.json({
            add: true,
            message: "Objet supprimé de la liste des souhaits avec succès."
          });

        case 13:
          _context8.next = 18;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          res.json({
            add: false,
            message: "Impossible d'ajouter à la liste des souhaits."
          });

        case 18:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var removeFromCart = function removeFromCart(req, res) {
  var user, item, newCart;
  return regeneratorRuntime.async(function removeFromCart$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context9.sent;

          if (!(user === null)) {
            _context9.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });
          _context9.next = 13;
          break;

        case 8:
          item = req.body.item;
          newCart = user.cart.filter(function (e) {
            return e._id !== item._id;
          });
          _context9.next = 12;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: user._id
          }, {
            cart: newCart
          }));

        case 12:
          res.json({
            add: true,
            message: "Objet supprimé du panier avec succès."
          });

        case 13:
          _context9.next = 18;
          break;

        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](0);
          res.json({
            add: false,
            message: "Impossible d'ajouter à la liste des souhaits."
          });

        case 18:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var emptyCart = function emptyCart(req, res) {
  var user;
  return regeneratorRuntime.async(function emptyCart$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context10.sent;

          if (!(user === null)) {
            _context10.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });
          _context10.next = 11;
          break;

        case 8:
          _context10.next = 10;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: user._id
          }, {
            cart: []
          }));

        case 10:
          res.json({
            add: true,
            message: "Panier vidé avec succès."
          });

        case 11:
          _context10.next = 16;
          break;

        case 13:
          _context10.prev = 13;
          _context10.t0 = _context10["catch"](0);
          res.json({
            add: false,
            message: "Impossible de vider le panier."
          });

        case 16:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var emptyWishlist = function emptyWishlist(req, res) {
  var user;
  return regeneratorRuntime.async(function emptyWishlist$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context11.sent;

          if (!(user === null)) {
            _context11.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });
          _context11.next = 11;
          break;

        case 8:
          _context11.next = 10;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: user._id
          }, {
            wishlist: []
          }));

        case 10:
          res.json({
            add: true,
            message: "Liste de souhaits vidée avec succès."
          });

        case 11:
          _context11.next = 16;
          break;

        case 13:
          _context11.prev = 13;
          _context11.t0 = _context11["catch"](0);
          res.json({
            add: false,
            message: "Impossible de vider la liste de souhaits."
          });

        case 16:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var getWishlist = function getWishlist(req, res) {
  var user;
  return regeneratorRuntime.async(function getWishlist$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context12.sent;
          if (user === null) res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });else res.json({
            wishlist: user.wishlist
          });
          _context12.next = 10;
          break;

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          console.error(_context12.t0);

        case 10:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getOrders = function getOrders(req, res) {
  var user, orders;
  return regeneratorRuntime.async(function getOrders$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
          }));

        case 3:
          user = _context13.sent;

          if (!(user === null)) {
            _context13.next = 8;
            break;
          }

          res.json({
            auth: false,
            message: "Cet utilisateur n'existe pas."
          });
          _context13.next = 12;
          break;

        case 8:
          _context13.next = 10;
          return regeneratorRuntime.awrap(Order.find({
            email: req.params.email
          }));

        case 10:
          orders = _context13.sent;
          res.json(orders);

        case 12:
          _context13.next = 17;
          break;

        case 14:
          _context13.prev = 14;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0);

        case 17:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports = {
  getUsers: getUsers,
  getUserByEmail: getUserByEmail,
  login: login,
  createAccount: createAccount,
  addToCart: addToCart,
  getCart: getCart,
  addToWishlist: addToWishlist,
  removeFromWishlist: removeFromWishlist,
  removeFromCart: removeFromCart,
  getWishlist: getWishlist,
  getOrders: getOrders,
  emptyWishlist: emptyWishlist,
  emptyCart: emptyCart
};