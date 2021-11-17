const User = require("../models/User");
const Order = require("../models/Order");
const Admin = require("../models/Admin");

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
    const admin = await Admin.findOne({
      email: req.params.email,
    });
    if (admin !== null)
      res.json({ success: false, message: "Cet email est déjà pris." });
    else {
      try {
        const usr = await User.findOne({
          email: req.body.user.email,
        });
        if (usr !== null)
          res.json({ success: false, message: "Cet email est déjà pris." });
        else {
          const user = await User.insertMany(req.body.user);
          res.json({
            success: true,
            message: "Utilisateur créé avec succès.",
            user: user,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  } catch {
    res.json({ sucess: false, message: "Cet email est déjà pris." });
  }
};

const modifyUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ success: false, message: "Cet utilisateur n'existe pas." });
    else {
      try {
        const newUser = await User.findOneAndUpdate(
          { email: req.params.email },
          {
            $set: {
              email: req.body.email,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              avatarUrl: req.body.avatarUrl,
            },
          },
          { new: true }
        );
        console.log(newUser);
        res.json({
          success: true,
          message: "Utilisateur modifié avec succès.",
        });
      } catch (err) {
        console.log(err);
        res.json({
          success: false,
          message: "Impossible de modifier l'utilisateur.",
        });
      }
    }
  } catch (err) {
    res.json({
      success: false,
      message: "Impossible de modifier le produit.",
    });
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
      await User.findOneAndUpdate({ _id: user._id }, { cart: newcart });
      res.json({ success: true, message: "Ajouté au panier avec succès." });
    }
  } catch (err) {
    res.json({ success: false, message: "Impossible d'ajouter au panier." });
  }
};
const getCart = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ success: false, message: "Cet utilisateur n'existe pas." });
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
      await User.findOneAndUpdate({ _id: user._id }, { wishlist: newWishlist });
      res.json({
        success: true,
        message: "Ajouté à la liste des souhaits avec succès.",
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "Impossible d'ajouter à la liste des souhaits.",
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ success: false, message: "Cet utilisateur n'existe pas." });
    else {
      const item = req.body.item;
      let newWishlist = user.wishlist.filter(function (e) {
        return e._id !== item._id;
      });
      await User.findOneAndUpdate({ _id: user._id }, { wishlist: newWishlist });
      res.json({
        success: true,
        message: "Objet supprimé de la liste des souhaits avec succès.",
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "Impossible d'ajouter à la liste des souhaits.",
    });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ success: false, message: "Cet utilisateur n'existe pas." });
    else {
      const item = req.body.item;
      let newCart = user.cart.filter(function (e) {
        return e._id !== item._id;
      });
      await User.findOneAndUpdate({ _id: user._id }, { cart: newCart });
      res.json({
        success: true,
        message: "Objet supprimé du panier avec succès.",
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "Impossible d'ajouter à la liste des souhaits.",
    });
  }
};
const emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ success: false, message: "Cet utilisateur n'existe pas." });
    else {
      await User.findOneAndUpdate({ _id: user._id }, { cart: [] });
      res.json({
        success: true,
        message: "Panier vidé avec succès.",
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "Impossible de vider le panier.",
    });
  }
};
const emptyWishlist = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ auth: false, message: "Cet utilisateur n'existe pas." });
    else {
      await User.findOneAndUpdate({ _id: user._id }, { wishlist: [] });
      res.json({
        add: true,
        message: "Liste de souhaits vidée avec succès.",
      });
    }
  } catch (err) {
    res.json({
      add: false,
      message: "Impossible de vider la liste de souhaits.",
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
      res.json(orders);
    }
  } catch (err) {
    console.error(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ success: false, message: "Cet utilisateur n'existe pas." });
    else {
      try {
      await User.findOneAndDelete({
        email: req.params.email,
      })
      res.json({
        success: true,
        message: "Utilisateur supprimé avec succès.",
      });
    }
    catch (e){
      res.json({
        success: false,
        message: "Utilisateur de supprimer le produit.",
      });
    }
    }
  }
  catch (e) {

  }
}
module.exports = {
  getUsers,
  getUserByEmail,
  login,
  modifyUser,
  createAccount,
  addToCart,
  getCart,
  addToWishlist,
  removeFromWishlist,
  removeFromCart,
  getWishlist,
  getOrders,
  emptyWishlist,
  emptyCart,
  deleteUser,
};
