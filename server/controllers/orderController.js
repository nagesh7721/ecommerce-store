const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const cartItems = await Cart.find({ user: req.user.id }).populate("product");

  if (cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const orderItems = cartItems.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
  }));

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    totalAmount: total,
  });

  // Clear cart after order
  await Cart.deleteMany({ user: req.user.id });

  res.json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate("items.product");
  res.json(orders);
};


exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};
