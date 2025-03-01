const User = require("../models/User");

// ✅ Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

// ✅ Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { formName, age, city, state, aboutMe } = req.body;

        // Handling file upload for profile picture
        const profilePic = req.file ? req.file.filename : null;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { formName, age, city, state, aboutMe, profilePic },
            { new: true }
        );

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ msg: "Server error" });
    }
};
