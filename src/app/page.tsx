"use client";

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// Logo verisi - yeni logolar buraya eklenir
const apps = [
  { id: 1, name: "Memes Avcisi", logo: "/memesavcisi.png", x: -400, y: -200, scale: 1 },
  { id: 2, name: "Sinir Puzzle", logo: "/sinirpuzzle.png", x: 350, y: -250, scale: 0.9 },
  { id: 3, name: "Istanbul Cats", logo: "/istanbulcats.png", x: -350, y: 150, scale: 1.1 },
  { id: 4, name: "SK Logo", logo: "/SKlogo.png", x: 380, y: 180, scale: 0.85 },
  { id: 5, name: "Undead Hunter", logo: "/UNDEADHUNTER.png", x: -250, y: -350, scale: 0.95 },
  { id: 6, name: "Kazandiran Misyon", logo: "/kazandiranmisyon.png", x: 280, y: -100, scale: 1.05 },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCV, setShowCV] = useState(false);

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

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

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
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = '';
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (showCV) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [showCV]);

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

      {/* CV Button - Top Center */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-30"
      >
        <button
          onClick={() => setShowCV(true)}
          className="group relative px-6 py-2.5 rounded-full overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 border border-white/10 rounded-full group-hover:border-white/30 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 rounded-full transition-all duration-500" />
          <div className="relative flex items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm font-medium tracking-wider uppercase">About Me / CV</span>
          </div>
        </button>
      </motion.div>

      {/* Floating App Logos */}
      <div className="absolute inset-0 pointer-events-none">
        {apps.map((app, index) => {
          // Her logo icin farkli parallax siddeti
          const parallaxStrength = 0.15 + (index * 0.05);

          return (
            <FloatingLogo
              key={app.id}
              app={app}
              mouseX={smoothMouseX}
              mouseY={smoothMouseY}
              parallaxStrength={parallaxStrength}
              index={index}
              isMobile={isMobile}
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

        <h1 className="relative text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
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

      {/* CV Modal */}
      <AnimatePresence>
        {showCV && (
          <CVModal onClose={() => setShowCV(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

// CV Modal Component
function CVModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-gradient-to-b from-[#12122a] via-[#0f0f20] to-[#0a0a18] shadow-2xl"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(139, 92, 246, 0.3) transparent',
        }}
      >
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
        >
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-8 pb-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
              <span className="text-2xl font-bold text-white">MF</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Mehmet Fatih Desteli
              </h2>
              <p className="text-blue-400/80 text-sm mt-1">Software Developer & Entrepreneur</p>
            </div>
          </div>

          {/* Contact Row */}
          <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-400">
            <a href="mailto:fatihdesteli@gmail.com" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              fatihdesteli@gmail.com
            </a>
            <a href="https://github.com/fatihdesteli" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              github.com/fatihdesteli
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-8 mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* About Me */}
        <div className="p-8 pb-4">
          <SectionTitle title="About Me" />
          <p className="text-gray-300/80 leading-relaxed text-sm mt-3">
            I am an experienced software developer with over 10 years in building and improving software systems.
            My skills include creating government level secure applications, managing databases, and analyzing data.
            I have worked on important projects like passport stock management and control systems and startup projects
            using technologies like C#, ASP.NET, Python, and SQL.
          </p>
        </div>

        {/* Current Focus - Claude Code */}
        <div className="px-8 pb-4">
          <div className="rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-300/90 mb-1">Currently Building with AI</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Recently, I have been actively developing mobile and web applications using <span className="text-purple-300 font-medium">Claude Code</span> as
                  my AI-powered development companion. From rapid prototyping to full-stack implementation, I leverage
                  cutting-edge AI tools to accelerate development workflows, build interactive web experiences with Next.js and React,
                  and craft engaging mobile apps &mdash; pushing the boundaries of what&apos;s possible with AI-assisted software engineering.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="px-8 pb-4">
          <SectionTitle title="Work Experience" />

          <div className="mt-4 space-y-5">
            <ExperienceItem
              period="2018 - 2023"
              title="Turkiye Republic Directorate General of Population and Citizenship Affairs"
              description="Developed advanced software solutions for passport production, including secure personalization systems and database management. Optimized processes to ensure accuracy, scalability, and compliance with national and international security standards."
            />
            <ExperienceItem
              period="2013 - 2018"
              title="Turkiye Republic General Directorate of Security - Department of Passport and Secure Documents"
              description="Designed and developed secure personalization software, efficient database systems and stock management applications to support the production and distribution of passports and driver's licenses for the Republic of Turkiye. Focused on enhancing system reliability, security and operational efficiency."
            />
          </div>
        </div>

        {/* Startup Projects */}
        <div className="px-8 pb-4">
          <SectionTitle title="Startup Projects" />

          <div className="mt-4 space-y-5">
            <ExperienceItem
              period="2019 - 2021"
              title="pabiba.com"
              description="A web platform that facilitates the purchasing process of companies. It creates a network for both buyer and seller companies. It helps companies find the product they are looking for at the best price."
            />
            <ExperienceItem
              period="2015 - 2018"
              title="edugunum.com"
              description="A web application that allows the online sending of gold gifts given at marriage ceremonies, one of the most important Turkish traditions. A special invitation web page is created for the couples who create the event. Users can easily send gold gifts and send video messages with it."
            />
          </div>
        </div>

        {/* Education */}
        <div className="px-8 pb-4">
          <SectionTitle title="Education" />

          <div className="mt-4 space-y-3">
            <EducationItem period="2015 - 2017" degree="Computer Programming" school="Samsun Ondokuz Mayis University" />
            <EducationItem period="2011 - 2013" degree="Business Administration" school="Eskisehir Anadolu University" />
            <EducationItem period="2009 - 2011" degree="Police Academy" school="Nigde Police Academy" />
          </div>
        </div>

        {/* Skills */}
        <div className="px-8 pb-8">
          <SectionTitle title="Skills" />

          <div className="mt-4 space-y-3">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Languages</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <SkillBadge label="Turkish - Fluent" />
                <SkillBadge label="English - B2" />
                <SkillBadge label="Russian - A2" />
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Technologies</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {["C#", "ASP.NET", "HTML5", "Python", "MySQL", "MSSQL", "JavaScript", "Android", "Next.js", "React", "TypeScript", "Claude Code"].map((skill) => (
                  <SkillBadge key={skill} label={skill} highlight={skill === "Claude Code"} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

// Section Title
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="text-lg font-semibold text-white/90">{title}</h3>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}

// Experience Item
function ExperienceItem({ period, title, description }: { period: string; title: string; description: string }) {
  return (
    <div className="relative pl-4 border-l border-white/10">
      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-400/60 -translate-x-[4.5px]" />
      <span className="text-xs text-blue-400/70 font-mono">{period}</span>
      <h4 className="text-sm font-semibold text-white/80 mt-1">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed mt-1">{description}</p>
    </div>
  );
}

// Education Item
function EducationItem({ period, degree, school }: { period: string; degree: string; school: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xs text-blue-400/70 font-mono whitespace-nowrap mt-0.5">{period}</span>
      <div>
        <h4 className="text-sm font-semibold text-white/80">{degree}</h4>
        <p className="text-gray-400 text-xs">{school}</p>
      </div>
    </div>
  );
}

// Skill Badge
function SkillBadge({ label, highlight = false }: { label: string; highlight?: boolean }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
      highlight
        ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
        : 'bg-white/5 border-white/10 text-gray-300'
    }`}>
      {label}
    </span>
  );
}

// Floating Logo Component
function FloatingLogo({
  app,
  mouseX,
  mouseY,
  parallaxStrength,
  index,
  isMobile
}: {
  app: typeof apps[0];
  mouseX: any;
  mouseY: any;
  parallaxStrength: number;
  index: number;
  isMobile: boolean;
}) {
  // Mobilde pozisyonlari kucult
  const positionScale = isMobile ? 0.35 : 1;
  const scaledX = app.x * positionScale;
  const scaledY = app.y * positionScale;

  // Mouse pozisyonuna gore hareket
  const x = useTransform(mouseX, [-1, 1], [-scaledX * parallaxStrength, scaledX * parallaxStrength]);
  const y = useTransform(mouseY, [-1, 1], [-scaledY * parallaxStrength, scaledY * parallaxStrength]);

  // Donme efekti
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
        translateX: scaledX,
        translateY: scaledY,
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
          className="relative bg-white/5 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/10 group-hover:border-white/30 transition-all duration-300 shadow-2xl"
          style={{ transform: `scale(${isMobile ? app.scale * 0.8 : app.scale})` }}
        >
          <div className="w-16 h-16 md:w-24 md:h-24 relative flex items-center justify-center">
            {/* Placeholder - Logo yuklenene kadar */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl md:text-2xl font-bold text-white/70">
                {app.name.charAt(0)}
              </span>
            </div>
            {/* Gercek logo */}
            <Image
              src={app.logo}
              alt={app.name}
              fill
              unoptimized
              className="object-contain rounded-xl relative z-10"
              onError={(e) => {
                // Logo bulunamazsa placeholder goster
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
