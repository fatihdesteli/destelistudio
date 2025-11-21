"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Mouse position for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // Transform mouse position into tilt rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Mouse follower position
  const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position for tilt (-0.5 to 0.5)
      const rect = document.body.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseXNorm = (e.clientX / width) - 0.5;
      const mouseYNorm = (e.clientY / height) - 0.5;

      x.set(mouseXNorm);
      y.set(mouseYNorm);

      // Update cursor position for spotlight
      setCursorXY({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const title = "DESTELISTUDIO";

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const
      }
    }
  };

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5 + (i * 0.05),
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    }),
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Aurora Background */}
      <div className="absolute inset-0 animate-aurora opacity-60" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      {/* Mouse Spotlight with Color Shift */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${cursorXY.x}px ${cursorXY.y}px, 
            rgba(${Math.min(255, (cursorXY.x / window.innerWidth) * 255)}, 
                 ${Math.min(255, (cursorXY.y / window.innerHeight) * 255)}, 
                 255, 0.15), 
            transparent 40%)`
        }}
      />

      {/* Floating Accents */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* 3D Tilt Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
        className="relative z-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-card p-12 md:p-24 rounded-3xl relative overflow-hidden"
        >
          {/* Shine Effect on Card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

          {/* Main Title */}
          <div className="relative z-10 overflow-hidden">
            <h1 className="flex text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter glass-text-shadow">
              {title.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  className="inline-block animate-text-gradient"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtitle / Decoration */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 1.5, duration: 1 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mt-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-center mt-6 text-sm md:text-base tracking-[0.5em] text-gray-300 font-light uppercase"
          >
            Future Interactive
          </motion.p>
        </motion.div>
      </motion.div>
    </main>
  );
}
