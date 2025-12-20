'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// --- Icons (SVGs) ---

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const WalletIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 7h-9" />
    <path d="M14 17H5" />
    <circle cx="17" cy="17" r="3" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// --- Components ---

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="w-16 h-16 border-4 border-t-emerald-500 border-r-purple-500 border-b-pink-500 border-l-blue-500 rounded-full"
    />
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-6 text-xl font-light tracking-widest text-gray-400"
    >
      ANALYZING MARKET DATA
    </motion.p>
  </div>
);

const StatCard = ({
  title,
  value,
  subValue,
  icon: Icon,
  trend,
  delay = 0,
}: {
  title: string;
  value: string;
  subValue?: string;
  icon: any;
  trend?: 'up' | 'down' | 'neutral';
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative overflow-hidden p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-24 h-24 text-white" />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
            <Icon className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
        </div>

        <div className="space-y-1">
          <div className="text-3xl font-bold text-white tracking-tight">
            {value}
          </div>
          {subValue && (
            <div className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-400' :
                trend === 'down' ? 'text-rose-400' : 'text-gray-500'
              }`}>
              {subValue}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function TradePage() {
  const [data, setData] = useState<TradeData | null>(null);
  const [loading, setLoading] = useState(true);

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
        <div className="bg-black/80 border border-white/20 p-4 rounded-xl backdrop-blur-md shadow-2xl">
          <p className="text-gray-400 text-sm mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-sm font-mono font-bold" style={{ color: entry.color }}>
                {entry.name}: ${entry.value.toFixed(2)}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 selection:text-emerald-400 pb-20 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 py-3 px-6 bg-rose-500/10 border border-rose-500/20 rounded-full w-fit mx-auto backdrop-blur-md">
            <AlertTriangleIcon className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-semibold text-rose-300 tracking-wide uppercase">
              AI Generated Trades — Not Investment Advice
            </span>
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent"
          >
            Performance Analytics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl font-light"
          >
            Real-time algorithmic trading statistics sourced directly from Binance Futures
          </motion.p>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Net PnL"
            value={`$${data.stats.totalPnL.toFixed(2)}`}
            subValue={`${data.stats.winRate}% Win Rate`}
            icon={TrendingUpIcon}
            trend={data.stats.totalPnL > 0 ? 'up' : 'down'}
            delay={0.1}
          />
          <StatCard
            title="Wallet Balance"
            value={`$${data.stats.totalWalletBalance.toFixed(2)}`}
            subValue={`Available: $${data.stats.availableBalance.toFixed(2)}`}
            icon={WalletIcon}
            trend="neutral"
            delay={0.2}
          />
          <StatCard
            title="Total Trades"
            value={data.stats.totalTrades.toString()}
            subValue={`${data.stats.profitableTrades} Wins / ${data.stats.lossTrades} Losses`}
            icon={ActivityIcon}
            trend="neutral"
            delay={0.3}
          />
          <StatCard
            title="Profit Factor"
            value={data.stats.profitFactor.toFixed(2)}
            subValue={`Avg Win: $${data.stats.avgProfit}`}
            icon={TrendingUpIcon}
            trend={data.stats.profitFactor > 1 ? 'up' : 'down'}
            delay={0.4}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 p-6 rounded-3xl bg-white/[0.02] border border-white/5"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded-full" />
              Cumulative Performance
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.performanceData}>
                  <defs>
                    <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#666"
                    tick={{ fill: '#666', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                    tickFormatter={(str) => {
                      const date = new Date(str);
                      return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
                    }}
                  />
                  <YAxis
                    stroke="#666"
                    tick={{ fill: '#666', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    dx={-10}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    name="Balance"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPnL)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Monthly Returns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-3xl bg-white/[0.02] border border-white/5"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full" />
              Monthly Returns
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.monthlyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="month"
                    type="category"
                    stroke="#888"
                    tick={{ fill: '#888', fontSize: 14 }}
                    width={50}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    content={({ active, payload }: any) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-black/80 border border-white/20 p-2 rounded-lg backdrop-blur-md">
                            <p className="text-emerald-400 font-bold">+${payload[0].value}</p>
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
          </motion.div>
        </div>

        {/* Recent Trades Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Recall History</h3>
            <span className="text-xs font-mono text-gray-500">Live Data</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Symbol</th>
                  <th className="px-6 py-4 font-medium">Side</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Qty</th>
                  <th className="px-6 py-4 font-medium text-right">PnL</th>
                  <th className="px-6 py-4 font-medium text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.recentTrades.map((trade, idx) => (
                  <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      {trade.symbol}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trade.side === 'BUY'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-rose-500/10 text-rose-400'
                        }`}>
                        {trade.side}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-mono">
                      ${trade.price.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-mono">
                      {trade.qty}
                    </td>
                    <td className={`px-6 py-4 text-right font-mono font-bold ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                      {trade.pnl > 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-500 text-sm">
                      {new Date(trade.time).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer info */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>
            Data analytics powered by <span className="text-gray-400">Gemini AI</span> • Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
