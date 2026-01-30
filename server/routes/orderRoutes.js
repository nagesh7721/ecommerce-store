const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  placeOrder,
  getMyOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", protect, placeOrder);
router.get("/", protect, getMyOrders);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;
