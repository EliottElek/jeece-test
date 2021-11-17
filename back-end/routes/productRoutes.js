const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductById,
  addRating,
  addComment,
  modifyProduct,
  getProductsByCategory,
  getProductsByAuthor,
  modifyDeepProduct,
  deleteProduct,
} = require("../controller/productControllers");
//@desc GET all products from db
//@route GET /procuts
//@access Public
router.post("/", createProduct);
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
router.post("/:id/modifyDeep", modifyDeepProduct);
router.post("/:id/delete", deleteProduct);

module.exports = router;
