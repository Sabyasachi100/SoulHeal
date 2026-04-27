import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Star, ArrowRight, ShieldCheck, MapPin, Search, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { PageTransition, HoverCard, FloatingOrb, AnimatedButton, StaggerContainer, StaggerItem } from "../components/Animations";
import { fetchCounselors, bookAppointment } from '../services/api';

const Appointments = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00 AM");
  const [bookingReason, setBookingReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCounselors();
  }, []);

  const loadCounselors = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchCounselors();
      if (data.length === 0) {
        setError("No certified counselors are currently available. Please check back later.");
      } else {
        setCounselors(data);
      }
    } catch (error) {
      console.error("Error fetching counselors:", error);
      setError("Unable to connect to the server. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingDate || !bookingReason) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const dateTimeString = `${bookingDate} ${bookingTime}`;
      
      await bookAppointment({
        counselorId: selectedCounselor._id,
        appointmentDate: new Date(dateTimeString),
        notes: bookingReason
      });

      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setSelectedCounselor(null);
        setBookingDate("");
        setBookingReason("");
      }, 3000);
    } catch (error) {
      console.error("Booking failed:", error);
      alert(error.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCounselors = counselors.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const colors = ["#a78bfa", "#5ecfbf", "#f9a8d4", "#818cf8", "#fbbf24"];

  return (
    <PageTransition>
      <div className="space-y-10 relative">
        <FloatingOrb style={{ top: "-80px", right: "0" }} color="#a78bfa" size={350} delay={0} />

        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-3 text-gradient serif">Book a Session</h1>
            <p className="text-muted font-light">Connect with certified professionals who can guide you.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative group min-w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted)" }} />
                <input 
                type="text" 
                placeholder="Search counselor or specialty..." 
                className="ocean-input pl-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button 
                onClick={loadCounselors}
                className="p-3 rounded-xl border border-white/10 bg-white/5 text-muted hover:text-white hover:bg-white/10 transition-all"
                title="Refresh List"
            >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* List */}
          <div className="space-y-5">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted gap-4">
                <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
                <p className="text-sm animate-pulse">Consulting our directory...</p>
              </div>
            ) : error ? (
              <motion.div 
                className="premium-card p-10 text-center border-red-500/20 bg-red-500/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Connection Issue</h3>
                <p className="text-muted text-sm mb-6 max-w-xs mx-auto">{error}</p>
                <button 
                    onClick={loadCounselors}
                    className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                >
                    Try Again
                </button>
              </motion.div>
            ) : filteredCounselors.length === 0 ? (
              <div className="text-center py-20 text-muted">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No counselors match your search criteria.</p>
              </div>
            ) : (
              <StaggerContainer className="space-y-5" delay={0.1}>
                {filteredCounselors.map((c, idx) => {
                  const color = colors[idx % colors.length];
                  return (
                    <StaggerItem key={c._id}>
                      <motion.div
                        onClick={() => setSelectedCounselor({ ...c, color })}
                        className="premium-card p-5 cursor-pointer"
                        whileHover={{ x: 4, borderColor: color }}
                        whileTap={{ scale: 0.99 }}
                        style={{ borderColor: selectedCounselor?._id === c._id ? color : "var(--border)" }}
                        animate={{ background: selectedCounselor?._id === c._id ? `${color}08` : "var(--deep)" }}
                        transition={{ type: "spring", stiffness: 250 }}
                      >
                        <div className="flex items-center gap-5">
                          <motion.div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                            style={{ background: `${color}15`, border: `0.5px solid ${color}30` }}
                            whileHover={{ scale: 1.08, rotate: 3 }}
                          >
                            {c.profilePic ? (
                                <img src={c.profilePic} alt={c.name} className="w-full h-full rounded-2xl object-cover" />
                            ) : (
                                <User className="w-10 h-10" style={{ color }} />
                            )}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full border-4 border-[#0a2e36] flex items-center justify-center shadow-lg">
                                <ShieldCheck className="w-3 h-3 text-white" />
                            </div>
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold text-yellow-400" style={{ background: "rgba(251,191,36,0.1)" }}>
                                <Star className="w-3 h-3 fill-yellow-400" />4.9
                              </div>
                            </div>
                            <p className="text-sm font-medium mb-2" style={{ color }}>{c.specialization || "Mental Health Counselor"}</p>
                            <div className="flex items-center gap-3 text-muted text-xs font-semibold">
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Video Session</span>
                              <span className="flex items-center gap-1 text-teal-400"><CheckCircle2 className="w-3 h-3" /> Available</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}
          </div>

          {/* Booking form */}
          <div className="lg:sticky lg:top-24 h-fit">
            <AnimatePresence mode="wait">
              {bookingSuccess ? (
                <motion.div
                  key="success"
                  className="premium-card flex flex-col items-center justify-center text-center p-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="w-20 h-20 rounded-full bg-teal-500/10 flex items-center justify-center mb-6 text-teal-400">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                  <p className="text-muted">Your session with {selectedCounselor.name} has been scheduled. Check your dashboard for details.</p>
                </motion.div>
              ) : selectedCounselor ? (
                <motion.div
                  key="form"
                  className="premium-card"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-1">Book Appointment</h2>
                    <p className="text-muted text-sm">Schedule your session with <span style={{ color: selectedCounselor.color }}>{selectedCounselor.name}</span></p>
                  </div>

                  <form onSubmit={handleBooking} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Date</label>
                        <input 
                          type="date" 
                          className="ocean-input" 
                          required 
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </motion.div>
                      <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Time</label>
                        <select 
                          className="ocean-input"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                        >
                          <option>10:00 AM</option>
                          <option>11:30 AM</option>
                          <option>02:00 PM</option>
                          <option>04:30 PM</option>
                          <option>06:00 PM</option>
                        </select>
                      </motion.div>
                    </div>
                    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Reason for visit</label>
                      <textarea 
                        rows="3" 
                        placeholder="Briefly describe what's on your mind..." 
                        className="ocean-input resize-none" 
                        required
                        value={bookingReason}
                        onChange={(e) => setBookingReason(e.target.value)}
                      />
                    </motion.div>
                    <AnimatedButton 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 gradient-btn flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : "Confirm Booking"} <ArrowRight className="w-5 h-4" />
                    </AnimatedButton>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="premium-card flex flex-col items-center justify-center text-center"
                  style={{ minHeight: 400 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: "var(--mid)" }}
                  >
                    <Calendar className="w-10 h-10 text-muted" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Counselor</h3>
                  <p className="text-muted text-sm px-8">Choose a professional from the list to view their availability and book a session.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Existing Appointments Section */}
        <div className="pt-10">
            <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-teal-400" />
                <h2 className="text-2xl font-bold text-white serif">Your Upcoming Sessions</h2>
            </div>
            <p className="text-muted text-sm italic">Visit your dashboard to see and manage all your scheduled appointments.</p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Appointments;
