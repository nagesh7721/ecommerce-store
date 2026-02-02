const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// ⭐ ADD THIS
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
