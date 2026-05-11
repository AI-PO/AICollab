// OroSwap Mock Data — replace these with real API calls when ready

export const TOKENS = [
  {
    id: 'xrb',
    symbol: 'XRB',
    name: 'Xerobit',
    color: '#F97316',
    bgColor: '#7C3D12',
    price: 1.22,
    priceChange24h: 4.2,
    decimals: 6,
    comingSoon: false,
  },
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    color: '#F7931A',
    bgColor: '#78350F',
    price: 61002,
    priceChange24h: 1.8,
    decimals: 8,
    comingSoon: false,
  },
  {
    id: 'gold',
    symbol: 'GOLD',
    name: 'GoldGram',
    color: '#EAB308',
    bgColor: '#713F12',
    price: 63.0,
    priceChange24h: 0.3,
    decimals: 6,
    comingSoon: false,
    isRWA: true,
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether USD',
    color: '#26A17B',
    bgColor: '#134E4A',
    price: 1.0,
    priceChange24h: 0.01,
    decimals: 6,
    comingSoon: false,
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    color: '#2775CA',
    bgColor: '#1E3A5F',
    price: 1.0,
    priceChange24h: -0.02,
    decimals: 6,
    comingSoon: false,
  },
  {
    id: 'oro',
    symbol: 'ORO',
    name: 'ORO Stable',
    color: '#A855F7',
    bgColor: '#4C1D95',
    price: 1.0,
    priceChange24h: 0,
    decimals: 6,
    comingSoon: true,
  },
];

export const WALLET_BALANCES = {
  xrb: { amount: 1240.5, usdValue: 1512.41 },
  btc: { amount: 0.082, usdValue: 5002.18 },
  gold: { amount: 45.0, usdValue: 2835.0 },
  usdt: { amount: 820.0, usdValue: 820.0 },
  usdc: { amount: 500.0, usdValue: 500.0 },
  oro: { amount: 0, usdValue: 0 },
};

export const MOCK_WALLET = {
  address: '0x3f8a...a912',
  addressFull: '0x3f8ab291c4e07f19d4a912',
  totalUsd: 10669.59,
};

export const POOLS = [
  {
    id: 'xrb-btc',
    tokenA: 'xrb',
    tokenB: 'btc',
    tvl: 1200000,
    apr: 8.4,
    feeApr: 8.4,
    rwaApr: 0,
    volume24h: 180000,
    isDualYield: false,
    isTop: true,
  },
  {
    id: 'xrb-usdt',
    tokenA: 'xrb',
    tokenB: 'usdt',
    tvl: 620000,
    apr: 6.1,
    feeApr: 6.1,
    rwaApr: 0,
    volume24h: 95000,
    isDualYield: false,
    isTop: false,
  },
  {
    id: 'xrb-usdc',
    tokenA: 'xrb',
    tokenB: 'usdc',
    tvl: 280000,
    apr: 5.8,
    feeApr: 5.8,
    rwaApr: 0,
    volume24h: 42000,
    isDualYield: false,
    isTop: false,
  },
  {
    id: 'gold-usdt',
    tokenA: 'gold',
    tokenB: 'usdt',
    tvl: 340000,
    apr: 11.2,
    feeApr: 6.1,
    rwaApr: 5.1,
    volume24h: 28000,
    isDualYield: true,
    isTop: false,
  },
  {
    id: 'gold-xrb',
    tokenA: 'gold',
    tokenB: 'xrb',
    tvl: 180000,
    apr: 12.8,
    feeApr: 7.7,
    rwaApr: 5.1,
    volume24h: 18000,
    isDualYield: true,
    isTop: false,
  },
];

export const MY_POSITIONS = [
  {
    id: 'pos-xrb-usdt',
    poolId: 'xrb-usdt',
    tokenA: 'xrb',
    tokenB: 'usdt',
    deposited: 1200,
    feesEarned: 48.2,
    sharePercent: 0.19,
    tokenAAmount: 491.8,
    tokenBAmount: 600.0,
  },
  {
    id: 'pos-gold-usdt',
    poolId: 'gold-usdt',
    tokenA: 'gold',
    tokenB: 'usdt',
    deposited: 800,
    feesEarned: 31.5,
    sharePercent: 0.24,
    tokenAAmount: 6.35,
    tokenBAmount: 400.0,
  },
];

