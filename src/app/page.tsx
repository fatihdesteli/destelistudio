"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// Logo verisi - yeni logolar buraya eklenir
const apps = [
  { id: 1, name: "Memes Avcısı", logo: "/memesavcisi.png", x: -400, y: -200, scale: 1 },
  { id: 2, name: "Sinir Puzzle", logo: "/sinirpuzzle.png", x: 350, y: -250, scale: 0.9 },
  { id: 3, name: "Istanbul Cats", logo: "/istanbulcats.png", x: -350, y: 150, scale: 1.1 },
  { id: 4, name: "SK Logo", logo: "/SKlogo.png", x: 380, y: 180, scale: 0.85 },
  { id: 5, name: "Undead Hunter", logo: "/undeadhunter.png", x: -250, y: -350, scale: 0.95 },
  { id: 6, name: "Kazandıran Misyon", logo: "/kazandiranmisyon.png", x: 280, y: -100, scale: 1.05 },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { stiffness: 150, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.overflow = '';
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a12] via-[#0f0f1e] to-[#0a0a12]">
      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[140px]"
      />

      {/* Floating App Logos */}
      <div className="absolute inset-0 pointer-events-none">
        {apps.map((app, index) => {
          // Her logo için farklı parallax şiddeti
          const parallaxStrength = 0.15 + (index * 0.05);

          return (
            <FloatingLogo
              key={app.id}
              app={app}
              mouseX={smoothMouseX}
              mouseY={smoothMouseY}
              parallaxStrength={parallaxStrength}
              index={index}
            />
          );
        })}
      </div>

      {/* Center Title - Sabit */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-20 text-center"
      >
        {/* Glow effect behind text */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 animate-pulse" />

        <h1 className="relative text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
          <span className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent drop-shadow-2xl">
            DESTELI
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            STUDIO
          </span>
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-gray-400 text-sm md:text-base tracking-[0.3em] uppercase mt-6 font-light"
        >
          Creative Game Studio
        </motion.p>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </main>
  );
}

// Floating Logo Component
function FloatingLogo({
  app,
  mouseX,
  mouseY,
  parallaxStrength,
  index
}: {
  app: typeof apps[0];
  mouseX: any;
  mouseY: any;
  parallaxStrength: number;
  index: number;
}) {
  // Mouse pozisyonuna göre hareket
  const x = useTransform(mouseX, [-1, 1], [-app.x * parallaxStrength, app.x * parallaxStrength]);
  const y = useTransform(mouseY, [-1, 1], [-app.y * parallaxStrength, app.y * parallaxStrength]);

  // Dönme efekti
  const rotate = useTransform(mouseX, [-1, 1], [-5, 5]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.5 + index * 0.1,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{
        x,
        y,
        rotate,
        left: '50%',
        top: '50%',
        translateX: app.x,
        translateY: app.y,
      }}
      className="absolute pointer-events-auto"
    >
      <motion.div
        whileHover={{
          scale: 1.15,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3 }
        }}
        className="group relative"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/30 group-hover:to-purple-500/30 blur-xl transition-all duration-500" />

        {/* Logo container */}
        <div
          className="relative bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 group-hover:border-white/30 transition-all duration-300 shadow-2xl"
          style={{ transform: `scale(${app.scale})` }}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 relative flex items-center justify-center">
            {/* Placeholder - Logo yüklenene kadar */}
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-white/70">
                {app.name.charAt(0)}
              </span>
            </div>
            {/* Gerçek logo - public dizinine eklendikten sonra görünecek */}
            <Image
              src={app.logo}
              alt={app.name}
              fill
              className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
              onError={(e) => {
                // Logo bulunamazsa placeholder göster
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* App name on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="text-xs font-medium text-white/80 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
              {app.name}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
