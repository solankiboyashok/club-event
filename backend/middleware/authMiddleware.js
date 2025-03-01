const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ msg: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ msg: "Not authorized, no token" });
    }
};

// New authMiddleware function
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ msg: "User not found" });
        }

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ msg: "Invalid token" });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.dashboardName = req.body.dashboardName || user.dashboardName;
        user.formName = req.body.formName || user.formName;
        user.aboutMe = req.body.aboutMe || user.aboutMe;
        user.skills = req.body.skills || user.skills;
        user.state = req.body.state || user.state;
        user.city = req.body.city || user.city;
        user.profilePic = req.body.profilePic || user.profilePic;

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { protect, authMiddleware, getUserProfile, updateUserProfile };
