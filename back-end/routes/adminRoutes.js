const express = require("express");
const router = express.Router();

const {
  getAdmins,
  getAdminByEmail,
  login,
} = require("../controller/adminControllers");
//@desc GET all users from db
//@route GET /users
//@access Public
router.get("/", getAdmins);
router.get("/:email/:password", login);
router.get("/:email", getAdminByEmail);
//@desc GET a user by id from db
//@route GET /user/:id
//@access Public
module.exports = router;
