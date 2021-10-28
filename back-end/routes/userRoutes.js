const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserByEmail,
  login,
  createAccount,
} = require("../controller/userControllers");
//@desc GET all users from db
//@route GET /users
//@access Public
router.get("/", getUsers);
router.post("/", createAccount);

//@desc GET a user by id from db
//@route GET /user/:id
//@access Public
router.get("/:email", getUserByEmail);

router.get("/:email/:password", login);

module.exports = router;
