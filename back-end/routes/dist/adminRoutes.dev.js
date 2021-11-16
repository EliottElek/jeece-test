"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controller/adminControllers"),
    getAdmins = _require.getAdmins,
    getAdminByEmail = _require.getAdminByEmail,
    login = _require.login; //@desc GET all users from db
//@route GET /users
//@access Public


router.get("/", getAdmins);
router.get("/:email/:password", login);
router.get("/:email", getAdminByEmail); //@desc GET a user by id from db
//@route GET /user/:id
//@access Public

module.exports = router;