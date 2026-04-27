const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// @desc    Get all counselors
// @route   GET /api/users/counselors
// @access  Private
router.get("/counselors", protect, async (req, res) => {
  try {
    const counselors = await User.find({ role: "counselor" }).select("-password");
    res.json(counselors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
