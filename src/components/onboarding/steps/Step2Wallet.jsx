import { useApp } from '../../../context/useApp';

export default function Step2Wallet() {
  const { isConnected, isConnecting, connectWallet } = useApp();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-text-secondary font-dm text-sm leading-relaxed">
        No sign-up, no password. Your wallet holds your assets and proves it's you. We never hold your funds — you're always in control.
      </p>
      {isConnected ? (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-success/10 border border-success/30">
          <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
          <span className="text-success text-sm font-dm font-medium">Wallet connected — you're good to go!</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-text-muted font-dm">
            New to wallets? Don't worry — click below to try a demo.
          </p>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-dm font-medium transition-all cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting…
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="4" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  <circle cx="10" cy="8.5" r="1" fill="currentColor"/>
                </svg>
                Connect demo wallet
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
