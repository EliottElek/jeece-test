const Admin = require("../models/Admin");

const bcrypt = require("bcrypt");

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
const getAdminByEmail = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      email: req.params.email,
    });
    if (admin === null)
      res.json({ auth: false, message: "Cet utilisateur n'existe pas." });
    else res.json({ auth: true, admin: admin });
  } catch (err) {
    console.error(err);
  }
};
const login = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      email: req.params.email,
    });
    if (admin === null)
      res.json({
        auth: false,
        message: "Identifiant ou mot de passe incorect.",
      });
    else if (bcrypt.compareSync(req.params.password, admin.password)) {
      res.json({ auth: true, admin: admin });
    } else if (!bcrypt.compareSync(req.params.password, admin.password)) {
      res.json({ auth: false, message: "Mauvais mot de passe." });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAdmins,
  getAdminByEmail,
  login,
};
