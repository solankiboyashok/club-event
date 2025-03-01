require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const multer = require("multer");
const path = require("path");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/userRoutes");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000; // Define PORT before using it

const app = express(); // Initialize Express

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve static files (uploaded images)
app.use("/uploads", express.static("uploads"));

// Ensure environment variables are loaded (especially MONGO_URI)
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Check your .env file.");
  process.exit(1); // Stop the server if MONGO_URI is missing
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ error: { message: error.message } });
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
