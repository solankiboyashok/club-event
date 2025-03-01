const express = require("express");
const User = require("../models/User"); // Import User model
const router = express.Router();
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware"); // Ensure correct import
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// ✅ Route to get user profile (Protected Route)
router.get("/profile", protect, getUserProfile);

// ✅ Route to update user profile (Protected Route)
router.put("/update-profile", protect, upload.single("profilePic"), updateUserProfile);

module.exports = router;
