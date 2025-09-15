require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");  // Make sure this matches the actual file name
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");

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
  .then(async () => {
    console.log("✅ MongoDB Connected");
    // Seed default admin if not exists
    try {
      const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@gmail.com";
      const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";
      const existingAdmin = await User.findOne({ email: adminEmail });
      if (!existingAdmin) {
        await User.create({
          name: "Admin",
          email: adminEmail,
          password: adminPassword,
          verified: true,
          role: "admin",
        });
        console.log("👑 Default admin user created:", adminEmail);
      } else if (existingAdmin.role !== "admin") {
        existingAdmin.role = "admin";
        existingAdmin.verified = true;
        await existingAdmin.save();
        console.log("👑 Elevated existing user to admin:", adminEmail);
      }
    } catch (seedErr) {
      console.error("❌ Failed to seed default admin:", seedErr);
    }
  })
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
