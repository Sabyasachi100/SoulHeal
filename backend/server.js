const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const moodRoutes = require("./routes/moodRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/users", userRoutes);

// Root Route for API check
app.get("/api/health", (req, res) => {
  res.send("SoulHeal API is healthy... 🚀");
});

// ─── SERVE FRONTEND IN PRODUCTION ──────────────────────────────────────────
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Any route that is not an API route should serve index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("SoulHeal API is running in development mode...");
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} 🚀`);
});