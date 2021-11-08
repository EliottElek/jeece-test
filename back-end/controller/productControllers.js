const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

const addRating = async (req, res) => {
  try {
    const item = await Product.findOne({
      _id: req.params.id,
    });
    if (item === null)
      res.json({ auth: false, message: "Cet article n'existe pas." });
    else {
      const newRating = item.rating;
      newRating.push(req.body.rate);
      await Product.findOneAndUpdate({ _id: item._id }, { rating: newRating });
      res.json({
        add: true,
        message: "Note ajoutée avec succès.",
      });
    }
  } catch (err) {
    res.json({
      add: false,
      message: "Impossible d'ajouter la note.",
    });
  }
};
const addComment = async (req, res) => {
  try {
    const item = await Product.findOne({
      _id: req.params.id,
    });
    if (item === null)
      res.json({ auth: false, message: "Cet article n'existe pas." });
    else {
      const newComments = item.comments;
      newComments.push(req.body.comment);
      await Product.findOneAndUpdate(
        { _id: item._id },
        { comments: newComments }
      );
      res.json({
        add: true,
        message: "Commentaire ajouté avec succès.",
      });
    }
  } catch (err) {
    res.json({
      add: false,
      message: "Impossible d'ajouter le commentaire.",
    });
  }
};
module.exports = { getAllProducts, getProductById, addRating, addComment };
