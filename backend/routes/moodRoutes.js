const express = require("express");
const router = express.Router();
const { addMood, getMoods } = require("../controllers/moodController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addMood).get(protect, getMoods);

module.exports = router;
