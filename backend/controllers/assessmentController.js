const Assessment = require("../models/Assessment");

// @desc    Save assessment result
// @route   POST /api/assessments
// @access  Private (Student)
const saveAssessment = async (req, res) => {
  const { assessmentType, score, result } = req.body;

  try {
    const assessment = await Assessment.create({
      studentId: req.user._id,
      assessmentType,
      score,
      result,
    });
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user assessment results
// @route   GET /api/assessments
// @access  Private (Student/Counselor/Admin)
const getAssessments = async (req, res) => {
  try {
    const query = req.user.role === "student" ? { studentId: req.user._id } : {};
    const assessments = await Assessment.find(query)
      .populate("studentId", "name email")
      .sort({ date: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveAssessment, getAssessments };
