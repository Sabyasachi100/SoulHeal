import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { Mail, Lock, Heart, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingOrb, AnimatedButton, PageTransition } from "../components/Animations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const { data } = await login(email, password);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[80vh] w-full flex items-center justify-center p-4 relative overflow-hidden">
        {/* Floating background orbs */}
        <FloatingOrb style={{ top: "-10%", right: "5%" }} color="#5ecfbf" size={400} delay={0} />
        <FloatingOrb style={{ bottom: "-10%", left: "0%" }} color="#a8e6df" size={300} delay={2} />

        <motion.div
          className="w-full max-w-lg space-y-8 premium-card relative overflow-hidden z-10"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center p-4 rounded-2xl mb-6"
              style={{ background: "rgba(94, 207, 191, 0.12)" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Heart className="w-12 h-12" style={{ color: "var(--accent)" }} />
            </motion.div>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-2 serif">Welcome Back</h2>
            <p className="text-muted font-light tracking-wide">Continue your journey to inner peace</p>
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

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { icon: Mail, label: "Email Address", type: "email", value: email, setter: setEmail, placeholder: "you@example.com" },
              { icon: Lock, label: "Password", type: "password", value: password, setter: setPassword, placeholder: "••••••••" },
            ].map((field, i) => (
              <motion.div
                key={field.label}
                className="relative group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <field.icon
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors"
                  style={{ color: "var(--muted)" }}
                />
                <input
                  type={field.type}
                  required
                  className="ocean-input pl-12"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <AnimatedButton
                type="submit"
                className="w-full h-14 gradient-btn flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </>
                )}
              </AnimatedButton>
            </motion.div>
          </form>

          <motion.p
            className="text-center text-sm text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Don't have an account?{" "}
            <Link to="/register" className="text-accent font-semibold hover:underline transition-colors" style={{ color: "var(--accent)" }}>
              Create Account
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Login;
