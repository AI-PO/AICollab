export default function Badge({ variant = 'default', size = 'sm', children }) {
  const variants = {
    default: 'bg-bg-elevated text-text-secondary border-border',
    accent: 'bg-accent/10 text-accent border-accent/20',
    success: 'bg-success/10 text-success border-success/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    gold: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    btc: 'bg-btc/10 text-btc border-btc/20',
  };

  const sizes = {
    xs: 'text-xs px-1.5 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span className={`inline-flex items-center gap-1 font-dm font-medium border rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