export const RECENT_TRANSACTIONS = [
  {
    id: 'tx1',
    type: 'swap',
    fromToken: 'xrb',
    toToken: 'usdt',
    fromAmount: 100,
    toAmount: 122,
    settlement: 'fast',
    status: 'completed',
    timeAgo: '2 mins ago',
    txHash: '0xf3a1...b29c',
  },
  {
    id: 'tx2',
    type: 'add_liquidity',
    poolId: 'gold-usdt',
    tokenA: 'gold',
    tokenB: 'usdt',
    usdAmount: 200,
    settlement: null,
    status: 'completed',
    timeAgo: '1 hour ago',
    txHash: '0x8d2e...c410',
  },
  {
    id: 'tx3',
    type: 'swap',
    fromToken: 'btc',
    toToken: 'xrb',
    fromAmount: 0.01,
    toAmount: 8.15,
    settlement: 'standard',
    status: 'completed',
    timeAgo: '3 hours ago',
    txHash: '0xa5f7...d831',
  },
  {
    id: 'tx4',
    type: 'receive',
    token: 'xrb',
    amount: 50,
    settlement: null,
    status: 'completed',
    timeAgo: '1 day ago',
    txHash: '0x2b9c...e142',
  },
  {
    id: 'tx5',
    type: 'swap',
    fromToken: 'usdt',
    toToken: 'xrb',
    fromAmount: 200,
    toAmount: 163.1,
    settlement: 'fast',
    status: 'completed',
    timeAgo: '2 days ago',
    txHash: '0x7e4a...f963',
  },
];

export const DEX_STATS = {
  totalTvl: 2100000,
  volume24h: 340000,
  totalPairs: 5,
  totalUsers: 1847,
};

// Sparkline data for 7-day price simulation (relative values 0–100)
export const SPARKLINES = {
  xrb: [62, 58, 65, 71, 68, 74, 80],
  btc: [72, 75, 70, 68, 74, 78, 82],
  gold: [55, 57, 54, 58, 60, 59, 62],
  usdt: [50, 50, 50, 50, 50, 50, 50],
  usdc: [50, 50, 50, 49, 50, 51, 50],
  oro: [50, 50, 50, 50, 50, 50, 50],
};

export const SETTLEMENT_OPTIONS = [
  {
    id: 'fast',
    label: 'Fast',
    sublabel: 'Lightning',
    iconType: 'lightning',
    fee: 0.02,
    estimatedTime: '~5 seconds',
  },
  {
    id: 'standard',
    label: 'Standard',
    sublabel: 'Bitcoin',
    iconType: 'bitcoin',
    fee: 0.08,
    estimatedTime: '~10 minutes',
  },
];

export const FEE_TIERS = [
  { bps: 5, label: '0.05%', bestFor: 'Stable pairs' },
  { bps: 30, label: '0.30%', bestFor: 'Most pairs' },
  { bps: 100, label: '1.00%', bestFor: 'Exotic pairs' },
];

