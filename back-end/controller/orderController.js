const Order = require("../models/Order");
const User = require("../models/User");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur au niveau du server." });
  }
};

const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.order.email;
    const order = req.body.order;
    const ord = await Order.insertMany(order);
    await User.findOneAndUpdate({ email: email }, { cart: [] });
    res.json({
      success: true,
      message: "Commande passée avec succès.",
      order: ord,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Impossible de finaliser la commande.",
      order: ord,
    });  }
};
module.exports = {
  getOrders,
  createOrder,
};
