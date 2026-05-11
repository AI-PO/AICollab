const CALLOUTS = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M8 1L3 8h5l-2 5 6-7H7l1-5z" fill="currentColor" strokeWidth="0.3" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Fast settlement',
    desc: 'Your swap arrives in seconds via Lightning',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1a6 6 0 100 12A6 6 0 007 1z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Fees shown upfront',
    desc: 'No surprises — you see the exact cost before confirming',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'MEV protected',
    desc: "Your trade can't be front-run or manipulated",
  },
];

export default function Step3Swap() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-text-secondary font-dm text-sm leading-relaxed">
        Choose what you have, choose what you want, and hit Swap. We find you the best rate automatically.
      </p>
      <div className="flex flex-col gap-2">
        {CALLOUTS.map(item => (
          <div key={item.label} className="flex items-start gap-3 px-3 py-2.5 rounded-xl bg-bg-base border border-border">
            <span className="text-accent flex-shrink-0 mt-0.5">{item.icon}</span>
            <div>
              <p className="text-text-primary text-xs font-dm font-semibold">{item.label}</p>
              <p className="text-text-muted text-xs font-dm mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
