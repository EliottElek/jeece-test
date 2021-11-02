const express = require("express");
const router = express.Router();

const { createOrder } = require("../controller/orderController");
//@desc GET all products from db
//@route GET /procuts
//@access Public
router.post("/", createOrder);

module.exports = router;
