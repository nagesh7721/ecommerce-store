const Cart = require("../models/Cart");

// ADD TO CART
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const item = await Cart.create({
    user: req.user.id,
    product: productId,
    quantity,
  });

  res.json(item);
};

// GET USER CART
exports.getUserCart = async (req, res) => {
  const cart = await Cart.find({ user: req.user.id }).populate("product");
  res.json(cart);
};

// ✅ REMOVE FROM CART
exports.removeFromCart = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await item.deleteOne();
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
