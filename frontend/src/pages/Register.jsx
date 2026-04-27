import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { User, Mail, Lock, Heart, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingOrb, AnimatedButton, PageTransition, StaggerContainer, StaggerItem } from "../components/Animations";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await register(formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[80vh] w-full flex items-center justify-center p-4 relative overflow-hidden">
        <FloatingOrb style={{ top: "-10%", left: "5%" }} color="#5ecfbf" size={400} delay={0} />
        <FloatingOrb style={{ bottom: "-10%", right: "0%" }} color="#d4b896" size={300} delay={3} />

        <motion.div
          className="w-full max-w-xl space-y-8 premium-card relative overflow-hidden z-10"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center justify-center p-4 rounded-2xl mb-6"
              style={{ background: "rgba(94, 207, 191, 0.12)" }}
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Heart className="w-12 h-12" style={{ color: "var(--accent)" }} />
            </motion.div>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-2 serif">Create Account</h2>
            <p className="text-muted font-light tracking-wide">Start your personalized healing journey</p>
          </motion.div>

          {error && (
            <motion.div
              className="text-sm text-center p-4 rounded-xl"
              style={{ background: "rgba(239, 68, 68, 0.1)", border: "0.5px solid rgba(239, 68, 68, 0.3)", color: "#f87171" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role selection */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <label className="block text-xs font-semibold tracking-widest text-muted uppercase mb-3">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                {['student', 'counselor'].map((role, i) => (
                  <motion.button
                    key={role}
                    type="button"
                    onClick={() => setFormData({...formData, role})}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="py-3 rounded-xl border transition-all flex items-center justify-center gap-2 font-semibold capitalize text-sm"
                    style={formData.role === role
                      ? { background: "rgba(94, 207, 191, 0.15)", borderColor: "var(--accent)", color: "var(--accent)" }
                      : { background: "rgba(7, 26, 31, 0.5)", borderColor: "var(--border)", color: "var(--muted)" }
                    }
                  >
                    {role === 'student' ? <User className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    {role}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Fields */}
            <div className="space-y-4">
              {[
                { icon: User, label: "Full Name", type: "text", key: "name", placeholder: "John Doe" },
                { icon: Mail, label: "Email Address", type: "email", key: "email", placeholder: "you@example.com" },
                { icon: Lock, label: "Password", type: "password", key: "password", placeholder: "••••••••" },
              ].map((field, i) => (
                <motion.div
                  key={field.key}
                  className="relative space-y-1.5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <label className="block text-xs font-semibold tracking-widest text-muted uppercase ml-1">{field.label}</label>
                  <div className="relative group">
                    <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted)" }} />
                    <input
                      type={field.type}
                      required
                      className="ocean-input pl-11"
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
              <AnimatedButton
                type="submit"
                className="w-full h-14 gradient-btn flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </AnimatedButton>
            </motion.div>
          </form>

          <motion.p
            className="text-center text-sm text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: "var(--accent)" }}>
              Sign In
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Register;
