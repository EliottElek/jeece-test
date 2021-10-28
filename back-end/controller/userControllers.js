const User = require("../models/User");
const bcrypt = require("bcrypt");
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({ auth: false, message: "Cet utilisateur n'existe pas." });
    else res.json({ auth: true, user: user });
  } catch (err) {
    console.error(err);
  }
};
const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (user === null)
      res.json({
        auth: false,
        message: "Identifiant ou mot de passe incorect.",
      });
    else if (bcrypt.compareSync(req.params.password, user.password)) {
      res.json({ auth: true, user: user });
    } else if (!bcrypt.compareSync(req.params.password, user.password)) {
      res.json({ auth: false, message: "Mauvais mot de passe." });
    }
  } catch (err) {
    console.error(err);
  }
};
const createAccount = async (req, res) => {
  try {
    console.log(req.body.user);
    const usr = await User.findOne({
      email: req.body.user.email,
    });
    if (usr !== null)
      res.json({ creation: false, message: "Cet email est déjà pris." });
    else {
      const user = await User.insertMany(req.body.user);
      res.json({
        creation: true,
        message: "Utilisateur créé avec succès.",
        user: user,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
module.exports = { getUsers, getUserByEmail, login, createAccount };
