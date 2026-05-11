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
export function formatAmount(amount, decimals = 6) {
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
