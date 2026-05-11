import { useId, useRef, useState, useCallback, useMemo } from 'react';

function catmullRomToBezier(pts) {
  if (pts.length < 2) return '';
  const d = [`M ${pts[0].x} ${pts[0].y}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`);
  }
  return d.join(' ');
}

export default function PriceChart({ prices, isUp, height = 280 }) {
  const uid = useId().replace(/:/g, '');
  const gradId = `cg-${uid}`;
  const clipId = `cc-${uid}`;
  const svgRef = useRef(null);
  const [hover, setHover] = useState(null);

  const W = 800;
  const H = height;
  const padL = 0;
  const padR = 56;
  const padT = 12;
  const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const safePrices = useMemo(() => (prices && prices.length >= 2 ? prices : []), [prices]);
  const min = safePrices.length ? Math.min(...safePrices) : 0;
  const max = safePrices.length ? Math.max(...safePrices) : 1;
  const range = max - min || 1;

  const toX = useCallback((i) => padL + (i / (safePrices.length - 1)) * chartW, [safePrices.length, chartW]);
  const toY = useCallback((v) => padT + chartH - ((v - min) / range) * chartH, [min, range, chartH]);

  const pts = safePrices.map((v, i) => ({ x: toX(i), y: toY(v) }));

  const handleMouseMove = useCallback((e) => {
    const svg = svgRef.current;
    if (!svg || !safePrices.length) return;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const frac = Math.max(0, Math.min(1, (svgX - padL) / chartW));
    const idx = Math.round(frac * (safePrices.length - 1));
    setHover({ idx, x: pts[idx].x, y: pts[idx].y, price: safePrices[idx] });
  }, [safePrices, pts, chartW]);

  const handleMouseLeave = useCallback(() => setHover(null), []);

  if (!safePrices.length) return null;

  const linePath = catmullRomToBezier(pts);
  const areaPath = linePath + ` L ${toX(safePrices.length - 1)} ${H - padB} L ${toX(0)} ${H - padB} Z`;
  const color = isUp ? '#22c55e' : '#ef4444';
  const colorMuted = isUp ? '#22c55e33' : '#ef444433';

  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const frac = i / 4;
    const val = min + frac * range;
    const y = toY(val);
    return { y, val };
  }).reverse();

  const xTicks = [0, 0.25, 0.5, 0.75, 1].map((frac) => {
    const idx = Math.round(frac * (safePrices.length - 1));
    return { x: toX(idx), idx };
  });

  const fmtPrice = (v) => {
    if (v >= 100) return v.toFixed(2);
    if (v >= 1) return v.toFixed(4);
    return v.toFixed(6);
  };

  const fmtTime = (idx) => {
    const total = safePrices.length - 1;
    const frac = idx / total;
    const h = Math.round(frac * 23);
    return `${String(h).padStart(2, '0')}:00`;
  };

  return (
    <div className="relative w-full select-none" style={{ height }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'crosshair' }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <clipPath id={clipId}>
            <rect x={padL} y={padT} width={chartW} height={chartH} />
          </clipPath>
        </defs>

        {yTicks.map(({ y }, i) => (
          <line
            key={i}
            x1={padL} y1={y} x2={W - padR} y2={y}
            stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"
            className="text-border"
          />
        ))}

        <path d={areaPath} fill={`url(#${gradId})`} clipPath={`url(#${clipId})`} />

        <path d={linePath} fill="none" stroke={color} strokeWidth="1.8"
          strokeLinejoin="round" strokeLinecap="round"
          clipPath={`url(#${clipId})`} />

        {hover && (
          <>
            <line
              x1={hover.x} y1={padT} x2={hover.x} y2={H - padB}
              stroke={color} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.7"
            />
            <line
              x1={padL} y1={hover.y} x2={W - padR} y2={hover.y}
              stroke={color} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4"
            />
            <circle cx={hover.x} cy={hover.y} r="4" fill={color} stroke="white" strokeWidth="1.5" />
          </>
        )}

        {yTicks.map(({ y, val }, i) => (
          <text
            key={i}
            x={W - padR + 6} y={y + 4}
            fontSize="10" fill="currentColor"
            className="text-text-muted"
          >
            {fmtPrice(val)}
          </text>
        ))}

        {xTicks.map(({ x, idx }, i) => (
          <text
            key={i}
            x={x} y={H - 4}
            fontSize="10" fill="currentColor"
            textAnchor="middle"
            className="text-text-muted"
          >
            {fmtTime(idx)}
          </text>
        ))}

        {hover && (
          <>
            <rect
              x={W - padR + 2} y={hover.y - 9}
              width={padR - 2} height={18}
              fill={color} rx="3"
            />
            <text
              x={W - padR / 2 + 1} y={hover.y + 4}
              fontSize="9" fill="white"
              textAnchor="middle" fontWeight="600"
            >
              {fmtPrice(hover.price)}
            </text>
          </>
        )}
      </svg>

      {hover && (
        <div
          className="absolute top-2 left-3 px-2.5 py-1.5 rounded-lg text-xs font-dm pointer-events-none"
          style={{ background: colorMuted, border: `1px solid ${color}40` }}
        >
          <span className="font-semibold" style={{ color }}>{fmtPrice(hover.price)}</span>
          <span className="text-text-muted ml-1.5">{fmtTime(hover.idx)}</span>
        </div>
      )}
    </div>
  );
}
