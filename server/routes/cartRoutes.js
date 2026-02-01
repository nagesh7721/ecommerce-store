const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const { addToCart, getUserCart } = require("../controllers/cartController");

router.post("/", protect, addToCart);
router.get("/", protect, getUserCart);

// ✅ REAL REMOVE (DB मधून)
router.delete("/remove/:id", protect, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
