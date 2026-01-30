const express = require("express");
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", protect, admin, addProduct);
router.get("/", getProducts);

module.exports = router;
