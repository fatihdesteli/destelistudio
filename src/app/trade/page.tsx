"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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
  PieChart,
  Pie,
} from "recharts";

// Types
interface TradeStats {
  totalPnL: number;
  winRate: number;
  totalTrades: number;
  profitableTrades: number;
  avgProfit: number;
  maxDrawdown: number;
  sharpeRatio: number;
  monthlyReturn: number;
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
  side: "LONG" | "SHORT";
  pnl: number;
  roi: number;
  time: string;
}

// Demo data - Replace with real Binance API data
const demoStats: TradeStats = {
  totalPnL: 47832.45,
  winRate: 68.5,
  totalTrades: 847,
  profitableTrades: 580,
  avgProfit: 127.35,
  maxDrawdown: 12.3,
  sharpeRatio: 2.14,
  monthlyReturn: 18.7,
};

const demoPerformance: PerformanceData[] = [
  { date: "Jan", pnl: 2400, balance: 12400 },
  { date: "Feb", pnl: 1398, balance: 13798 },
  { date: "Mar", pnl: 4800, balance: 18598 },
  { date: "Apr", pnl: 3908, balance: 22506 },
  { date: "May", pnl: 4800, balance: 27306 },
  { date: "Jun", pnl: 3800, balance: 31106 },
  { date: "Jul", pnl: 6300, balance: 37406 },
  { date: "Aug", pnl: 5100, balance: 42506 },
  { date: "Sep", pnl: 4200, balance: 46706 },
  { date: "Oct", pnl: 5800, balance: 52506 },
  { date: "Nov", pnl: 4100, balance: 56606 },
  { date: "Dec", pnl: 5900, balance: 62506 },
];

const demoMonthlyReturns: MonthlyData[] = [
  { month: "Jan", return: 12.4 },
  { month: "Feb", return: 8.2 },
  { month: "Mar", return: 22.1 },
  { month: "Apr", return: 15.6 },
  { month: "May", return: 18.3 },
  { month: "Jun", return: -5.2 },
  { month: "Jul", return: 28.4 },
  { month: "Aug", return: 14.7 },
  { month: "Sep", return: 11.2 },
  { month: "Oct", return: 19.8 },
  { month: "Nov", return: 8.9 },
  { month: "Dec", return: 21.3 },
];

const demoRecentTrades: RecentTrade[] = [
  { symbol: "BTCUSDT", side: "LONG", pnl: 1247.32, roi: 15.4, time: "2 saat önce" },
  { symbol: "ETHUSDT", side: "SHORT", pnl: 523.18, roi: 8.7, time: "5 saat önce" },
  { symbol: "SOLUSDT", side: "LONG", pnl: -187.45, roi: -3.2, time: "8 saat önce" },
  { symbol: "BNBUSDT", side: "LONG", pnl: 892.67, roi: 12.1, time: "12 saat önce" },
  { symbol: "XRPUSDT", side: "SHORT", pnl: 445.23, roi: 6.8, time: "1 gün önce" },
  { symbol: "AVAXUSDT", side: "LONG", pnl: 1823.91, roi: 24.5, time: "1 gün önce" },
];

// Animated Counter Component
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}

// Stat Card Component
function StatCard({ title, value, prefix = "", suffix = "", decimals = 0, icon, trend, delay = 0 }: {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: React.ReactNode;
  trend?: "up" | "down";
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
      <div className="relative bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-400">
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
              {trend === "up" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
            </div>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        </p>
      </div>
    </motion.div>
  );
}

// Custom Tooltip for Charts
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-amber-500/30 rounded-lg p-3 shadow-2xl">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-amber-400 font-bold text-lg">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}

