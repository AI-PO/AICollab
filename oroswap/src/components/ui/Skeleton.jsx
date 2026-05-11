export function SkeletonLine({ width = 'w-full', height = 'h-4', className = '' }) {
  return <div className={`skeleton ${width} ${height} ${className}`} />;
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-bg-surface border border-border rounded-2xl p-5 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="skeleton w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonLine width="w-1/3" height="h-4" />
          <SkeletonLine width="w-1/5" height="h-3" />
        </div>
      </div>
      <SkeletonLine height="h-8" className="mb-2" />
      <SkeletonLine width="w-2/3" height="h-3" />
    </div>
  );
}

export default function Skeleton({ rows = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton h-16 rounded-xl" style={{ opacity: 1 - i * 0.2 }} />
      ))}
    </div>
  );
}
