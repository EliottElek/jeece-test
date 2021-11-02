const Order = require("../models/Order");

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
    const user = req.body.order.customer;
    if (user === null)
      res.json({ creation: false, message: "Utilisateur introuvable." });
    else {
      const order = req.body.order;
      const ord = await Order.insertMany(order);
      res.json({
        creation: true,
        message: "Commande passée avec succès.",
        order: ord,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  getOrders,
  createOrder,
};
