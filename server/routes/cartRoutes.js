const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addToCart, getUserCart } = require("../controllers/cartController");

router.post("/", protect, addToCart);
router.get("/", protect, getUserCart);

module.exports = router;
