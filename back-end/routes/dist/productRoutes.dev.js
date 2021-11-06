"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controller/productControllers"),
    getAllProducts = _require.getAllProducts,
    getProductById = _require.getProductById,
    addRating = _require.addRating; //@desc GET all products from db
//@route GET /procuts
//@access Public


router.get("/", getAllProducts); //@desc GET a product by id from db
//@route GET /products/:id
//@access Public

router.get("/:id", getProductById);
router.post("/:id/rating", addRating);
module.exports = router;