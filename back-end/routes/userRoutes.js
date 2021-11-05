const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserByEmail,
  login,
  createAccount,
  addToCart,
  getCart,
  addToWishlist,
  getWishlist,
  getOrders,
  removeFromWishlist,
  removeFromCart,
} = require("../controller/userControllers");
//@desc GET all users from db
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
router.get("/:email/orders", getOrders);

//@desc GET a user by id from db
//@route GET /user/:id
//@access Public
router.get("/:email", getUserByEmail);

router.get("/:email/:password", login);

module.exports = router;
