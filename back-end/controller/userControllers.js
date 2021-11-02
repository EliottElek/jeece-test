const User = require("../models/User");
const Order = require("../models/Order");

const bcrypt = require("bcrypt");
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ auth: false, message: "Cet utilisateur n'existe pas." });
    else res.json({ auth: true, user: user });
  } catch (err) {
    console.error(err);
  }
};
const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({
        auth: false,
        message: "Identifiant ou mot de passe incorect.",
      });
    else if (bcrypt.compareSync(req.params.password, user.password)) {
      res.json({ auth: true, user: user });
    } else if (!bcrypt.compareSync(req.params.password, user.password)) {
      res.json({ auth: false, message: "Mauvais mot de passe." });
    }
  } catch (err) {
    console.error(err);
  }
};
const createAccount = async (req, res) => {
  try {
    console.log(req.body.user);
    const usr = await User.findOne({
      email: req.body.user.email,
    });
    if (usr !== null)
      res.json({ creation: false, message: "Cet email est déjà pris." });
    else {
      const user = await User.insertMany(req.body.user);
      res.json({
        creation: true,
        message: "Utilisateur créé avec succès.",
        user: user,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
const addToCart = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ auth: false, message: "Cet utilisateur n'existe pas." });
    else {
      const newcart = user.cart;
      newcart.push(req.body.item);
      await User.findOneAndUpdate({ _id: user.id }, { cart: newcart });
      res.json({ add: true, message: "Ajouté au panier avec succès." });
    }
  } catch (err) {
    res.json({ add: false, message: "Impossible d'ajouter au panier." });
  }
};
const getCart = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ auth: false, message: "Cet utilisateur n'existe pas." });
    else res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
  }
};
const addToWishlist = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ auth: false, message: "Cet utilisateur n'existe pas." });
    else {
      const newWishlist = user.wishlist;
      newWishlist.push(req.body.item);
      await User.findOneAndUpdate({ _id: user.id }, { wishlist: newWishlist });
      res.json({
        add: true,
        message: "Ajouté à la liste des souhaits avec succès.",
      });
    }
  } catch (err) {
    res.json({
      add: false,
      message: "Impossible d'ajouter à la liste des souhaits.",
    });
  }
};
const getWishlist = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ auth: false, message: "Cet utilisateur n'existe pas." });
    else res.json({ wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
  }
};
const getOrders = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ auth: false, message: "Cet utilisateur n'existe pas." });
    else {
      const orders = await Order.find({
        email: req.params.email,
      });
      res.json({ orders: orders });
    }
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  getUsers,
  getUserByEmail,
  login,
  createAccount,
  addToCart,
  getCart,
  addToWishlist,
  getWishlist,
  getOrders,
};
