const Product = require("../models/Product");

// Add Product (Admin)
exports.addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

// Get All Products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};


exports.getProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(limit)
    .skip(limit * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / limit),
  });
};
