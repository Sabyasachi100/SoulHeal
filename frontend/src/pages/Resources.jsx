import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Video, Music, Search, Play, ExternalLink, Bookmark } from 'lucide-react';
import { PageTransition, HoverCard, StaggerContainer, StaggerItem, FloatingOrb } from "../components/Animations";

const Resources = () => {
  const [activeType, setActiveType] = useState('All');
  const [bookmarked, setBookmarked] = useState([]);

  const resourceTypes = [
    { name: 'All', icon: BookOpen },
    { name: 'Video', icon: Video },
    { name: 'Audio', icon: Music },
    { name: 'Article', icon: BookOpen },
  ];

  const resources = [
    { id: 1, title: "Understanding Mindfulness", description: "A comprehensive guide to practicing mindfulness in daily life.", type: "Article", category: "Stress Management", time: "10 min read", author: "SoulHeal Team", color: "#34d399" },
    { id: 2, title: "15-Min Sleep Meditation", description: "Deep relaxation audio to help you fall asleep faster.", type: "Audio", category: "Sleep", time: "15 mins", author: "Alex Rivera", color: "#60a5fa" },
    { id: 3, title: "Quick Breathing Exercise", description: "Technique to calm anxiety in less than 2 minutes.", type: "Article", category: "Anxiety", time: "2 mins", author: "Dr. Meera", color: "var(--accent)" },
    { id: 4, title: "Building Resilience", description: "Video session on how to bounce back from difficult situations.", type: "Video", category: "Mental Strength", time: "12 mins", author: "Coach Sarah", color: "#f9a8d4" },
  ];

  const filtered = activeType === 'All' ? resources : resources.filter(r => r.type === activeType);

  const toggleBookmark = (id) =>
    setBookmarked(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  return (
    <PageTransition>
      <div className="space-y-10 relative">
        <FloatingOrb style={{ top: "-60px", left: "5%" }} color="#34d399" size={300} delay={2} />

        <motion.div className="text-center max-w-2xl mx-auto" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4 text-gradient serif">Wellness Library</h1>
          <p className="text-muted font-light">Explore curated resources to support your mental wellness journey.</p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6 glass-morph p-5 rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-3 overflow-x-auto pb-1 w-full md:w-auto">
            {resourceTypes.map((t) => (
              <motion.button
                key={t.name}
                onClick={() => setActiveType(t.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap"
                animate={{
                  background: activeType === t.name ? "var(--accent)" : "var(--mid)",
                  color: activeType === t.name ? "var(--abyss)" : "var(--muted)",
                }}
                transition={{ duration: 0.2 }}
              >
                <t.icon className="w-4 h-4" />
                {t.name}
              </motion.button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted)" }} />
            <input type="text" placeholder="Search keywords..." className="ocean-input pl-11" />
          </div>
        </motion.div>

        {/* Resource cards */}
        <AnimatePresence mode="wait">
          <motion.div key={activeType} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((res, i) => (
              <motion.div
                key={res.id}
                className="premium-card flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="w-full sm:w-44 h-44 rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer group/img flex-shrink-0"
                  style={{ background: `${res.color}12` }}
                  whileTap={{ scale: 0.97 }}
                >
                  {res.type === 'Video' ? <Video className="w-12 h-12" style={{ color: res.color }} /> :
                   res.type === 'Audio' ? <Music className="w-12 h-12" style={{ color: res.color }} /> :
                   <BookOpen className="w-12 h-12" style={{ color: res.color }} />}

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{ background: "rgba(7,26,31,0.75)" }}
                  >
                    <motion.div
                      className="p-4 rounded-full border"
                      style={{ borderColor: "var(--border-h)", background: "rgba(94,207,191,0.15)" }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Play className="w-6 h-6 fill-current text-white" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{res.category}</span>
                    <motion.button
                      onClick={() => toggleBookmark(res.id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.85 }}
                    >
                      <Bookmark
                        className="w-4 h-4 transition-colors"
                        style={{ color: bookmarked.includes(res.id) ? "var(--accent)" : "var(--muted)", fill: bookmarked.includes(res.id) ? "var(--accent)" : "none" }}
                      />
                    </motion.button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1.5">{res.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{res.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                    <div className="text-xs text-muted font-medium">
                      <span>{res.time}</span>
                      <span className="mx-2">·</span>
                      <span>{res.author}</span>
                    </div>
                    <motion.button
                      className="p-2 rounded-lg transition-all"
                      style={{ background: "rgba(94,207,191,0.1)", color: "var(--accent)" }}
                      whileHover={{ scale: 1.15, background: "var(--accent)", color: "var(--abyss)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Resources;
