const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get("/profile", protect, getUserProfile);
router.put("/update-profile", protect, upload.single("profilePic"), updateUserProfile);

module.exports = router;