export default function TradePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "100px 100px"
          }}
        />

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Hero Section */}
      <motion.section
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-amber-200 text-sm font-medium">Canlı Trade Performansı</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Futures Trading
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              İstatistikleri
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Binance Futures üzerindeki gerçek trade performansım.
            <br className="hidden md:block" />
            Şeffaf, doğrulanabilir ve takip edilebilir.
          </motion.p>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-emerald-400">
                +<AnimatedCounter value={demoStats.totalPnL} decimals={0} />
              </p>
              <p className="text-gray-500 mt-2">Toplam Kazanç (USDT)</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-amber-400">
                <AnimatedCounter value={demoStats.winRate} decimals={1} suffix="%" />
              </p>
              <p className="text-gray-500 mt-2">Win Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white">
                <AnimatedCounter value={demoStats.totalTrades} />
              </p>
              <p className="text-gray-500 mt-2">Toplam Trade</p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1.5 h-3 bg-amber-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Detaylı İstatistikler</h2>
            <p className="text-gray-400">Tüm veriler gerçek zamanlı olarak Binance API&apos;sinden alınmaktadır</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Toplam PnL"
              value={demoStats.totalPnL}
              prefix="$"
              decimals={2}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend="up"
              delay={0}
            />
            <StatCard
              title="Win Rate"
              value={demoStats.winRate}
              suffix="%"
              decimals={1}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend="up"
              delay={0.1}
            />
            <StatCard
              title="Karlı Trade"
              value={demoStats.profitableTrades}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
              delay={0.2}
            />
            <StatCard
              title="Aylık Getiri"
              value={demoStats.monthlyReturn}
              suffix="%"
              decimals={1}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              trend="up"
              delay={0.3}
            />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <StatCard
              title="Ortalama Kar/Trade"
              value={demoStats.avgProfit}
              prefix="$"
              decimals={2}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              delay={0.4}
            />
            <StatCard
              title="Max Drawdown"
              value={demoStats.maxDrawdown}
              suffix="%"
              decimals={1}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              }
              trend="down"
              delay={0.5}
            />
            <StatCard
              title="Sharpe Oranı"
              value={demoStats.sharpeRatio}
              decimals={2}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              }
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Performance Chart */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Performans Grafiği</h2>
            <p className="text-gray-400">Hesap bakiyesinin zaman içindeki değişimi</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demoPerformance}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis stroke="#666" tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorBalance)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Monthly Returns */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Aylık Getiriler</h2>
            <p className="text-gray-400">Her ayın yüzdelik performansı</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={demoMonthlyReturns}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#999' }}
                      formatter={(value) => [`${value}%`, 'Getiri']}
                    />
                    <Bar dataKey="return" radius={[4, 4, 0, 0]}>
                      {demoMonthlyReturns.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.return >= 0 ? '#10b981' : '#ef4444'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Trades */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Son Trade&apos;ler</h2>
            <p className="text-gray-400">Gerçek zamanlı trade geçmişi</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-amber-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 p-6 border-b border-white/5 bg-white/[0.02]">
                <p className="text-gray-400 text-sm font-medium">Sembol</p>
                <p className="text-gray-400 text-sm font-medium">Pozisyon</p>
                <p className="text-gray-400 text-sm font-medium text-right">PnL</p>
                <p className="text-gray-400 text-sm font-medium text-right">ROI</p>
                <p className="text-gray-400 text-sm font-medium text-right">Zaman</p>
              </div>

              {/* Table Body */}
              {demoRecentTrades.map((trade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-5 gap-4 p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-amber-400">{trade.symbol.slice(0, 3)}</span>
                    </div>
                    <span className="font-medium">{trade.symbol}</span>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      trade.side === "LONG"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {trade.side}
                    </span>
                  </div>
                  <p className={`text-right font-medium ${trade.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toLocaleString()}
                  </p>
                  <p className={`text-right font-medium ${trade.roi >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {trade.roi >= 0 ? "+" : ""}{trade.roi}%
                  </p>
                  <p className="text-right text-gray-400">{trade.time}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Win/Loss Distribution */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 text-center">Kazanç/Kayıp Dağılımı</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Kazançlı', value: demoStats.profitableTrades },
                          { name: 'Kayıplı', value: demoStats.totalTrades - demoStats.profitableTrades },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#ef4444" />
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a1a',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-8 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-gray-400 text-sm">Kazançlı ({demoStats.profitableTrades})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-gray-400 text-sm">Kayıplı ({demoStats.totalTrades - demoStats.profitableTrades})</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Risk Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 text-center">Risk Metrikleri</h3>

                <div className="space-y-6">
                  {/* Sharpe Ratio */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Sharpe Oranı</span>
                      <span className="font-medium text-amber-400">{demoStats.sharpeRatio}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(demoStats.sharpeRatio / 3) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Win Rate */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Win Rate</span>
                      <span className="font-medium text-emerald-400">{demoStats.winRate}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${demoStats.winRate}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Max Drawdown */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Max Drawdown</span>
                      <span className="font-medium text-red-400">{demoStats.maxDrawdown}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${demoStats.maxDrawdown * 2}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Profit Factor */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Profit Factor</span>
                      <span className="font-medium text-purple-400">2.47</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "82%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Copy Trading CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-amber-500/30 rounded-[40px] blur-3xl" />

            <div className="relative bg-gradient-to-b from-[#0c0c0c] to-[#111] border border-amber-500/20 rounded-[40px] p-12 md:p-16 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring" as const, stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/30"
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Beni Takip Et,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Birlikte Kazanalım
                  </span>
                </h2>

                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                  Binance Copy Trading özelliği ile trade&apos;lerimi otomatik olarak kopyalayabilirsin.
                  Hiçbir şey yapmanıza gerek yok - ben trade açtığımda, senin hesabın da aynı işlemi yapar.
                </p>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  {["Otomatik Kopyalama", "Risk Kontrolü", "7/24 Aktif", "Şeffaf İstatistik"].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
                    >
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.a
                  href="https://www.binance.com/en/copy-trading" // Replace with your actual copy trading link
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300"
                >
                  <span>Copy Trading&apos;e Başla</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>

                <p className="text-gray-500 text-sm mt-6">
                  * Geçmiş performans gelecekteki sonuçları garanti etmez
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="font-bold text-black">DS</span>
              </div>
              <span className="font-bold text-lg">DESTELISTUDIO</span>
            </div>

            <p className="text-gray-500 text-sm text-center">
              Tüm veriler gerçek Binance hesabımdan alınmaktadır. Yatırım tavsiyesi değildir.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://www.binance.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L7.5 4.5l4.5 4.5 4.5-4.5L12 0zM3 7.5L0 12l3 4.5L6 12 3 7.5zM21 7.5L18 12l3 4.5 3-4.5-3-4.5zM12 9l-3 3 3 3 3-3-3-3zM7.5 13.5L3 18l4.5 4.5 4.5-4.5-4.5-4.5zM16.5 13.5L12 18l4.5 4.5L21 18l-4.5-4.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
