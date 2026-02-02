const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  deleteProduct,   // ⭐ IMPORTED
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", protect, admin, addProduct);
router.get("/", getProducts);
router.delete("/:id", protect, admin, deleteProduct); // ⭐ NOW VALID

module.exports = router;
