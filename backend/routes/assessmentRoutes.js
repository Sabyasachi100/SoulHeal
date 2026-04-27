const express = require("express");
const router = express.Router();
const { saveAssessment, getAssessments } = require("../controllers/assessmentController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, saveAssessment).get(protect, getAssessments);

module.exports = router;
