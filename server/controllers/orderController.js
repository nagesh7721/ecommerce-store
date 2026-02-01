const Cart = require("../models/Cart");
const Order = require("../models/Order");

//PLACE ORDER (save productId)
exports.placeOrder = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cartItems.map((item) => ({
      product: item.product,      // ObjectId
      quantity: item.quantity,
    }));

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalAmount: total,
      status: "Placed",
    });

    await Cart.deleteMany({ user: req.user.id });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET MY ORDERS (populate product)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product");   // ⭐ important

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ ADMIN UPDATE STATUS (as is)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
