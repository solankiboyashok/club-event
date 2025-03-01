require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 5000;  // Define PORT before using it

const app = express(); // ✅ Initialize Express only once

// Middleware
app.use(cors());
app.use(express.json());

// Ensure environment variables are loaded (especially MONGODB_URI)
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined. Check your .env file.");
  process.exit(1); // Stop the server if MONGODB_URI is missing
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes);

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ error: { message: error.message } });
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
