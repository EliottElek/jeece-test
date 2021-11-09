"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controller/orderController"),
    createOrder = _require.createOrder,
    getOrders = _require.getOrders; //@desc GET all products from db
//@route GET /procuts
//@access Public


router.post("/", createOrder);
router.get("/", getOrders);
module.exports = router;