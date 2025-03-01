const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/user/profile", protect, getUserProfile);

module.exports = router;
