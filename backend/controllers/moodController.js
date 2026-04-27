const Mood = require("../models/Mood");

// @desc    Add mood entry
// @route   POST /api/mood
// @access  Private (Student)
const addMood = async (req, res) => {
  const { mood, notes } = req.body;

  try {
    const moodEntry = await Mood.create({
      studentId: req.user._id,
      mood,
      notes,
    });
    res.status(201).json(moodEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user mood history
// @route   GET /api/mood
// @access  Private (Student)
const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ studentId: req.user._id }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addMood, getMoods };
