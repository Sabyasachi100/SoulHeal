import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─── Floating Particle Canvas ─────────────────────────────────────────────── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(94, 207, 191, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 207, 191, ${p.alpha})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

/* ─── Aurora Blobs ──────────────────────────────────────────────────────────── */
const AuroraBlobs = () => {
  const blobs = [
    { color: "#5ecfbf", x: "10%",  y: "15%",  size: 500, duration: 18, delay: 0 },
    { color: "#0c6478", x: "75%",  y: "10%",  size: 600, duration: 22, delay: 4 },
    { color: "#1e6070", x: "50%",  y: "60%",  size: 700, duration: 25, delay: 8 },
    { color: "#d4b896", x: "85%",  y: "70%",  size: 400, duration: 20, delay: 6 },
    { color: "#5ecfbf", x: "5%",   y: "75%",  size: 380, duration: 16, delay: 2 },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color}22 0%, ${b.color}08 45%, transparent 70%)`,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 1.12, 0.93, 1.08, 1],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ─── Animated Grid ─────────────────────────────────────────────────────────── */
const AnimatedGrid = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      backgroundImage: `
        linear-gradient(rgba(94, 207, 191, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(94, 207, 191, 0.04) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
      maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
    }}
  />
);

/* ─── Shooting Stars ────────────────────────────────────────────────────────── */
const ShootingStar = ({ delay, duration, startX, startY }) => (
  <motion.div
    style={{
      position: "fixed",
      top: startY,
      left: startX,
      width: 2,
      height: 2,
      borderRadius: "50%",
      background: "rgba(94, 207, 191, 0.8)",
      boxShadow: "0 0 6px 2px rgba(94, 207, 191, 0.4), -60px 0 20px rgba(94, 207, 191, 0.15)",
      zIndex: 0,
      pointerEvents: "none",
    }}
    animate={{
      x: [0, 300],
      y: [0, 150],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 8 + 6,
      ease: "easeIn",
    }}
  />
);

/* ─── Breathing Rings ───────────────────────────────────────────────────────── */
const BreathingRings = () => (
  <div
    style={{
      position: "fixed",
      bottom: "-20%",
      right: "-15%",
      pointerEvents: "none",
      zIndex: 0,
    }}
  >
    {[300, 500, 700, 900].map((size, i) => (
      <motion.div
        key={i}
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          border: "0.5px solid rgba(94, 207, 191, 0.08)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: i * 1.3,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

/* ─── Master Background Component ──────────────────────────────────────────── */
const Background = () => {
  const stars = Array.from({ length: 5 }, (_, i) => ({
    delay: i * 3.5,
    duration: 1.2,
    startX: `${Math.random() * 60 + 10}%`,
    startY: `${Math.random() * 40 + 5}%`,
  }));

  return (
    <>
      {/* Base dark background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--abyss)",
          zIndex: -1,
        }}
      />
      {/* Subtle vignette */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(7,26,31,0.6) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <AuroraBlobs />
      <AnimatedGrid />
      <ParticleCanvas />
      <BreathingRings />
      {stars.map((s, i) => (
        <ShootingStar key={i} {...s} />
      ))}
    </>
  );
};

export default Background;
