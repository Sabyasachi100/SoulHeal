const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    mood: {
      type: String,
      required: true,
      enum: ["Happy", "Sad", "Anxious", "Calm", "Angry", "Stressed", "Energetic"],
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mood", moodSchema);
