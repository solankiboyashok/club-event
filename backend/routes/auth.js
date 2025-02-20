const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/emailService");

const router = express.Router();

// Generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Centralized Error Handling Middleware
const errorHandler = (res, status, message, error = null) => {
  console.error(`❌ Error: ${message}`, error || "");
  return res.status(status).json({ message });
};

// Register Route (Supports OTP & Email Verification Link)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, method } = req.body; // "otp" or "email"

    let user = await User.findOne({ email });
    if (user) return errorHandler(res, 400, "User already exists");

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, verified: false });

    if (method === "otp") {
      user.otp = generateOTP();
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 min
      await sendEmail(email, "otp", user.otp);
    } else {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
      await sendEmail(email, "verification", token);
    }

    await user.save();
    res.status(201).json({ message: `Verification ${method === "otp" ? "OTP" : "link"} sent to email.` });

  } catch (error) {
    errorHandler(res, 500, "Server error while registering user", error);
  }
});

// Verify OTP Route
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return errorHandler(res, 400, "User not found");
    if (!user.otp || user.otp !== otp || new Date() > user.otpExpires) {
      return errorHandler(res, 400, "Invalid or expired OTP");
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Email verified successfully!", token });

  } catch (error) {
    errorHandler(res, 500, "Server error during OTP verification", error);
  }
});

// Verify Email Link Route
router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return errorHandler(res, 400, "Verification link expired!");
      }
      return errorHandler(res, 400, "Invalid verification token!");
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) return errorHandler(res, 404, "User not found");

    user.verified = true;
    await user.save();

    res.json({ message: "Email verified successfully!" });

  } catch (error) {
    errorHandler(res, 500, "Server error during email verification", error);
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔍 Login attempt for:", email);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    // Log entered password and stored hashed password for debugging
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("❌ Incorrect password!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password matched!");

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token ,user});

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;