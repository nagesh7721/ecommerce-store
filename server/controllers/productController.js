const Product = require("../models/Product");

// ADD PRODUCT (Admin)
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      countInStock: 10,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET PRODUCTS (search + pagination)
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

// ✅ DELETE PRODUCT (Admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
