const Appointment = require("../models/Appointment");

// @desc    Book appointment
// @route   POST /api/appointments
// @access  Private (Student)
const bookAppointment = async (req, res) => {
  const { counselorId, appointmentDate, notes } = req.body;

  try {
    const appointment = await Appointment.create({
      studentId: req.user._id,
      counselorId,
      appointmentDate,
      notes,
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "student") {
      query = { studentId: req.user._id };
    } else if (req.user.role === "counselor") {
      query = { counselorId: req.user._id };
    }

    const appointments = await Appointment.find(query)
      .populate("studentId", "name email")
      .populate("counselorId", "name specialization")
      .sort({ appointmentDate: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Counselor/Admin)
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = req.body.status || appointment.status;
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookAppointment, getAppointments, updateAppointmentStatus };
