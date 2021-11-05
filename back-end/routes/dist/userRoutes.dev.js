"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controller/userControllers"),
    getUsers = _require.getUsers,
    getUserByEmail = _require.getUserByEmail,
    login = _require.login,
    createAccount = _require.createAccount,
    addToCart = _require.addToCart,
    getCart = _require.getCart,
    addToWishlist = _require.addToWishlist,
    getWishlist = _require.getWishlist,
    getOrders = _require.getOrders,
    removeFromWishlist = _require.removeFromWishlist,
    removeFromCart = _require.removeFromCart; //@desc GET all users from db
//@route GET /users
//@access Public


router.get("/", getUsers);
router.post("/", createAccount);
router.post("/:email/cart", addToCart);
router.get("/:email/cart", getCart);
router.post("/:email/wishlist", addToWishlist);
router.get("/:email/wishlist", getWishlist);
router.post("/:email/wishlist/remove", removeFromWishlist);
router.post("/:email/cart/remove", removeFromCart);
router.get("/:email/orders", getOrders); //@desc GET a user by id from db
//@route GET /user/:id
//@access Public

router.get("/:email", getUserByEmail);
router.get("/:email/:password", login);
module.exports = router;