"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Particle({ delay, x, y, size, color }: { delay: number; x: number; y: number; size: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: color,
        filter: `blur(${size / 4}px)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.5, 1, 0],
        scale: [0, 1.5, 1, 1.2, 0],
        y: [0, -100, -200, -300, -400],
        x: [0, 30, -20, 40, -30],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FloatingOrb({ x, y, size, color, duration }: { x: number; y: number; size: number; color: string; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full opacity-30"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
      animate={{
        x: [0, 100, -50, 80, 0],
        y: [0, -80, 60, -40, 0],
        scale: [1, 1.3, 0.9, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    y: 80 + Math.random() * 20,
    size: 4 + Math.random() * 12,
    color: ["#ff0080", "#7928ca", "#00d4ff", "#ff4d4d", "#00ff88"][Math.floor(Math.random() * 5)],
  }));

  const orbs = [
    { x: 10, y: 20, size: 400, color: "#ff0080", duration: 20 },
    { x: 70, y: 60, size: 500, color: "#7928ca", duration: 25 },
    { x: 40, y: 30, size: 350, color: "#00d4ff", duration: 18 },
    { x: 80, y: 10, size: 300, color: "#ff4d4d", duration: 22 },
    { x: 20, y: 70, size: 450, color: "#00ff88", duration: 28 },
  ];

  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  const glowVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const title = "DESTELISTUDIO";

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Floating Orbs */}
      {mounted && orbs.map((orb, i) => (
        <FloatingOrb key={i} {...orb} />
      ))}

      {/* Particles */}
      {mounted && particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="text-center">
          {/* Glow Effect Behind Text */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          >
            <div
              className="h-64 w-[800px] rounded-full opacity-50"
              style={{
                background: "radial-gradient(ellipse, rgba(255,0,128,0.4) 0%, rgba(121,40,202,0.2) 40%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="relative flex justify-center text-6xl font-black tracking-tight sm:text-8xl md:text-9xl lg:text-[12rem]"
            initial="hidden"
            animate="visible"
          >
            {title.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="inline-block bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 80px rgba(255,0,128,0.5)",
                }}
                whileHover={{
                  scale: 1.2,
                  color: "#ff0080",
                  textShadow: "0 0 40px rgba(255,0,128,1)",
                  transition: { duration: 0.2 },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Animated Underline */}
          <motion.div
            className="mx-auto mt-8 h-1 overflow-hidden rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="h-full w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 100%" }}
            />
          </motion.div>

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="animate-shimmer absolute inset-0" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="mt-8 text-lg tracking-[0.5em] text-gray-500 uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Game Studio
          </motion.p>
        </div>
      </div>

      {/* Animated Corner Accents */}
      <motion.div
        className="absolute left-8 top-8 h-20 w-20 border-l-2 border-t-2 border-pink-500/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      />
      <motion.div
        className="absolute right-8 top-8 h-20 w-20 border-r-2 border-t-2 border-cyan-500/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.7, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 h-20 w-20 border-b-2 border-l-2 border-purple-500/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.9, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 h-20 w-20 border-b-2 border-r-2 border-pink-500/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.1, duration: 0.5 }}
      />

      {/* Floating Dots */}
      {mounted && [1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-white/30"
          style={{
            left: `${15 + i * 18}%`,
            top: "85%",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </main>
  );
}
