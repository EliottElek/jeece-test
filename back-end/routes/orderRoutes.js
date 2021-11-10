const express = require("express");
const router = express.Router();

const { createOrder, getOrders } = require("../controller/orderController");
//@desc GET all products from db
//@route GET /procuts
//@access Public
router.post("/", createOrder);
router.get("/admin", getOrders);

module.exports = router;
