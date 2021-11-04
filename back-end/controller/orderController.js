const Order = require("../models/Order");
const User = require("../models/User");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
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
      creation: true,
      message: "Commande passée avec succès.",
      order: ord,
    });
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  getOrders,
  createOrder,
};
