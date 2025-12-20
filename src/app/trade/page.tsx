"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// Types
interface TradeStats {
  totalPnL: number;
  winRate: number;
  totalTrades: number;
  profitableTrades: number;
  lossTrades: number;
  avgProfit: number;
  avgLoss: number;
  profitFactor: number;
  maxDrawdown: number;
  totalWalletBalance: number;
  availableBalance: number;
  unrealizedPnL: number;
}

interface PerformanceData {
  date: string;
  pnl: number;
  balance: number;
}

interface MonthlyData {
  month: string;
  return: number;
}

interface RecentTrade {
  symbol: string;
  side: string;
  positionSide: string;
  pnl: number;
  qty: number;
  price: number;
  time: number;
}

interface ApiResponse {
  success: boolean;
  stats: TradeStats;
  performanceData: PerformanceData[];
  monthlyData: MonthlyData[];
  recentTrades: RecentTrade[];
  lastUpdated: string;
  error?: string;
}

// Particle Ring Animation Component
function ParticleRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Track mouse
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // Particle class
    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      angle: number;
      speed: number;
      radius: number;
      opacity: number;
      pulseSpeed: number;
      pulseOffset: number;

      constructor(centerX: number, centerY: number, radius: number) {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = radius + (Math.random() - 0.5) * 100;
        this.baseX = centerX + Math.cos(this.angle) * this.radius;
        this.baseY = centerY + Math.sin(this.angle) * this.radius;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = Math.random() * 3 + 1;
        this.speed = 0.002 + Math.random() * 0.003;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time: number, centerX: number, centerY: number, mouseX: number, mouseY: number) {
        this.angle += this.speed;

        // Pulsing radius
        const pulseRadius = this.radius + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 20;

        this.baseX = centerX + Math.cos(this.angle) * pulseRadius;
        this.baseY = centerY + Math.sin(this.angle) * pulseRadius;

        // Mouse interaction
        const dx = mouseX - this.baseX;
        const dy = mouseY - this.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          this.x = this.baseX - dx * force * 0.3;
          this.y = this.baseY - dy * force * 0.3;
        } else {
          this.x += (this.baseX - this.x) * 0.1;
          this.y += (this.baseY - this.y) * 0.1;
        }

        // Pulsing opacity
        this.opacity = 0.3 + Math.sin(time * 0.01 + this.pulseOffset) * 0.2;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Create particles
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const mainRadius = Math.min(canvas.width, canvas.height) * 0.3;
    const particles: Particle[] = [];

    for (let i = 0; i < 300; i++) {
      particles.push(new Particle(centerX, centerY, mainRadius));
    }

    // Animation loop
    let time = 0;
    const animate = () => {
      ctx.fillStyle = "rgba(5, 5, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const newCenterX = canvas.width / 2;
      const newCenterY = canvas.height / 2;

      particles.forEach((particle) => {
        particle.update(time, newCenterX, newCenterY, mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });

      // Draw connecting lines between close particles
      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 50) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, #05050f, #0a0a1a)" }}
    />
  );
}

// Animated Counter
function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0 }: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}

