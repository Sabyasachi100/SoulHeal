import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Paperclip, Smile, Heart, Sparkles } from 'lucide-react';
import { PageTransition, PulseDot, AnimatedButton } from "../components/Animations";
import getResponse from "../services/aiChat";

/* ─── Typing Indicator ─────────────────────────────────────────────────────── */
const TypingIndicator = () => (
  <motion.div
    className="flex justify-start"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
  >
    <div className="flex items-end gap-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(94,207,191,0.15)", border: "0.5px solid var(--border-h)" }}
      >
        <Bot className="w-4 h-4" style={{ color: "var(--accent)" }} />
      </div>
      <div
        className="px-5 py-4 rounded-2xl flex items-center gap-1.5"
        style={{ background: "var(--mid)", border: "0.5px solid var(--border)", borderRadius: "1.25rem 1.25rem 1.25rem 0.3rem" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--accent)" }}
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── Suggested Prompts ────────────────────────────────────────────────────── */
const SUGGESTIONS = [
  "I'm feeling anxious today",
  "I can't sleep well lately",
  "I need help managing stress",
  "I'm feeling lonely",
  "I want to try meditation",
];

/* ─── Chat Page ────────────────────────────────────────────────────────────── */
const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'SoulHeal AI',
      text: "Hello! 👋 I'm your SoulHeal AI companion. This is a safe, judgment-free space. How are you feeling today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: false,
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, isTyping]);

  const addAIMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      sender: 'SoulHeal AI',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: false,
    }]);
  };

  const sendMessage = (text = input) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'Me',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay (800ms–2s)
    const delay = Math.random() * 1200 + 800;
    setTimeout(() => {
      setIsTyping(false);
      addAIMessage(getResponse(trimmed));
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleSuggestion = (s) => {
    setInput(s);
    sendMessage(s);
    inputRef.current?.focus();
  };

  return (
    <PageTransition>
      <div className="flex flex-col gap-4" style={{ height: "calc(100vh - 140px)" }}>

        {/* Header bar */}
        <motion.div
          className="flex items-center justify-between glass-morph px-6 py-4 rounded-2xl flex-shrink-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(94,207,191,0.15)", border: "0.5px solid var(--border-h)" }}
              animate={{ boxShadow: ["0 0 0px rgba(94,207,191,0.2)", "0 0 16px rgba(94,207,191,0.35)", "0 0 0px rgba(94,207,191,0.2)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6" style={{ color: "var(--accent)" }} />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white">SoulHeal AI</h2>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(94,207,191,0.1)", color: "var(--accent)" }}>
                  AI
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <PulseDot />
                <span className="text-[10px] uppercase tracking-widest font-bold text-green-400">Always here for you</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted">
            <Heart className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <span>Judgment-free & confidential</span>
          </div>
        </motion.div>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto space-y-5 pr-1 px-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Suggestions (only when fresh) */}
          {messages.length === 1 && (
            <motion.div
              className="pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs text-muted text-center mb-3 uppercase tracking-widest font-bold">Quick start</p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <motion.button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="text-xs font-medium px-4 py-2 rounded-full border transition-all"
                    style={{ background: "rgba(94,207,191,0.07)", borderColor: "var(--border)", color: "var(--muted)" }}
                    whileHover={{ borderColor: "var(--accent)", color: "var(--accent)", background: "rgba(94,207,191,0.12)" }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`flex items-end gap-2.5 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 18, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                {!msg.isMe && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
                    style={{ background: "rgba(94,207,191,0.15)", border: "0.5px solid var(--border-h)" }}
                  >
                    <Bot className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  </div>
                )}

                <div style={{ maxWidth: "72%" }}>
                  <div
                    className="px-5 py-3.5 text-sm leading-relaxed"
                    style={msg.isMe ? {
                      background: "var(--accent)",
                      color: "var(--abyss)",
                      borderRadius: "1.3rem 1.3rem 0.3rem 1.3rem",
                      fontWeight: 500,
                    } : {
                      background: "var(--mid)",
                      color: "var(--text)",
                      border: "0.5px solid var(--border)",
                      borderRadius: "1.3rem 1.3rem 1.3rem 0.3rem",
                    }}
                  >
                    {msg.text}
                  </div>
                  <p className={`text-[9px] font-bold text-muted mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`} style={{ opacity: 0.5 }}>
                    {msg.time}
                  </p>
                </div>

                {msg.isMe && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
                    style={{ background: "var(--surface)", border: "0.5px solid var(--border)" }}
                  >
                    <User className="w-4 h-4 text-muted" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 glass-morph px-5 py-4 rounded-2xl flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            type="button"
            className="p-2 rounded-xl text-muted flex-shrink-0"
            whileHover={{ background: "var(--mid)", color: "var(--accent)" }}
            whileTap={{ scale: 0.9 }}
          >
            <Smile className="w-5 h-5" />
          </motion.button>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share how you're feeling..."
            className="ocean-input flex-1"
            style={{ padding: "0.6rem 1rem" }}
          />

          <AnimatedButton
            type="submit"
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
            style={{
              background: input.trim() ? "var(--accent)" : "var(--mid)",
              color: input.trim() ? "var(--abyss)" : "var(--muted)",
            }}
          >
            <motion.div
              animate={{ rotate: input.trim() ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Send className="w-5 h-5" />
            </motion.div>
          </AnimatedButton>
        </motion.form>
      </div>
    </PageTransition>
  );
};

export default Chat;
