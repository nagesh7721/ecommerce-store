const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const Order = require("../models/Order");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,     
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", protect, placeOrder);
router.get("/", protect, getMyOrders);

// ✅ ADMIN: GET ALL ORDERS
router.get("/admin/all", protect, admin, getAllOrders);

// ✅ DELETE
router.delete("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await order.deleteOne();
    res.json({ message: "Order removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ CANCEL
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });
    if (order.status !== "Placed")
      return res.status(400).json({ message: "Cannot cancel" });

    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ ADMIN UPDATE
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;
