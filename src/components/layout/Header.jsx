import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/useApp';
import { useOnboarding } from '../../context/useOnboarding';
import { formatUsd } from '../../data/mock';

const NAV_ITEMS = [
  { id: 'swap', label: 'Swap' },
  { id: 'pools', label: 'Pools' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'market', label: 'Market' },
];

function OroSwapLogo({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer" data-onboarding="header-logo">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F97316, #EAB308)' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2L14.196 5V11L9 14L3.804 11V5L9 2Z" fill="white" fillOpacity="0.9"/>
          <path d="M9 5.5L12 7.25V10.75L9 12.5L6 10.75V7.25L9 5.5Z" fill="#F97316"/>
        </svg>
      </div>
      <span className="font-syne font-bold text-xl tracking-tight">
        <span className="text-accent">Oro</span>
        <span className="text-text-primary">Swap</span>
      </span>
    </button>
  );
}

function WalletButton() {
  const { isConnected, isConnecting, wallet, connectWallet, disconnectWallet } = useApp();
  const { start } = useOnboarding();
  const [showMenu, setShowMenu] = useState(false);

  if (isConnecting) {
    return (
      <div data-onboarding="wallet-button">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-elevated border border-border text-text-secondary text-sm font-dm cursor-not-allowed" disabled>
          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          Connecting...
        </button>
      </div>
    );
  }

  if (isConnected && wallet) {
    return (
      <div className="flex items-center gap-2" data-onboarding="wallet-button">
      <div className="relative">
        <button
          onClick={() => setShowMenu(v => !v)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-elevated border border-border hover:border-accent/40 transition-all duration-200 cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
          <span className="font-dm text-sm text-text-primary">{wallet.address}</span>
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-bg-base border border-border">
            <span className="text-accent text-xs font-medium">XRB</span>
            <span className="text-text-secondary text-xs">1,240</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`text-text-muted transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`}>
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {showMenu && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-bg-elevated border border-border rounded-xl shadow-2xl z-50 animate-scale-in overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-xs text-text-muted font-dm">Total Balance</p>
              <p className="font-syne font-bold text-text-primary">{formatUsd(wallet.totalUsd)}</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(wallet.addressFull).catch(() => {});
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-surface transition-colors duration-150 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="4" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4 4V3a1 1 0 011-1h6a1 1 0 011 1v7a1 1 0 01-1 1h-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Copy address
            </button>
            <button
              onClick={() => { start(); setShowMenu(false); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-surface transition-colors duration-150 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 4.5v.5M7 7v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Take the tour
            </button>
            <button
              onClick={() => { disconnectWallet(); setShowMenu(false); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors duration-150 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 7h7M9 5l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 3H3a1 1 0 00-1 1v6a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Disconnect
            </button>
          </div>
        )}
      </div>
      </div>
    );
  }

  return (
    <div data-onboarding="wallet-button">
      <button
        onClick={connectWallet}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-dm font-medium transition-all duration-200 cursor-pointer active:scale-95"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="4" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M1 7h12M9 7v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          <circle cx="10" cy="8.5" r="1" fill="currentColor"/>
        </svg>
        Connect Wallet
      </button>
    </div>
  );
}

function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150 cursor-pointer"
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.36 13.36l1.42 1.42M3.22 14.78l1.41-1.41M13.36 4.64l1.42-1.42" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M15.5 10.5A7 7 0 017.5 2.5a7 7 0 000 13 7 7 0 008-5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

function TourButton() {
  const { restartOnboarding } = useOnboarding();
  return (
    <button
      onClick={restartOnboarding}
      aria-label="Restart tour"
      title="Restart tour"
      className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150 cursor-pointer"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M6.5 6.5a1.5 1.5 0 1 1 1.5 1.5V9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="8" cy="11.5" r="0.75" fill="currentColor"/>
      </svg>
    </button>
  );
}

export default function Header({ activePage, onNavigate, isDark, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-bg-base/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <OroSwapLogo onClick={() => navigate('/')} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                data-onboarding={item.id === 'pools' ? 'nav-pools' : undefined}
                className={`px-4 py-2 rounded-lg text-sm font-dm font-medium transition-all duration-200 cursor-pointer ${
                  activePage === item.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <TourButton />
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <WalletButton />
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150 cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-3 border-t border-border pt-3 animate-fade-in">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                data-onboarding={item.id === 'pools' ? 'nav-pools' : undefined}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-dm font-medium transition-all duration-200 cursor-pointer mb-1 ${
                  activePage === item.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
