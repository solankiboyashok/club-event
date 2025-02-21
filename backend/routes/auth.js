const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/emailService");

const router = express.Router();

// ✅ Middleware to verify token
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ✅ Generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Centralized Error Handling Middleware
const errorHandler = (res, status, message, error = null) => {
  console.error(`❌ Error: ${message}`, error || "");
  return res.status(status).json({ message });
};

// ✅ Register Route (Supports OTP & Email Verification)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, method } = req.body;

    let user = await User.findOne({ email });
    if (user) return errorHandler(res, 400, "User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, verified: false });

    if (method === "otp") {
      user.otp = generateOTP();
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
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

// ✅ Verify OTP Route
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

// ✅ Verify Email Link Route
router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return errorHandler(res, 400, error.name === "TokenExpiredError" ? "Verification link expired!" : "Invalid verification token!");
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

// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.verified) return res.status(403).json({ message: "Please verify your email before logging in." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, user });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get User Profile (Protected)
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});

module.exports = router;
