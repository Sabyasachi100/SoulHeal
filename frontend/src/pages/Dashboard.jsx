import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, Calendar, MessageSquare, TrendingUp, Smile, Cloud, Zap,
  AlertCircle, Brain, BookOpen, ArrowRight, PlusCircle, CheckCircle2
} from "lucide-react";
import { FloatingOrb, StaggerContainer, StaggerItem, HoverCard, PageTransition, PulseDot } from "../components/Animations";
import { fetchAssessments, fetchAppointments } from "../services/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState(null);
  const [stats, setStats] = useState({ 
    moodEntries: 0, 
    assessmentsTaken: 0, 
    nextAppointment: "No upcoming sessions", 
    streak: 5 
  });
  
  let userInfo = null;
  try { userInfo = JSON.parse(localStorage.getItem("userInfo")); } catch {}

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch assessments count
        const { data: assessments } = await fetchAssessments();
        
        // Fetch next appointment
        const { data: appointments } = await fetchAppointments();
        
        // Find next upcoming appointment
        const upcoming = appointments.find(app => new Date(app.appointmentDate) > new Date() && app.status !== "Cancelled");
        
        setStats(prev => ({
          ...prev,
          assessmentsTaken: assessments.length,
          nextAppointment: upcoming 
            ? new Date(upcoming.appointmentDate).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
            : "No upcoming sessions"
        }));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo?.token) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  const moodIcons = [
    { name: "Happy", icon: Smile, color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
    { name: "Sad", icon: Cloud, color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
    { name: "Anxious", icon: Zap, color: "var(--accent)", bg: "rgba(94,207,191,0.1)" },
    { name: "Calm", icon: Heart, color: "#34d399", bg: "rgba(52,211,153,0.1)" },
    { name: "Angry", icon: Zap, color: "#f87171", bg: "rgba(248,113,113,0.1)" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-2 rounded-full"
          style={{ borderColor: "var(--border)", borderTopColor: "var(--accent)" }}
        />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-10 relative">
        <FloatingOrb style={{ top: "-80px", right: "-60px" }} color="#5ecfbf" size={350} delay={0} />
        <FloatingOrb style={{ bottom: "10%", left: "-80px" }} color="#d4b896" size={250} delay={4} />

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Hello, <span className="text-gradient serif-italic">{userInfo?.name || "Friend"}</span>
            </h1>
            <p className="text-muted mt-2 font-light">Your wellness journey is looking bright today.</p>
          </div>
          <motion.div
            className="flex items-center gap-3 glass-morph px-6 py-3 rounded-2xl"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(94,207,191,0.15)" }}>
              <TrendingUp className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Daily Streak</p>
              <p className="text-lg font-bold text-white">{stats.streak} Days 🔥</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Mood Pulse */}
        <motion.div
          className="premium-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Smile className="w-5 h-5" style={{ color: "var(--accent)" }} />
            How's your mood right now?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {moodIcons.map((m, i) => (
              <motion.button
                key={m.name}
                onClick={() => setSelectedMood(m.name)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                whileHover={{ scale: 1.07, y: -4 }}
                whileTap={{ scale: 0.93 }}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-200"
                style={{
                  background: selectedMood === m.name ? m.bg : "rgba(17,54,64,0.3)",
                  borderColor: selectedMood === m.name ? m.color : "var(--border)",
                }}
              >
                <div className="p-3 rounded-xl" style={{ background: m.bg }}>
                  <m.icon className="w-6 h-6" style={{ color: m.color }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: selectedMood === m.name ? m.color : "var(--muted)" }}>
                  {m.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Brain, color: "#60a5fa", bg: "rgba(96,165,250,0.1)",
                  title: "Assessments", sub: `${stats.assessmentsTaken} completed total`,
                  link: "/assessments", linkText: "Take a new test", linkColor: "#60a5fa"
                },
                {
                  icon: Calendar, color: "#f9a8d4", bg: "rgba(249,168,212,0.1)",
                  title: "Appointments", sub: `Next: ${stats.nextAppointment}`,
                  link: "/appointments", linkText: "Book session", linkColor: "#f9a8d4"
                },
              ].map((card) => (
                <StaggerItem key={card.title}>
                  <HoverCard className="premium-card h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl" style={{ background: card.bg }}>
                        <card.icon className="w-6 h-6" style={{ color: card.color }} />
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-muted opacity-40" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
                    <p className="text-sm text-muted mb-6">{card.sub}</p>
                    <Link to={card.link} className="flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3" style={{ color: card.linkColor }}>
                      {card.linkText} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <motion.div
              className="premium-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recommended Resources</h2>
                <Link to="/resources" className="text-sm font-semibold hover:underline" style={{ color: "var(--accent)" }}>See all</Link>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Mindfulness Meditation", type: "Audio", time: "10 mins" },
                  { title: "Overcoming Anxiety", type: "Article", time: "5 min read" },
                ].map((res, i) => (
                  <motion.div
                    key={res.title}
                    className="flex items-center justify-between p-4 rounded-xl border cursor-pointer"
                    style={{ background: "rgba(17,54,64,0.3)", borderColor: "var(--border)" }}
                    whileHover={{ x: 4, borderColor: "var(--border-h)" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg" style={{ background: "var(--mid)" }}>
                        <BookOpen className="w-4 h-4 text-muted" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{res.title}</h4>
                        <p className="text-[10px] text-muted mt-0.5">{res.type} · {res.time}</p>
                      </div>
                    </div>
                    <PlusCircle className="w-5 h-5 text-muted" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Side card */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div className="premium-card flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-semibold text-white">Live Support</h2>
                <PulseDot />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-dashed" style={{ borderColor: "var(--border)", background: "rgba(17,54,64,0.2)" }}>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(94,207,191,0.1)" }}
                >
                  <MessageSquare className="w-8 h-8" style={{ color: "var(--accent)" }} />
                </motion.div>
                <h3 className="text-white font-semibold mb-2">Need to talk?</h3>
                <p className="text-sm text-muted mb-6">Connect with a counselor or talk to someone instantly.</p>
                <HoverCard className="w-full">
                  <Link to="/chat" className="gradient-btn block w-full text-center">Start Chat</Link>
                </HoverCard>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
