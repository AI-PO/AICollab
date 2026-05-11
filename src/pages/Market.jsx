import { useId } from 'react';
import TokenIcon from '../components/ui/TokenIcon';
import Badge from '../components/ui/Badge';
import { TOKENS, SPARKLINES, DEX_STATS, POOLS, formatUsd, getToken } from '../data/mock';

function Sparkline({ data, positive, width = 80, height = 32 }) {
  const id = useId();
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * w;
    const y = pad + (1 - (v - min) / range) * h;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M ${points[0]} L ${points.join(' L ')} L ${pad + w},${pad + h} L ${pad},${pad + h} Z`;

  const color = positive ? '#10B981' : '#EF4444';
  const gradId = `grad-${id.replace(/:/g, '')}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradId})`}/>
      <path d={pathD} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChangeChip({ value, showIcon = true }) {
  const positive = value >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-sm font-dm font-medium ${positive ? 'text-success' : 'text-danger'}`}>
      {showIcon && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          {positive
            ? <path d="M6 2.5l4 5H2l4-5z" fill="currentColor"/>
            : <path d="M6 9.5L2 4.5h8L6 9.5z" fill="currentColor"/>}
        </svg>
      )}
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}

function PriceCard({ token }) {
  const sparkData = SPARKLINES[token.id] || [50, 50, 50, 50, 50, 50, 50];
  const positive = token.priceChange24h >= 0;

  return (
    <div className="bg-bg-surface rounded-2xl border border-border hover:border-accent/20 transition-all duration-200 p-5 group cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <TokenIcon tokenId={token.id} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-syne font-bold text-text-primary">{token.symbol}</span>
              {token.comingSoon && <Badge variant="purple" size="xs">Soon</Badge>}
              {token.isRWA && <Badge variant="gold" size="xs">RWA</Badge>}
            </div>
            <p className="text-text-muted text-xs font-dm">{token.name}</p>
          </div>
        </div>
        <Sparkline data={sparkData} positive={positive} />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-syne font-bold text-2xl text-text-primary tracking-tight">
            {token.id === 'btc'
              ? `$${token.price.toLocaleString()}`
              : formatUsd(token.price)}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <ChangeChip value={token.priceChange24h} />
            <span className="text-text-muted text-xs font-dm">24h</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-text-muted text-xs font-dm">7d</p>
          <span className={`text-xs font-dm font-medium ${positive ? 'text-success' : 'text-danger'}`}>
            {positive ? '+' : ''}{(token.priceChange24h * 2.8).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sublabel, accent = false }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? 'bg-accent/5 border-accent/20' : 'bg-bg-surface border-border'}`}>
      <p className="text-text-muted text-xs font-dm uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-syne font-bold text-3xl tracking-tight ${accent ? 'text-accent' : 'text-text-primary'}`}>{value}</p>
      {sublabel && <p className="text-text-muted text-xs font-dm mt-1">{sublabel}</p>}
    </div>
  );
}

function MostActivePairs() {
  const sorted = [...POOLS].sort((a, b) => b.volume24h - a.volume24h);

  return (
    <div className="bg-bg-surface rounded-2xl border border-border p-5">
      <h3 className="font-syne font-semibold text-text-primary mb-4">Most active pairs</h3>
      <div className="space-y-1">
        {sorted.map((pool, i) => {
          const tokenA = getToken(pool.tokenA);
          const tokenB = getToken(pool.tokenB);
          const maxVol = sorted[0].volume24h;
          const barPct = (pool.volume24h / maxVol) * 100;

          return (
            <div key={pool.id} className="flex items-center gap-4 py-2.5 hover:bg-bg-elevated/50 rounded-xl px-2 transition-colors -mx-2">
              <span className="text-text-muted text-xs font-dm w-4 flex-shrink-0">{i + 1}</span>
              <div className="flex items-center gap-2 w-28 flex-shrink-0">
                <div className="flex -space-x-1.5">
                  {[tokenA, tokenB].map(t => (
                    <div key={t?.id} className="w-5 h-5 rounded-full flex items-center justify-center font-syne font-bold text-xs ring-1 ring-bg-surface" style={{ backgroundColor: t?.bgColor, color: t?.color }}>
                      {t?.symbol.charAt(0)}
                    </div>
                  ))}
                </div>
                <span className="font-dm font-semibold text-text-primary text-xs">
                  {tokenA?.symbol}/{tokenB?.symbol}
                </span>
              </div>
              <div className="flex-1">
                <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-dm font-semibold text-text-primary text-sm">{formatUsd(pool.volume24h, true)}</p>
                <p className="text-success text-xs font-dm">{pool.apr}% APR</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Market() {
  const allTokens = TOKENS;

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Market Overview</h1>
        <p className="text-text-secondary font-dm text-sm">Live prices and DEX stats</p>
      </div>

      {/* DEX Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total TVL"
          value={formatUsd(DEX_STATS.totalTvl, true)}
          sublabel="Locked liquidity"
          accent
        />
        <StatCard
          label="24h Volume"
          value={formatUsd(DEX_STATS.volume24h, true)}
          sublabel="Trading volume"
        />
        <StatCard
          label="Active Pairs"
          value={String(DEX_STATS.totalPairs)}
          sublabel="Liquidity pools"
        />
        <StatCard
          label="Users"
          value={DEX_STATS.totalUsers.toLocaleString()}
          sublabel="All time"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="font-syne font-semibold text-text-primary text-lg mb-4">Token prices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allTokens.map(token => (
              <PriceCard key={token.id} token={token} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <MostActivePairs />

          {/* BTC dominance card */}
          <div className="bg-bg-surface rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-btc/20 flex items-center justify-center">
                <span className="text-btc font-syne font-bold text-xs">₿</span>
              </div>
              <h3 className="font-syne font-semibold text-text-primary">Bitcoin pair dominance</h3>
            </div>
            <div className="space-y-2">
              {(() => {
                const btcPools = POOLS.filter(p => p.tokenA === 'btc' || p.tokenB === 'btc');
                const xrbBtc = POOLS.find(p => p.id === 'xrb-btc');
                const display = btcPools.length > 0 ? btcPools : (xrbBtc ? [xrbBtc] : []);
                if (display.length === 0) {
                  return <p className="text-text-muted text-sm font-dm">No BTC pairs yet</p>;
                }
                return display.map(pool => {
                  const isBtcA = pool.tokenA === 'btc';
                  const other = isBtcA ? getToken(pool.tokenB) : getToken(pool.tokenA);
                  const label = isBtcA ? `BTC/${other?.symbol}` : `BTC/${other?.symbol}`;
                  return (
                    <div key={pool.id} className="flex items-center justify-between text-sm font-dm">
                      <span className="text-text-secondary">{label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-text-muted">{formatUsd(pool.tvl, true)} TVL</span>
                        <Badge variant="success" size="xs">{pool.apr}%</Badge>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
