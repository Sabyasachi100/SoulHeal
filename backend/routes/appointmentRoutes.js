const express = require("express");
const router = express.Router();
const { bookAppointment, getAppointments, updateAppointmentStatus } = require("../controllers/appointmentController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.route("/").post(protect, bookAppointment).get(protect, getAppointments);
router.route("/:id").put(protect, authorize("counselor", "admin"), updateAppointmentStatus);

module.exports = router;
