import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const API_KEY = '8ORebBK3y7NRQiPCY8n2BV5TJkxcewaHkYNkeIDXAesU5GVHSEDyFTBDCbBSxWCM';
const SECRET_KEY = 'ITNwD8Cg7ehvi6dbxixcExoRl6hd7uNS7H843Oo2wTAJFm0RP5OOYkTa29Hf1N3p';
const BASE_URL = 'https://fapi.binance.com';

// Start date: 01.10.2025
const START_DATE = new Date('2025-10-01T00:00:00Z').getTime();

function createSignature(queryString: string): string {
  return crypto
    .createHmac('sha256', SECRET_KEY)
    .update(queryString)
    .digest('hex');
}

async function binanceRequest(endpoint: string, params: Record<string, string | number> = {}) {
  const timestamp = Date.now();
  const queryParams = new URLSearchParams({
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
    timestamp: timestamp.toString(),
    recvWindow: '60000',
  });

  const signature = createSignature(queryParams.toString());
  queryParams.append('signature', signature);

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  const response = await fetch(url, {
    headers: {
      'X-MBX-APIKEY': API_KEY,
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Binance API Error: ${error}`);
  }

  return response.json();
}

interface Trade {
  symbol: string;
  side: string;
  realizedPnl: string;
  qty: string;
  price: string;
  time: number;
  positionSide: string;
}

interface IncomeRecord {
  symbol: string;
  incomeType: string;
  income: string;
  time: number;
}

export async function GET() {
  try {
    // Fetch account info
    const accountInfo = await binanceRequest('/fapi/v2/account');

    // Fetch income history (PnL records) from start date
    const incomeHistory: IncomeRecord[] = await binanceRequest('/fapi/v1/income', {
      startTime: START_DATE,
      limit: 1000,
    });

    // Fetch trade history
    const allTrades: Trade[] = [];
    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'DOGEUSDT', 'AVAXUSDT', 'ADAUSDT'];

    for (const symbol of symbols) {
      try {
        const trades = await binanceRequest('/fapi/v1/userTrades', {
          symbol,
          startTime: START_DATE,
          limit: 500,
        });
        allTrades.push(...trades);
      } catch {
        // Symbol might not have trades, continue
      }
    }

    // Calculate statistics
    const realizedPnLTrades = incomeHistory.filter(
      (income) => income.incomeType === 'REALIZED_PNL'
    );

    const totalPnL = realizedPnLTrades.reduce(
      (sum, income) => sum + parseFloat(income.income),
      0
    );

    const profitableTrades = realizedPnLTrades.filter(
      (income) => parseFloat(income.income) > 0
    );

    const lossTrades = realizedPnLTrades.filter(
      (income) => parseFloat(income.income) < 0
    );

    const winRate = realizedPnLTrades.length > 0
      ? (profitableTrades.length / realizedPnLTrades.length) * 100
      : 0;

    const avgProfit = profitableTrades.length > 0
      ? profitableTrades.reduce((sum, t) => sum + parseFloat(t.income), 0) / profitableTrades.length
      : 0;

    const avgLoss = lossTrades.length > 0
      ? Math.abs(lossTrades.reduce((sum, t) => sum + parseFloat(t.income), 0) / lossTrades.length)
      : 0;

    const profitFactor = avgLoss > 0 ? avgProfit / avgLoss : avgProfit;

    // Calculate monthly returns
    const monthlyReturns: Record<string, number> = {};
    realizedPnLTrades.forEach((income) => {
      const date = new Date(income.time);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyReturns[monthKey] = (monthlyReturns[monthKey] || 0) + parseFloat(income.income);
    });

    // Get recent trades with details
    const recentTrades = allTrades
      .sort((a, b) => b.time - a.time)
      .slice(0, 10)
      .map((trade) => ({
        symbol: trade.symbol,
        side: trade.side,
        positionSide: trade.positionSide,
        pnl: parseFloat(trade.realizedPnl),
        qty: parseFloat(trade.qty),
        price: parseFloat(trade.price),
        time: trade.time,
      }));

    // Calculate daily PnL for chart
    const dailyPnL: Record<string, number> = {};
    realizedPnLTrades.forEach((income) => {
      const date = new Date(income.time).toISOString().split('T')[0];
      dailyPnL[date] = (dailyPnL[date] || 0) + parseFloat(income.income);
    });

    // Convert to cumulative balance chart data
    let cumulative = 0;
    const performanceData = Object.entries(dailyPnL)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, pnl]) => {
        cumulative += pnl;
        return {
          date,
          pnl,
          balance: cumulative,
        };
      });

    // Calculate max drawdown
    let peak = 0;
    let maxDrawdown = 0;
    performanceData.forEach((d) => {
      if (d.balance > peak) peak = d.balance;
      const drawdown = peak > 0 ? ((peak - d.balance) / peak) * 100 : 0;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    });

    // Format monthly returns for chart
    const monthlyData = Object.entries(monthlyReturns)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, returnValue]) => ({
        month: new Date(month + '-01').toLocaleDateString('tr-TR', { month: 'short' }),
        return: returnValue,
      }));

    // Account balance
    const totalWalletBalance = parseFloat(accountInfo.totalWalletBalance || '0');
    const availableBalance = parseFloat(accountInfo.availableBalance || '0');
    const totalUnrealizedProfit = parseFloat(accountInfo.totalUnrealizedProfit || '0');

    return NextResponse.json({
      success: true,
      stats: {
        totalPnL: Math.round(totalPnL * 100) / 100,
        winRate: Math.round(winRate * 10) / 10,
        totalTrades: realizedPnLTrades.length,
        profitableTrades: profitableTrades.length,
        lossTrades: lossTrades.length,
        avgProfit: Math.round(avgProfit * 100) / 100,
        avgLoss: Math.round(avgLoss * 100) / 100,
        profitFactor: Math.round(profitFactor * 100) / 100,
        maxDrawdown: Math.round(maxDrawdown * 10) / 10,
        totalWalletBalance: Math.round(totalWalletBalance * 100) / 100,
        availableBalance: Math.round(availableBalance * 100) / 100,
        unrealizedPnL: Math.round(totalUnrealizedProfit * 100) / 100,
      },
      performanceData,
      monthlyData,
      recentTrades,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Binance API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        // Return demo data on error
        stats: {
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
        },
        performanceData: [],
        monthlyData: [],
        recentTrades: [],
      },
      { status: 200 }
    );
  }
}
