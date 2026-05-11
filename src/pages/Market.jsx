import { useState, useEffect, useRef } from 'react';
import { MARKET_PAIRS, PRICE_HISTORIES, INITIAL_TRADES, formatUsd } from '../data/mock';
import PriceChart from '../components/market/PriceChart';

const TIMEFRAMES = ['1H', '4H', '1D', '1W', '1M'];

function fmtPrice(v) {
  if (v >= 1000) return v.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (v >= 1) return v.toFixed(4);
  if (v >= 0.001) return v.toFixed(6);
  return v.toFixed(8);
}

function fmtVol(v) {
  if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(1)}K`;
  return `$${v}`;
}

function fmtTime(secs) {
  if (secs < 60) return `${secs}s ago`;
  return `${Math.floor(secs / 60)}m ago`;
}

function MiniSparkline({ prices, isUp }) {
  if (!prices || prices.length < 2) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const W = 72, H = 28;
  const pts = prices.map((v, i) => ({
    x: (i / (prices.length - 1)) * W,
    y: H - ((v - min) / range) * H,
  }));
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <path d={d} fill="none" stroke={isUp ? '#22c55e' : '#ef4444'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChangeChip({ value }) {
  const isUp = value >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${isUp ? 'text-success' : 'text-danger'}`}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        {isUp
          ? <path d="M5 2L8 7H2L5 2Z" fill="currentColor" />
          : <path d="M5 8L8 3H2L5 8Z" fill="currentColor" />}
      </svg>
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}

// ─── Market Table ──────────────────────────────────────────────────────────────

