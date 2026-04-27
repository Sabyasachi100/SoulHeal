import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Assessments from "./pages/Assessments";
import Appointments from "./pages/Appointments";
import Resources from "./pages/Resources";
import Chat from "./pages/Chat";
import AdminDashboard from "./pages/AdminDashboard";

// Protected Route Component with Safety
const ProtectedRoute = ({ children, roles }) => {
  let userInfo = null;
  try {
    const savedUser = localStorage.getItem("userInfo");
    userInfo = savedUser ? JSON.parse(savedUser) : null;
  } catch (err) {
    console.error("Session error:", err);
    localStorage.removeItem("userInfo");
  }
  
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userInfo.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Background />
      <div className="min-h-screen pt-20" style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/assessments"
              element={
                <ProtectedRoute>
                  <Assessments />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
