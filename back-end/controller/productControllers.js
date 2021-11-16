const Product = require("../models/Product");

const createProduct = async (req, res) => {
  console.log(req.body.product)
  try {
    await Product.insertMany(req.body.product);
    res.json({
      add: true,
      message: "Produit ajouté avec succès.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
}; const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });
    res.json({
      results: products,
      message: `${products.length} résultat(s) trouvé(s)`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
const getProductsByAuthor = async (req, res) => {
  try {
    const products = await Product.find({
      author: req.params.author,
    });
    if (products.length === 0) {
      res.json({ message: "Aucun résultat trouvé" });
    } else {
    }
    res.json({
      results: products,
      message: `${products.length} résultat(s) trouvé(s)`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
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
const modifyProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    });
    console.log(product);
    if (product === null)
      res.json({ auth: false, message: "Ce produit n'existe pas." });
    else {
      try {
        const newP = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              author: req.body.author,
              title: req.body.title,
              price: req.body.price,
            },
          },
          { new: true }
        );
        console.log(newP);
        res.json({
          add: true,
          message: "Produit modifié avec succès.",
        });
      } catch (err) {
        console.log(err);
        res.json({
          add: false,
          message: "Impossible de modifier le produit.",
        });
      }
    }
  } catch (err) {
    res.json({
      add: false,
      message: "Impossible de modifier le produit.",
    });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  addRating,
  addComment,
  modifyProduct,
  getProductsByCategory,
  getProductsByAuthor,
};
