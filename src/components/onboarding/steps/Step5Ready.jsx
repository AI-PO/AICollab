import { useState, useEffect } from 'react';

const ITEMS = [
  'Swap any supported asset instantly',
  'Earn yield by providing liquidity',
  'Track your portfolio in one place',
  'Monitor live market prices',
];

export default function Step5Ready() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = ITEMS.map((_, i) =>
      setTimeout(() => setVisible(v => Math.max(v, i + 1)), 150 + i * 320)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-text-secondary font-dm text-sm">Here's what you can do on OroSwap:</p>
      <div className="flex flex-col gap-2.5">
        {ITEMS.map((item, i) => (
          <div
            key={item}
            className="flex items-center gap-3"
            style={{
              opacity: i < visible ? 1 : 0,
              transform: i < visible ? 'translateX(0)' : 'translateX(-8px)',
              transition: 'opacity 280ms ease, transform 280ms ease',
            }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: i < visible ? '#22c55e' : 'rgb(var(--bg-elevated))',
                border: i < visible ? 'none' : '1px solid rgb(var(--border))',
                transition: 'background 300ms ease',
              }}
            >
              {i < visible && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-sm font-dm text-text-primary">{item}</span>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-2.5 px-3 py-3 rounded-xl border border-accent/25 bg-accent/8 mt-1"
        style={{ background: 'rgba(249,115,22,0.06)' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent flex-shrink-0 mt-0.5">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <p className="text-sm font-dm text-text-secondary leading-snug">
          Start with a small swap to get familiar — try swapping{' '}
          <span className="text-accent font-semibold">10 XRB to USDT</span>.
        </p>
      </div>
    </div>
  );
}
