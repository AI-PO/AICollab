const POOLS = [
  { pair: 'GoldGram/USDT', apr: '12.8%', tag: 'Dual yield', highlight: true },
  { pair: 'XRB/BTC', apr: '8.4%', tag: null, highlight: false },
];

export default function Step4Pools() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-text-secondary font-dm text-sm leading-relaxed">
        Add your tokens to a liquidity pool and earn a share of every trade that passes through it. GoldGram pools earn from two sources — trading fees plus the gold's own yield.
      </p>
      <div className="flex flex-col gap-2">
        {POOLS.map(pool => (
          <div
            key={pool.pair}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${
              pool.highlight
                ? 'border-accent/30 bg-accent/5'
                : 'border-border bg-bg-base'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-dm font-semibold text-text-primary">{pool.pair}</span>
              {pool.tag && (
                <span className="text-xs font-dm px-1.5 py-0.5 rounded-md bg-accent/10 text-accent">
                  {pool.tag}
                </span>
              )}
            </div>
            <span className="text-accent font-syne font-bold text-sm">{pool.apr} APR</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-text-muted font-dm">
        You can withdraw anytime. Your share of the pool is always yours.
      </p>
    </div>
  );
}
