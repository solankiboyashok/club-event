const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Admin login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to fetch all registered users (Admin access required)
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}, "name email role"); // Fetch name, email, and role
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Route to delete a user by ID (Admin access required)
router.delete("/users/:id", protect, admin, deleteUser);

module.exports = router;
