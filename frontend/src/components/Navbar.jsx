import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, LogOut, User, LayoutDashboard, Brain, Calendar, BookOpen, Settings, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let userInfo = null;
  try {
    const savedUser = localStorage.getItem('userInfo');
    userInfo = savedUser ? JSON.parse(savedUser) : null;
  } catch (err) {
    console.error("Navbar session error:", err);
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Assessments', path: '/assessments', icon: Brain },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
  ];

  if (userInfo?.role === 'admin') {
    menuItems.push({ name: 'Admin', path: '/admin-dashboard', icon: Settings });
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-morph border-b"
      style={{ borderColor: "var(--border)" }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="p-2 rounded-xl"
              style={{ background: "rgba(94,207,191,0.12)" }}
              whileHover={{ scale: 1.12, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Heart className="w-7 h-7" style={{ color: "var(--accent)" }} />
            </motion.div>
            <span className="text-xl font-bold text-gradient serif">SoulHeal</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {userInfo && menuItems.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    to={item.path}
                    className={`nav-link flex items-center gap-2 ${isActive ? 'active' : ''}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: "var(--accent)" }}
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right side */}
          <AnimatePresence mode="wait">
            {userInfo ? (
              <motion.div
                key="user"
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-white">{userInfo.name}</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--accent)" }}>{userInfo.role}</span>
                </div>
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(94,207,191,0.15)", border: "0.5px solid var(--border-h)" }}
                  whileHover={{ scale: 1.08 }}
                >
                  <User className="w-5 h-5" style={{ color: "var(--accent)" }} />
                </motion.div>
                <motion.button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl text-muted transition-all"
                  whileHover={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}
                  whileTap={{ scale: 0.9 }}
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="guest"
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Link to="/login" className="nav-link">Login</Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <Link to="/register" className="gradient-btn">Join Now</Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
