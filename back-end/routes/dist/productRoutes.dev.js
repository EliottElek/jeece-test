"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controller/productControllers"),
    getAllProducts = _require.getAllProducts,
    getProductById = _require.getProductById,
    addRating = _require.addRating,
    addComment = _require.addComment; //@desc GET all products from db
//@route GET /procuts
//@access Public


router.get("/", getAllProducts); //@desc GET a product by id from db
//@route GET /products/:id
//@access Public

router.get("/:id", getProductById);
router.post("/:id/rating", addRating);
router.post("/:id/comment", addComment);
module.exports = router;