// Floating Card Component
function FloatingCard({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className={`relative group ${className}`}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-[#0a0a1a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-500">
        {children}
      </div>
    </motion.div>
  );
}

// Glowing Text
function GlowingText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative ${className}`}>
      <span className="absolute inset-0 blur-2xl bg-blue-500/30" />
      <span className="relative">{children}</span>
    </span>
  );
}

export default function TradePage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"]);

  // Fetch data from Binance API
  const fetchData = useCallback(async () => {
    try {
      console.log("Fetching Binance data...");
      setError(null);
      const response = await fetch("/api/binance", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Binance data received:", result);

      if (result.error) {
        setError(result.error);
      }

      setData(result);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError(err instanceof Error ? err.message : "Veri alınamadı");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Scroll sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollY / windowHeight);
      setActiveSection(section);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = data?.stats || {
    totalPnL: 0,
    winRate: 0,
    totalTrades: 0,
    profitableTrades: 0,
    lossTrades: 0,
    avgProfit: 0,
    avgLoss: 0,
    profitFactor: 0,
    maxDrawdown: 0,
    totalWalletBalance: 0,
    availableBalance: 0,
    unrealizedPnL: 0,
  };

  return (
    <main className="relative min-h-screen w-full text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleRing />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="font-bold text-sm">DS</span>
            </div>
            <span className="font-semibold text-lg tracking-wide">DESTELI TRADE</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#stats" className="text-gray-400 hover:text-white transition-colors text-sm">İstatistikler</a>
            <a href="#performance" className="text-gray-400 hover:text-white transition-colors text-sm">Performans</a>
            <a href="#trades" className="text-gray-400 hover:text-white transition-colors text-sm">Trade&apos;ler</a>
            <motion.a
              href="#copy"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2 rounded-full text-sm font-medium"
            >
              Copy Trading
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Error/Loading Banner */}
      {(error || loading) && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
          {loading ? (
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-full px-6 py-3 flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
              <span className="text-blue-200 text-sm">Binance verileri yükleniyor...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/30 rounded-full px-6 py-3 flex items-center gap-3">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-200 text-sm">{error}</span>
            </div>
          ) : null}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div style={{ y }} className="text-center max-w-5xl mx-auto">
          {/* Live Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${data?.success ? 'bg-green-400' : 'bg-yellow-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${data?.success ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            </span>
            <span className="text-blue-200 text-sm font-medium">
              {data?.success ? 'Canlı Veriler • Binance Futures' : 'Bağlanıyor...'}
            </span>
          </motion.div>

          {/* Main Title - Elegant Serif */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight font-playfair"
          >
            <span className="italic text-gray-300">Sermayeni</span>
            <br />
            <GlowingText className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              profesyonelce
            </GlowingText>
            <br />
            <span className="italic text-gray-300">yönet.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Gelişmiş futures stratejileri ile piyasayı okuyor, riski yönetiyor ve tutarlı getiri sağlıyorum.
            Copy Trading ile bu başarıya sen de ortak ol.
          </motion.p>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-wrap justify-center gap-12 md:gap-20"
          >
            <div className="text-center">
              <p className={`text-4xl md:text-6xl font-light ${stats.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stats.totalPnL >= 0 ? '+' : ''}<AnimatedCounter value={stats.totalPnL} decimals={0} />
              </p>
              <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase">Toplam PnL (USDT)</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-light text-blue-400">
                <AnimatedCounter value={stats.winRate} decimals={1} suffix="%" />
              </p>
              <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase">Win Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-light text-white">
                <AnimatedCounter value={stats.totalTrades} />
              </p>
              <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase">Trade Sayısı</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-wrap justify-center gap-4 mt-16"
          >
            <motion.a
              href="#copy"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-full font-medium text-sm tracking-wide hover:bg-gray-100 transition-colors"
            >
              Copy Trading&apos;e Başla
            </motion.a>
            <motion.a
              href="#stats"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-medium text-sm tracking-wide hover:bg-white/5 transition-colors"
            >
              İstatistikleri Gör
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-gray-500 text-xs tracking-widest uppercase">Keşfet</span>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4 font-playfair">
              <span className="italic">Detaylı</span> Metrikler
            </h2>
            <p className="text-gray-400">01 Ekim 2025&apos;ten itibaren tüm trade verileri</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FloatingCard delay={0}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-green-400 text-sm">+{stats.profitableTrades}</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Kazançlı Trade</p>
              <p className="text-2xl font-light text-white">
                <AnimatedCounter value={stats.profitableTrades} />
              </p>
            </FloatingCard>

            <FloatingCard delay={0.1}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <span className="text-red-400 text-sm">-{stats.lossTrades}</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Kayıplı Trade</p>
              <p className="text-2xl font-light text-white">
                <AnimatedCounter value={stats.lossTrades} />
              </p>
            </FloatingCard>

            <FloatingCard delay={0.2}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Ortalama Kazanç</p>
              <p className="text-2xl font-light text-green-400">
                +$<AnimatedCounter value={stats.avgProfit} decimals={2} />
              </p>
            </FloatingCard>

            <FloatingCard delay={0.3}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Profit Factor</p>
              <p className="text-2xl font-light text-purple-400">
                <AnimatedCounter value={stats.profitFactor} decimals={2} />
              </p>
            </FloatingCard>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <FloatingCard delay={0.4}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Cüzdan Bakiyesi</p>
              <p className="text-2xl font-light text-white">
                $<AnimatedCounter value={stats.totalWalletBalance} decimals={2} />
              </p>
            </FloatingCard>

            <FloatingCard delay={0.5}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Max Drawdown</p>
              <p className="text-2xl font-light text-orange-400">
                <AnimatedCounter value={stats.maxDrawdown} decimals={1} suffix="%" />
              </p>
            </FloatingCard>

            <FloatingCard delay={0.6}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Açık PnL</p>
              <p className={`text-2xl font-light ${stats.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stats.unrealizedPnL >= 0 ? '+' : ''}$<AnimatedCounter value={Math.abs(stats.unrealizedPnL)} decimals={2} />
              </p>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Performance Chart */}
      <section id="performance" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4 font-playfair">
              <span className="italic">Performans</span> Grafiği
            </h2>
            <p className="text-gray-400">Kümülatif PnL değişimi</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-[#0a0a1a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
              <div className="h-[400px]">
                {data?.performanceData && data.performanceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.performanceData}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                      <XAxis
                        dataKey="date"
                        stroke="#4b5563"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
                      />
                      <YAxis
                        stroke="#4b5563"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0a0a1a',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '12px',
                          padding: '12px'
                        }}
                        labelStyle={{ color: '#9ca3af' }}
                        formatter={(value) => [`$${value?.toLocaleString() ?? 0}`, 'Bakiye']}
                        labelFormatter={(label) => new Date(label).toLocaleDateString('tr-TR')}
                      />
                      <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        <span>Veriler yükleniyor...</span>
                      </div>
                    ) : (
                      "Henüz veri yok"
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Monthly Returns */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4 font-playfair">
              <span className="italic">Aylık</span> Getiriler
            </h2>
            <p className="text-gray-400">Her ayın toplam PnL değeri</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-[#0a0a1a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
              <div className="h-[350px]">
                {data?.monthlyData && data.monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                      <XAxis dataKey="month" stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0a0a1a',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '12px',
                        }}
                        labelStyle={{ color: '#9ca3af' }}
                        formatter={(value) => [`$${value}`, 'PnL']}
                      />
                      <Bar dataKey="return" radius={[6, 6, 0, 0]}>
                        {data.monthlyData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.return >= 0 ? '#10b981' : '#ef4444'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    {loading ? "Yükleniyor..." : "Henüz veri yok"}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Trades */}
      <section id="trades" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4 font-playfair">
              <span className="italic">Son</span> Trade&apos;ler
            </h2>
            <p className="text-gray-400">Gerçek zamanlı trade geçmişi</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-[#0a0a1a]/80 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 p-6 border-b border-white/5 bg-white/[0.02]">
                <p className="text-gray-400 text-sm font-medium">Sembol</p>
                <p className="text-gray-400 text-sm font-medium">Pozisyon</p>
                <p className="text-gray-400 text-sm font-medium text-right">Miktar</p>
                <p className="text-gray-400 text-sm font-medium text-right">PnL</p>
                <p className="text-gray-400 text-sm font-medium text-right">Tarih</p>
              </div>

              {/* Table Body */}
              <AnimatePresence>
                {data?.recentTrades && data.recentTrades.length > 0 ? (
                  data.recentTrades.map((trade, index) => (
                    <motion.div
                      key={`${trade.symbol}-${trade.time}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-5 gap-4 p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-400">{trade.symbol.slice(0, 3)}</span>
                        </div>
                        <span className="font-medium">{trade.symbol}</span>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          trade.side === "BUY"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                          {trade.positionSide === "LONG" ? "LONG" : trade.positionSide === "SHORT" ? "SHORT" : trade.side}
                        </span>
                      </div>
                      <p className="text-right text-gray-300">{trade.qty.toFixed(4)}</p>
                      <p className={`text-right font-medium ${trade.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                      </p>
                      <p className="text-right text-gray-400 text-sm">
                        {new Date(trade.time).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        <span>Veriler yükleniyor...</span>
                      </div>
                    ) : (
                      "Henüz trade yok"
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Copy Trading CTA */}
      <section id="copy" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-[40px] blur-3xl" />

            <div className="relative bg-gradient-to-b from-[#0a0a1a] to-[#0d0d1f] border border-blue-500/20 rounded-[40px] p-12 md:p-20 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/30"
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-light mb-6 font-playfair">
                  <span className="text-gray-200">Beni takip et,</span>
                  <br />
                  <span className="italic bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    birlikte kazanalım.
                  </span>
                </h2>

                <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
                  Binance Copy Trading ile pozisyonlarımı otomatik olarak kopyala.
                  Risk yönetimini sen belirle, stratejiyi ben yöneteyim.
                </p>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {["Otomatik Kopyalama", "Risk Kontrolü", "7/24 Aktif", "Şeffaf Sonuçlar"].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
                    >
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.a
                  href="https://www.binance.com/en/copy-trading"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white text-black font-medium text-lg px-10 py-5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span>Copy Trading&apos;e Başla</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>

                <p className="text-gray-500 text-sm mt-8">
                  * Geçmiş performans gelecekteki sonuçları garanti etmez. Yatırım tavsiyesi değildir.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="font-bold text-sm">DS</span>
              </div>
              <span className="font-semibold tracking-wide">DESTELI TRADE</span>
            </div>

            <p className="text-gray-500 text-sm text-center">
              Veriler gerçek zamanlı olarak Binance API&apos;sinden alınmaktadır.
              {data?.lastUpdated && (
                <span className="block text-xs mt-1">
                  Son güncelleme: {new Date(data.lastUpdated).toLocaleString('tr-TR')}
                </span>
              )}
            </p>

            <a
              href="https://www.binance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L7.5 4.5l4.5 4.5 4.5-4.5L12 0zM3 7.5L0 12l3 4.5L6 12 3 7.5zM21 7.5L18 12l3 4.5 3-4.5-3-4.5zM12 9l-3 3 3 3 3-3-3-3zM7.5 13.5L3 18l4.5 4.5 4.5-4.5-4.5-4.5zM16.5 13.5L12 18l4.5 4.5L21 18l-4.5-4.5z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Section Indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === i ? "bg-blue-500 scale-125" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
