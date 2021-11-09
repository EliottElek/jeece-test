const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addRating,
  addComment,
  modifyProduct,
  getProductsByCategory,
  getProductsByAuthor,
} = require("../controller/productControllers");
//@desc GET all products from db
//@route GET /procuts
//@access Public
router.get("/", getAllProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/author/:author", getProductsByAuthor);

//@desc GET a product by id from db
//@route GET /products/:id
//@access Public
router.get("/:id", getProductById);
router.post("/:id/rating", addRating);
router.post("/:id/comment", addComment);
router.post("/:id/modify", modifyProduct);

module.exports = router;
