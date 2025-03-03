const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure you have a User model

// Route to fetch all registered users (Admin access required)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email role"); // Fetch name, email, and role
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