function MarketTable({ onSelectPair }) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('volume24h');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = MARKET_PAIRS
    .filter(p =>
      p.base.toLowerCase().includes(query.toLowerCase()) ||
      p.quote.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey];
      if (sortKey === 'pair') { av = a.base; bv = b.base; }
      return sortAsc ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(v => !v);
    else { setSortKey(key); setSortAsc(false); }
  };

  const SortIcon = ({ col }) => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`ml-0.5 inline-block transition-opacity ${sortKey === col ? 'opacity-100' : 'opacity-30'}`}>
      {sortKey === col && !sortAsc
        ? <path d="M5 7L2 3h6L5 7Z" fill="currentColor" />
        : sortKey === col && sortAsc
          ? <path d="M5 3L2 7h6L5 3Z" fill="currentColor" />
          : <><path d="M5 2L3 5h4L5 2Z" fill="currentColor" opacity="0.5"/><path d="M5 8L3 5h4L5 8Z" fill="currentColor" opacity="0.5"/></>}
    </svg>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search pairs…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-bg-elevated border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 text-xs text-text-muted font-dm">
          <span className="text-text-secondary font-medium">{filtered.length}</span> pairs
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-bg-surface">
        <table className="w-full min-w-[640px] text-sm font-dm">
          <thead>
            <tr className="border-b border-border">
              {[
                { key: 'pair', label: 'Pair', cls: 'text-left pl-4' },
                { key: 'price', label: 'Price', cls: 'text-right' },
                { key: 'change24h', label: '24h %', cls: 'text-right' },
                { key: 'volume24h', label: 'Volume 24h', cls: 'text-right hidden sm:table-cell' },
                { key: 'tvl', label: 'TVL', cls: 'text-right hidden md:table-cell' },
                { key: 'apr', label: 'APR', cls: 'text-right hidden lg:table-cell' },
                { key: '_chart', label: '7D Chart', cls: 'text-right pr-4 hidden md:table-cell' },
              ].map(col => (
                col.key === '_chart'
                  ? <th key={col.key} className={`py-3 text-xs text-text-muted font-medium ${col.cls}`}>{col.label}</th>
                  : <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className={`py-3 text-xs text-text-muted font-medium cursor-pointer hover:text-text-primary select-none ${col.cls}`}
                    >
                      {col.label}<SortIcon col={col.key} />
                    </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(pair => {
              const isUp = pair.change24h >= 0;
              const sparkData = PRICE_HISTORIES[pair.id]?.['1D'];
              return (
                <tr
                  key={pair.id}
                  onClick={() => onSelectPair(pair.id)}
                  className="border-b border-border/60 last:border-0 hover:bg-bg-elevated transition-colors cursor-pointer group"
                >
                  <td className="pl-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center text-base flex-shrink-0">
                        {pair.baseIcon}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                          {pair.base}
                          <span className="text-text-muted font-normal">/{pair.quote}</span>
                        </p>
                        <p className="text-xs text-text-muted">{pair.trades24h.toLocaleString()} trades</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-right font-medium text-text-primary tabular-nums">
                    {fmtPrice(pair.price)}
                  </td>
                  <td className="py-3.5 text-right">
                    <ChangeChip value={pair.change24h} />
                  </td>
                  <td className="py-3.5 text-right text-text-secondary tabular-nums hidden sm:table-cell">
                    {fmtVol(pair.volume24h)}
                  </td>
                  <td className="py-3.5 text-right text-text-secondary tabular-nums hidden md:table-cell">
                    {fmtVol(pair.tvl)}
                  </td>
                  <td className="py-3.5 text-right hidden lg:table-cell">
                    <span className="text-accent font-medium">{pair.apr.toFixed(1)}%</span>
                  </td>
                  <td className="py-3.5 pr-4 hidden md:table-cell">
                    <div className="flex justify-end">
                      <MiniSparkline prices={sparkData} isUp={isUp} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-text-muted text-sm">No pairs match your search.</div>
        )}
      </div>
    </div>
  );
}

// ─── Live Trades Feed ──────────────────────────────────────────────────────────

function TradesFeed({ pairId }) {
  const [trades, setTrades] = useState(() => INITIAL_TRADES[pairId] ?? []);
  const idRef = useRef(1000);
  const pair = MARKET_PAIRS.find(p => p.id === pairId);

  useEffect(() => {
    if (!pair) return;
    const interval = setInterval(() => {
      const side = Math.random() > 0.48 ? 'buy' : 'sell';
      const slippage = (Math.random() - 0.5) * 0.004;
      const price = pair.price * (1 + slippage);
      const sizes = [0.05, 0.12, 0.25, 0.5, 1, 2.5, 5, 10];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const newTrade = {
        id: `live-${idRef.current++}`,
        side,
        price,
        size,
        value: price * size,
        secsAgo: 0,
        isNew: true,
      };
      setTrades(prev => [newTrade, ...prev.slice(0, 49)].map((t, i) => ({
        ...t,
        secsAgo: t.secsAgo + (i === 0 ? 0 : 2),
        isNew: i === 0 ? t.isNew : false,
      })));
    }, 2200);
    return () => clearInterval(interval);
  }, [pair]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-text-primary font-dm">Live Trades</h3>
        <span className="flex items-center gap-1.5 text-xs text-success font-dm">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Live
        </span>
      </div>
      <div className="grid grid-cols-3 text-xs text-text-muted font-dm mb-1.5 px-1">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Time</span>
      </div>
      <div className="flex flex-col gap-0.5 overflow-y-auto flex-1" style={{ maxHeight: 320 }}>
        {trades.map((t) => (
          <div
            key={t.id}
            className={`grid grid-cols-3 text-xs font-dm px-1 py-0.5 rounded transition-colors ${
              t.isNew ? (t.side === 'buy' ? 'bg-success/10' : 'bg-danger/10') : ''
            }`}
          >
            <span className={t.side === 'buy' ? 'text-success tabular-nums' : 'text-danger tabular-nums'}>
              {fmtPrice(t.price)}
            </span>
            <span className="text-right text-text-secondary tabular-nums">{t.size.toFixed(2)}</span>
            <span className="text-right text-text-muted tabular-nums">{fmtTime(t.secsAgo)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pair Detail ───────────────────────────────────────────────────────────────

function PairDetail({ pairId, onBack }) {
  const [timeframe, setTimeframe] = useState('1D');
  const pair = MARKET_PAIRS.find(p => p.id === pairId);
  if (!pair) return null;

  const prices = PRICE_HISTORIES[pairId]?.[timeframe] ?? [];
  const isUp = pair.change24h >= 0;
  const firstPrice = prices[0] ?? pair.price;
  const lastPrice = prices[prices.length - 1] ?? pair.price;
  const tfChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  const tfUp = tfChange >= 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors font-dm mt-0.5 cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Markets
        </button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center text-xl flex-shrink-0">
            {pair.baseIcon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-syne font-bold text-xl text-text-primary">
                {pair.base}<span className="text-text-muted font-normal text-base">/{pair.quote}</span>
              </h2>
              <ChangeChip value={pair.change24h} />
            </div>
            <p className="text-text-muted text-xs font-dm">{pair.trades24h.toLocaleString()} trades today</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-syne font-bold text-2xl ${isUp ? 'text-success' : 'text-danger'}`}>
            {fmtPrice(pair.price)}
          </p>
          <p className="text-xs text-text-muted font-dm">{pair.quote} per {pair.base}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: '24h High', value: fmtPrice(pair.high24h), color: 'text-success' },
          { label: '24h Low', value: fmtPrice(pair.low24h), color: 'text-danger' },
          { label: '24h Volume', value: fmtVol(pair.volume24h), color: 'text-text-primary' },
          { label: 'TVL', value: fmtVol(pair.tvl), color: 'text-text-primary' },
        ].map(s => (
          <div key={s.label} className="bg-bg-elevated rounded-xl px-4 py-3">
            <p className="text-xs text-text-muted font-dm mb-0.5">{s.label}</p>
            <p className={`font-syne font-semibold text-sm ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4">
        <div className="bg-bg-surface rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <span className={`font-syne font-bold text-lg ${tfUp ? 'text-success' : 'text-danger'}`}>
                {fmtPrice(lastPrice)}
              </span>
              <span className={`ml-2 text-sm ${tfUp ? 'text-success' : 'text-danger'}`}>
                {tfUp ? '+' : ''}{tfChange.toFixed(2)}%
              </span>
              <span className="text-xs text-text-muted font-dm ml-2">{timeframe}</span>
            </div>
            <div className="flex items-center gap-1 bg-bg-elevated rounded-lg p-0.5">
              {TIMEFRAMES.map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-md text-xs font-dm font-medium transition-all cursor-pointer ${
                    timeframe === tf
                      ? 'bg-bg-surface text-accent shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <PriceChart prices={prices} isUp={tfUp} height={260} />
        </div>

        <div className="bg-bg-surface rounded-2xl border border-border p-4">
          <TradesFeed key={pairId} pairId={pairId} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-bg-surface rounded-2xl border border-border p-5">
          <h3 className="text-sm font-semibold text-text-primary font-dm mb-4">Market Info</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Pool APR', value: <span className="text-accent font-semibold">{pair.apr.toFixed(1)}%</span> },
              { label: 'Fee Tier', value: '0.30%' },
              { label: 'Settlement', value: 'Bitcoin L1' },
              { label: 'Protocol', value: 'OroSwap v1' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-xs text-text-muted font-dm">{row.label}</span>
                <span className="text-xs font-dm text-text-primary">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-bg-surface rounded-2xl border border-border p-5">
          <h3 className="text-sm font-semibold text-text-primary font-dm mb-4">Pool Liquidity</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted font-dm">{pair.base} locked</span>
              <span className="text-xs font-dm text-text-primary tabular-nums">
                {((pair.tvl / 2) / pair.price).toLocaleString('en-US', { maximumFractionDigits: 0 })} {pair.base}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted font-dm">{pair.quote} locked</span>
              <span className="text-xs font-dm text-text-primary tabular-nums">
                {formatUsd(pair.tvl / 2)}
              </span>
            </div>
            <div className="flex gap-0 mt-2 h-2 rounded-full overflow-hidden">
              <div className="bg-accent" style={{ width: '50%' }} />
              <div className="bg-text-muted/40" style={{ width: '50%' }} />
            </div>
            <div className="flex justify-between text-xs text-text-muted font-dm">
              <span>50% {pair.base}</span>
              <span>50% {pair.quote}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="font-syne font-bold text-text-primary">Trade {pair.base}/{pair.quote}</p>
          <p className="text-sm text-text-secondary font-dm mt-0.5">
            Pool APR <span className="text-accent font-semibold">{pair.apr.toFixed(1)}%</span> · Best price execution via OroSwap
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-dm font-medium transition-all cursor-pointer active:scale-95">
            Swap Now
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-bg-elevated border border-border hover:border-accent/40 text-text-primary text-sm font-dm font-medium transition-all cursor-pointer active:scale-95">
            Add Liquidity
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Market Stats Bar ──────────────────────────────────────────────────────────

function MarketStats() {
  const totalVol = MARKET_PAIRS.reduce((s, p) => s + p.volume24h, 0);
  const totalTvl = MARKET_PAIRS.reduce((s, p) => s + p.tvl, 0);
  const avgApr = MARKET_PAIRS.reduce((s, p) => s + p.apr, 0) / MARKET_PAIRS.length;
  const totalTrades = MARKET_PAIRS.reduce((s, p) => s + p.trades24h, 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: '24h Volume', value: fmtVol(totalVol), sub: 'All pairs' },
        { label: 'Total TVL', value: fmtVol(totalTvl), sub: 'Locked liquidity' },
        { label: 'Avg APR', value: `${avgApr.toFixed(1)}%`, sub: 'Across pools', accent: true },
        { label: '24h Trades', value: totalTrades.toLocaleString(), sub: 'On-chain swaps' },
      ].map(s => (
        <div key={s.label} className="bg-bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-xs text-text-muted font-dm mb-0.5">{s.label}</p>
          <p className={`font-syne font-bold text-lg ${s.accent ? 'text-accent' : 'text-text-primary'}`}>{s.value}</p>
          <p className="text-xs text-text-muted font-dm">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Page Root ─────────────────────────────────────────────────────────────────

export default function Market() {
  const [selectedPairId, setSelectedPairId] = useState(null);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      {selectedPairId ? (
        <PairDetail pairId={selectedPairId} onBack={() => setSelectedPairId(null)} />
      ) : (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-syne font-bold text-2xl text-text-primary">Markets</h1>
            <p className="text-text-secondary text-sm font-dm mt-1">Bitcoin-native trading pairs on OroSwap</p>
          </div>
          <MarketStats />
          <MarketTable onSelectPair={setSelectedPairId} />
        </div>
      )}
    </div>
  );
}