// Helper: format USD
export function formatUsd(amount, compact = false) {
  if (compact) {
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
    return `$${amount.toFixed(2)}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Helper: format token amount
export function formatAmount(amount) {
  if (amount === 0) return '0';
  if (amount < 0.001) return amount.toFixed(8);
  if (amount < 1) return amount.toFixed(4);
  if (amount < 1000) return amount.toFixed(2);
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(amount);
}

// Helper: truncate address
export function truncateAddress(addr) {
  if (!addr) return '';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

// Helper: get token by id
export function getToken(id) {
  return TOKENS.find(t => t.id === id);
}

// Helper: calculate swap output
export function calculateSwapOutput(fromTokenId, toTokenId, fromAmount) {
  const from = getToken(fromTokenId);
  const to = getToken(toTokenId);
  if (!from || !to || !fromAmount) return 0;
  const usdValue = parseFloat(fromAmount) * from.price;
  const slippage = 0.003;
  return (usdValue * (1 - slippage)) / to.price;
}

// Helper: calculate price impact
export function calculatePriceImpact(fromTokenId, toTokenId, fromAmount) {
  const from = getToken(fromTokenId);
  if (!from) return 0;
  const usdValue = parseFloat(fromAmount) * from.price;
  if (usdValue < 1000) return 0.12;
  if (usdValue < 10000) return 0.8;
  if (usdValue < 50000) return 2.4;
  return 5.1;
}

// ─── Market Data ───────────────────────────────────────────────────────────────

export const MARKET_PAIRS = [
  {
    id: 'xrb-usdt',
    base: 'XRB',
    quote: 'USDT',
    baseIcon: '🔶',
    price: 0.8241,
    change24h: 3.47,
    high24h: 0.8510,
    low24h: 0.7980,
    volume24h: 4820000,
    tvl: 12400000,
    apr: 18.4,
    trades24h: 2841,
  },
  {
    id: 'xrb-btc',
    base: 'XRB',
    quote: 'BTC',
    baseIcon: '🔶',
    price: 0.00001184,
    change24h: 2.11,
    high24h: 0.00001220,
    low24h: 0.00001150,
    volume24h: 2100000,
    tvl: 8700000,
    apr: 14.2,
    trades24h: 1523,
  },
  {
    id: 'gold-usdt',
    base: 'GOLD',
    quote: 'USDT',
    baseIcon: '🥇',
    price: 1924.5,
    change24h: -0.82,
    high24h: 1945.0,
    low24h: 1910.0,
    volume24h: 3350000,
    tvl: 9800000,
    apr: 11.6,
    trades24h: 987,
  },
  {
    id: 'gold-xrb',
    base: 'GOLD',
    quote: 'XRB',
    baseIcon: '🥇',
    price: 2335.2,
    change24h: -4.23,
    high24h: 2440.0,
    low24h: 2290.0,
    volume24h: 870000,
    tvl: 3200000,
    apr: 22.8,
    trades24h: 412,
  },
  {
    id: 'xrb-usdc',
    base: 'XRB',
    quote: 'USDC',
    baseIcon: '🔶',
    price: 0.8238,
    change24h: 3.44,
    high24h: 0.8505,
    low24h: 0.7975,
    volume24h: 1940000,
    tvl: 5600000,
    apr: 15.9,
    trades24h: 1108,
  },
];

// Seeded PRNG (mulberry32) for deterministic price histories
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function genPriceHistory(basePrice, points, volatility, seed) {
  const rand = mulberry32(seed);
  const prices = [basePrice];
  for (let i = 1; i < points; i++) {
    const prev = prices[i - 1];
    const drift = (rand() - 0.49) * volatility * prev;
    prices.push(Math.max(prev + drift, prev * 0.5));
  }
  return prices;
}

const TIMEFRAME_CONFIG = {
  '1H':  { points: 60,  volatility: 0.003 },
  '4H':  { points: 96,  volatility: 0.005 },
  '1D':  { points: 288, volatility: 0.008 },
  '1W':  { points: 168, volatility: 0.015 },
  '1M':  { points: 180, volatility: 0.022 },
};

export const PRICE_HISTORIES = Object.fromEntries(
  MARKET_PAIRS.map((pair, pi) => [
    pair.id,
    Object.fromEntries(
      Object.entries(TIMEFRAME_CONFIG).map(([tf, { points, volatility }], ti) => [
        tf,
        genPriceHistory(pair.price, points, volatility, (pi + 1) * 1000 + ti * 100),
      ])
    ),
  ])
);

const TRADE_SIDES = ['buy', 'sell'];
const TRADE_SIZES = [0.05, 0.12, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0, 25.0, 50.0];

function genTrades(pair, count, seed) {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    const side = TRADE_SIDES[rand() > 0.48 ? 0 : 1];
    const size = TRADE_SIZES[Math.floor(rand() * TRADE_SIZES.length)];
    const slippage = (rand() - 0.5) * 0.002;
    const price = pair.price * (1 + slippage);
    const ago = Math.floor(rand() * 300);
    return { id: `${pair.id}-t${i}`, side, price, size, value: price * size, secsAgo: ago };
  }).sort((a, b) => a.secsAgo - b.secsAgo);
}

export const INITIAL_TRADES = Object.fromEntries(
  MARKET_PAIRS.map((pair, pi) => [pair.id, genTrades(pair, 40, pi * 999 + 777)])
);
