const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addRating,
} = require("../controller/productControllers");
//@desc GET all products from db
//@route GET /procuts
//@access Public
router.get("/", getAllProducts);

//@desc GET a product by id from db
//@route GET /products/:id
//@access Public
router.get("/:id", getProductById);
router.post("/:id/rating", addRating);

module.exports = router;
