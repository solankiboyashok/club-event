const User = require("../models/User");

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
    console.log("Incoming update request:", req.body); // Debug request body

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.formName = req.body.formName || user.formName;
        user.aboutMe = req.body.aboutMe || user.aboutMe;
        user.skills = req.body.skills || user.skills;
        user.state = req.body.state || user.state;
        user.city = req.body.city || user.city;

        if (req.file) {
            user.profilePic = `/uploads/${req.file.filename}`;
        }

        await user.save();
        res.json({ message: "Profile updated successfully", profilePic: user.profilePic });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getUserProfile, updateUserProfile };
