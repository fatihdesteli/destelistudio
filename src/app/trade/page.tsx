'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
} from 'recharts';

// --- Types ---

interface TradeData {
  stats: {
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
  };
  performanceData: {
    date: string;
    pnl: number;
    balance: number;
  }[];
  monthlyData: {
    month: string;
    return: number;
  }[];
  recentTrades: {
    symbol: string;
    side: string;
    positionSide: string;
    pnl: number;
    qty: number;
    price: number;
    time: number;
  }[];
  lastUpdated: string;
  isDemo?: boolean;
}

// --- Background Animation: Trading Data Stream ---

const TradingStreamBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let lines: FlowLine[] = [];
    let gridOpacity = 0;
    let gridDirection = 1;

    let width = window.innerWidth;
    let height = window.innerHeight * 3;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight * 3;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle class - represents data points flowing
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.vx = (Math.random() - 0.3) * 0.5;
        this.vy = -0.5 - Math.random() * 1.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#10b981' : '#3b82f6';
        this.life = 0;
        this.maxLife = 500 + Math.random() * 500;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Fade out near end of life
        if (this.life > this.maxLife * 0.8) {
          this.opacity *= 0.98;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(')', `, ${this.opacity})`).replace('rgb', 'rgba');

        // Create glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 4
        );
        gradient.addColorStop(0, this.color.replace(')', `, ${this.opacity})`).replace('#', 'rgba(').replace(/(.{2})(.{2})(.{2})/, (_, r, g, b) =>
          `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      isDead() {
        return this.life > this.maxLife || this.y < -10 || this.opacity < 0.01;
      }
    }

    // Flow line class - represents price movement lines
    class FlowLine {
      points: { x: number; y: number }[];
      speed: number;
      opacity: number;
      color: string;
      width: number;

      constructor() {
        this.points = [];
        const startX = Math.random() * width * 0.3;
        const startY = height * (0.2 + Math.random() * 0.6);

        let x = startX;
        let y = startY;

        for (let i = 0; i < 50; i++) {
          this.points.push({ x, y });
          x += 20 + Math.random() * 30;
          y += (Math.random() - 0.5) * 40;
        }

        this.speed = 0.5 + Math.random() * 0.5;
        this.opacity = 0;
        this.color = Math.random() > 0.3 ? '#10b981' : '#ef4444';
        this.width = 1 + Math.random();
      }

      update() {
        // Move line to the right
        this.points.forEach(p => {
          p.x += this.speed;
        });

        // Fade in then out
        if (this.points[0].x < width * 0.3) {
          this.opacity = Math.min(this.opacity + 0.01, 0.15);
        } else if (this.points[0].x > width * 0.7) {
          this.opacity *= 0.98;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity < 0.01) return;

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length - 1; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2;
          const yc = (this.points[i].y + this.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }

        ctx.strokeStyle = this.color.replace(')', `, ${this.opacity})`).replace('#', 'rgba(').replace(/(.{2})(.{2})(.{2})/, (_, r, g, b) =>
          `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`);
        ctx.lineWidth = this.width;
        ctx.stroke();
      }

      isDead() {
        return this.points[0].x > width + 100 || this.opacity < 0.01;
      }
    }

    // Draw subtle grid
    const drawGrid = (ctx: CanvasRenderingContext2D) => {
      const gridSize = 80;

      // Animate grid opacity
      gridOpacity += 0.001 * gridDirection;
      if (gridOpacity > 0.08) gridDirection = -1;
      if (gridOpacity < 0.02) gridDirection = 1;

      ctx.strokeStyle = `rgba(59, 130, 246, ${gridOpacity})`;
      ctx.lineWidth = 0.5;

      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      drawGrid(ctx);

      // Add new particles occasionally
      if (Math.random() < 0.3) {
        particles.push(new Particle());
      }

      // Add new flow lines occasionally
      if (Math.random() < 0.02 && lines.length < 5) {
        lines.push(new FlowLine());
      }

      // Update and draw particles
      particles = particles.filter(p => !p.isDead());
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      // Update and draw flow lines
      lines = lines.filter(l => !l.isDead());
      lines.forEach(l => {
        l.update();
        l.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(180deg, #050508 0%, #0a0a12 50%, #050508 100%)' }}
    />
  );
};

// --- Animated Number Counter ---

const AnimatedCounter = ({ value, decimals = 0, prefix = '', suffix = '' }: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(stepValue * step, value);
      setDisplayValue(current);

      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString('tr-TR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}{suffix}
    </span>
  );
};

// --- Scroll Animated Section ---

const ScrollSection = ({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Stat Card with Hover Effects ---

const StatCard = ({
  title,
  value,
  subValue,
  trend,
  icon,
  delay = 0,
}: {
  title: string;
  value: string | React.ReactNode;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm p-6 cursor-default"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-xl opacity-50" />
      </div>

      {/* Icon background */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="w-20 h-20 text-white">
          {icon}
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] group-hover:border-emerald-500/30 transition-colors duration-300">
            <div className="w-5 h-5 text-emerald-400">
              {icon}
            </div>
          </div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {title}
          </span>
        </div>

        <div className="text-3xl font-semibold text-white tracking-tight mb-1">
          {value}
        </div>

        {subValue && (
          <div className={`text-sm font-medium ${
            trend === 'up' ? 'text-emerald-400' :
            trend === 'down' ? 'text-rose-400' : 'text-gray-500'
          }`}>
            {subValue}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Icons ---

const TrendingUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

// --- Loading Screen ---

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-[#050508] flex flex-col items-center justify-center z-50">
    <div className="relative">
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 rounded-full border-2 border-transparent border-t-emerald-500/50 border-r-blue-500/50"
      />
      {/* Inner ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-2 rounded-full border-2 border-transparent border-b-emerald-400 border-l-blue-400"
      />
      {/* Center dot */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
      </motion.div>
    </div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-8 text-sm font-medium text-gray-500 tracking-[0.2em] uppercase"
    >
      Piyasa Verileri Yükleniyor
    </motion.p>
  </div>
);

// --- Main Component ---

export default function TradePage() {
  const [data, setData] = useState<TradeData | null>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/binance');
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (error) {
        console.error('Failed to fetch trade data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) return <LoadingScreen />;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a0a12]/95 border border-white/10 p-4 rounded-xl backdrop-blur-md shadow-2xl">
          <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-mono font-semibold" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen text-white selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Animated Background */}
      <TradingStreamBackground />

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20"
      >
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-gray-400 tracking-wide">
              Binance Futures • Canlı Veri
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
              Performans
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent">
              Analitiği
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12"
          >
            Algoritmik trade stratejilerinin gerçek zamanlı performans metrikleri
          </motion.p>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <div className={`text-4xl md:text-5xl font-bold tracking-tight ${data.stats.totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {data.stats.totalPnL >= 0 ? '+' : ''}
                <AnimatedCounter value={data.stats.totalPnL} decimals={2} prefix="$" />
              </div>
              <div className="text-sm text-gray-500 mt-2 uppercase tracking-wider">Toplam PnL</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold tracking-tight text-blue-400">
                <AnimatedCounter value={data.stats.winRate} decimals={1} suffix="%" />
              </div>
              <div className="text-sm text-gray-500 mt-2 uppercase tracking-wider">Kazanma Oranı</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                <AnimatedCounter value={data.stats.totalTrades} />
              </div>
              <div className="text-sm text-gray-500 mt-2 uppercase tracking-wider">Toplam Trade</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-600 uppercase tracking-widest">Aşağı Kaydır</span>
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Grid Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Detaylı Metrikler
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              01 Ekim 2025&apos;ten itibaren gerçekleştirilen tüm trade istatistikleri
            </p>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Toplam Net PnL"
              value={<span className={data.stats.totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                ${data.stats.totalPnL.toFixed(2)}
              </span>}
              subValue={`%${data.stats.winRate.toFixed(1)} Kazanma Oranı`}
              icon={<TrendingUpIcon />}
              trend={data.stats.totalPnL > 0 ? 'up' : 'down'}
              delay={0}
            />
            <StatCard
              title="Cüzdan Bakiyesi"
              value={`$${data.stats.totalWalletBalance.toFixed(2)}`}
              subValue={`Kullanılabilir: $${data.stats.availableBalance.toFixed(2)}`}
              icon={<WalletIcon />}
              trend="neutral"
              delay={0.1}
            />
            <StatCard
              title="Toplam Trade"
              value={data.stats.totalTrades.toString()}
              subValue={`${data.stats.profitableTrades} Kazanç / ${data.stats.lossTrades} Kayıp`}
              icon={<ActivityIcon />}
              trend="neutral"
              delay={0.2}
            />
            <StatCard
              title="Kâr Faktörü"
              value={data.stats.profitFactor.toFixed(2)}
              subValue={`Ort. Kazanç: $${data.stats.avgProfit}`}
              icon={<ChartIcon />}
              trend={data.stats.profitFactor > 1 ? 'up' : 'down'}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Performance Chart */}
            <ScrollSection className="lg:col-span-2" delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] p-6"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-xl" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
                    <h3 className="text-xl font-semibold text-white">Kümülatif Performans</h3>
                  </div>

                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.performanceData}>
                        <defs>
                          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                        <XAxis
                          dataKey="date"
                          stroke="#333"
                          tick={{ fill: '#666', fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          dy={10}
                          tickFormatter={(str) => {
                            const date = new Date(str);
                            return `${date.getDate()} ${date.toLocaleString('tr-TR', { month: 'short' })}`;
                          }}
                        />
                        <YAxis
                          stroke="#333"
                          tick={{ fill: '#666', fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          dx={-10}
                          tickFormatter={(val) => `$${val}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="balance"
                          name="Bakiye"
                          stroke="#10b981"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorBalance)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            </ScrollSection>

            {/* Monthly Returns */}
            <ScrollSection delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] p-6 h-full"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-400 to-purple-600" />
                    <h3 className="text-xl font-semibold text-white">Aylık Getiriler</h3>
                  </div>

                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.monthlyData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={true} vertical={false} />
                        <XAxis type="number" hide />
                        <YAxis
                          dataKey="month"
                          type="category"
                          stroke="#333"
                          tick={{ fill: '#888', fontSize: 13 }}
                          width={50}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                          content={({ active, payload }: any) => {
                            if (active && payload && payload.length) {
                              const value = payload[0].value;
                              return (
                                <div className="bg-[#0a0a12]/95 border border-white/10 px-3 py-2 rounded-lg backdrop-blur-md">
                                  <p className={`font-mono font-bold ${value >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {value >= 0 ? '+' : ''}${value}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                          {data.monthlyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.return >= 0 ? '#10b981' : '#f43f5e'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            </ScrollSection>
          </div>
        </div>
      </section>

      {/* Recent Trades Table */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollSection>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-xl" />
              </div>

              <div className="relative z-10">
                <div className="p-6 border-b border-white/[0.06] flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-blue-600" />
                    <h3 className="text-xl font-semibold text-white">Trade Geçmişi</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-mono text-gray-500">Canlı</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/[0.02] text-gray-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-medium">Sembol</th>
                        <th className="px-6 py-4 font-medium">Yön</th>
                        <th className="px-6 py-4 font-medium">Fiyat</th>
                        <th className="px-6 py-4 font-medium">Miktar</th>
                        <th className="px-6 py-4 font-medium text-right">PnL</th>
                        <th className="px-6 py-4 font-medium text-right">Zaman</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {data.recentTrades.map((trade, idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          className="group/row hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-white">
                            {trade.symbol}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                              trade.side === 'BUY'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                              {trade.side === 'BUY' ? 'ALIŞ' : 'SATIŞ'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300 font-mono text-sm">
                            ${trade.price.toFixed(4)}
                          </td>
                          <td className="px-6 py-4 text-gray-300 font-mono text-sm">
                            {trade.qty}
                          </td>
                          <td className={`px-6 py-4 text-right font-mono font-semibold ${
                            trade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                            {trade.pnl > 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-right text-gray-500 text-sm">
                            {new Date(trade.time).toLocaleString('tr-TR')}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </ScrollSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                <span className="text-xs font-bold">DS</span>
              </div>
              <span className="font-medium text-gray-400">Desteli Trade</span>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Veriler Binance API&apos;sinden alınmaktadır • Son güncelleme: {new Date(data.lastUpdated).toLocaleString('tr-TR')}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06]">
                {data.isDemo ? 'Önbellek' : 'Canlı'}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
