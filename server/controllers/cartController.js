const Cart = require("../models/Cart");

// Add to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const item = await Cart.create({
    user: req.user.id,
    product: productId,
    quantity,
  });

  res.json(item);
};

// Get user cart
exports.getUserCart = async (req, res) => {
  const cart = await Cart.find({ user: req.user.id }).populate("product");
  res.json(cart);
};
