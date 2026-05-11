import { useState, useEffect } from 'react';
import { useApp } from '../context/useApp';
import { useOnboarding } from '../context/useOnboarding';
import Modal from '../components/ui/Modal';
import TokenIcon from '../components/ui/TokenIcon';
import Badge from '../components/ui/Badge';
import {
  TOKENS, SETTLEMENT_OPTIONS, getToken, formatUsd, formatAmount,
  calculateSwapOutput, calculatePriceImpact,
} from '../data/mock';

function LightningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8 1L3 8h5l-2 5 6-7H7l1-5z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round"/>
    </svg>
  );
}

function BitcoinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9.5 5.5c.5-.3.5-1.5-1-1.5H5v3h3.5c1 0 1.5-.5 1-.5M9.5 8.5c.5-.3.5-1.5-1-1.5H5V10h3.5c1 0 1.5-.5 1-.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 4V3m0 8v-1M7.5 4V3m0 8v-1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function SwapArrowButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-bg-elevated border-2 border-bg-base hover:border-accent/40 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent transition-all duration-200 cursor-pointer hover:rotate-180 hover:scale-110 z-10"
      style={{ transition: 'transform 0.3s ease, color 0.2s, border-color 0.2s' }}
      aria-label="Swap tokens"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M5 10l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function TokenSelectorModal({ isOpen, onClose, onSelect, excludeId }) {
  const [search, setSearch] = useState('');
  const { getBalance, isConnected } = useApp();
  const filtered = TOKENS.filter(t =>
    t.id !== excludeId &&
    (t.symbol.toLowerCase().includes(search.toLowerCase()) ||
     t.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Modal isOpen={isOpen} onClose={() => { setSearch(''); onClose(); }} title="Select token" size="sm">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-text-primary text-sm font-dm placeholder-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          autoFocus
        />
      </div>
      <div className="space-y-1 max-h-72 overflow-y-auto -mx-1 px-1">
        {filtered.map(token => {
          const bal = getBalance(token.id);
          return (
            <button
              key={token.id}
              onClick={() => { if (!token.comingSoon) { onSelect(token.id); setSearch(''); } }}
              disabled={token.comingSoon}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 ${
                token.comingSoon
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-bg-elevated cursor-pointer active:scale-98'
              }`}
            >
              <TokenIcon tokenId={token.id} size="md" />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-dm font-semibold text-text-primary">{token.symbol}</span>
                  {token.comingSoon && <Badge variant="purple" size="xs">Soon</Badge>}
                  {token.isRWA && <Badge variant="gold" size="xs">RWA</Badge>}
                </div>
                <p className="text-text-muted text-xs font-dm">{token.name}</p>
              </div>
              <div className="text-right">
                {isConnected && bal.amount > 0 ? (
                  <>
                    <p className="text-text-primary text-sm font-dm font-medium">{formatAmount(bal.amount)}</p>
                    <p className="text-text-muted text-xs font-dm">{formatUsd(bal.usdValue)}</p>
                  </>
                ) : (
                  <p className="text-text-muted text-sm font-dm">—</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

function TokenInput({ label, tokenId, amount, onTokenSelect, onAmountChange, readOnly = false }) {
  const { getBalance, isConnected } = useApp();
  const [selectorOpen, setSelectorOpen] = useState(false);
  const token = getToken(tokenId);
  const balance = getBalance(tokenId);
  const usdValue = token && amount ? parseFloat(amount) * token.price : 0;

  const handleMax = () => {
    if (isConnected && balance.amount > 0 && onAmountChange) {
      onAmountChange(String(balance.amount));
    }
  };

  return (
    <div className="bg-bg-elevated rounded-2xl p-4 border border-border hover:border-border/80 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-text-muted text-xs font-dm font-medium uppercase tracking-wider">{label}</span>
        {isConnected && tokenId && !readOnly && (
          <button
            onClick={handleMax}
            className="text-xs text-accent hover:text-accent/80 font-dm font-medium cursor-pointer transition-colors"
          >
            Max: {formatAmount(balance.amount)} {token?.symbol}
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSelectorOpen(true)}
          className="flex items-center gap-2 bg-bg-surface hover:bg-bg-base border border-border hover:border-accent/30 rounded-xl px-3 py-2.5 transition-all duration-200 cursor-pointer flex-shrink-0 group"
        >
          {tokenId ? (
            <>
              <TokenIcon tokenId={tokenId} size="sm" />
              <span className="font-syne font-semibold text-text-primary text-sm">{token?.symbol}</span>
            </>
          ) : (
            <span className="font-dm text-text-secondary text-sm">Select</span>
          )}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-text-muted group-hover:text-accent transition-colors">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex-1 text-right">
          {readOnly ? (
            <div className="font-syne font-bold text-2xl text-text-primary tracking-tight">
              {amount ? formatAmount(parseFloat(amount)) : '0'}
            </div>
          ) : (
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={e => onAmountChange(e.target.value)}
              className="w-full bg-transparent text-right font-syne font-bold text-2xl text-text-primary placeholder-text-muted focus:outline-none tracking-tight"
            />
          )}
          {usdValue > 0 && (
            <p className="text-text-muted text-xs font-dm mt-0.5">{formatUsd(usdValue)}</p>
          )}
        </div>
      </div>

      <TokenSelectorModal
        isOpen={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={(id) => { onTokenSelect(id); setSelectorOpen(false); }}
        excludeId={null}
      />
    </div>
  );
}

function SettlementToggle({ selected, onChange }) {
  return (
    <div className="flex gap-2">
      {SETTLEMENT_OPTIONS.map(opt => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-dm font-medium transition-all duration-200 cursor-pointer ${
            selected === opt.id
              ? 'bg-accent/10 border-accent/40 text-accent'
              : 'bg-bg-elevated border-border text-text-secondary hover:text-text-primary hover:border-border/60'
          }`}
        >
          <span className={selected === opt.id ? 'text-accent' : 'text-text-muted'}>
            {opt.iconType === 'lightning' ? <LightningIcon /> : <BitcoinIcon />}
          </span>
          <span>{opt.label}</span>
          <span className={`text-xs ${selected === opt.id ? 'text-accent/70' : 'text-text-muted'}`}>
            {opt.estimatedTime}
          </span>
        </button>
      ))}
    </div>
  );
}

function PriceImpactBadge({ impact }) {
  const color = impact < 1 ? 'text-success' : impact < 3 ? 'text-yellow-400' : 'text-danger';
  return <span className={`font-dm font-medium ${color}`}>{impact.toFixed(2)}%</span>;
}

function ConfirmModal({ isOpen, onClose, onConfirm, fromToken, toToken, fromAmount, toAmount, settlement, fee }) {
  const from = getToken(fromToken);
  const to = getToken(toToken);
  if (!from || !to) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Swap" size="sm">
      <div className="space-y-4">
        <div className="bg-bg-elevated rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TokenIcon tokenId={fromToken} size="sm" />
              <span className="font-dm text-text-secondary text-sm">You pay</span>
            </div>
            <div className="text-right">
              <span className="font-syne font-bold text-text-primary">{formatAmount(parseFloat(fromAmount))} {from.symbol}</span>
              <p className="text-text-muted text-xs">{formatUsd(parseFloat(fromAmount) * from.price)}</p>
            </div>
          </div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TokenIcon tokenId={toToken} size="sm" />
              <span className="font-dm text-text-secondary text-sm">You receive</span>
            </div>
            <div className="text-right">
              <span className="font-syne font-bold text-accent">{formatAmount(parseFloat(toAmount))} {to.symbol}</span>
              <p className="text-text-muted text-xs">{formatUsd(parseFloat(toAmount) * to.price)}</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-sm font-dm">
          <div className="flex justify-between">
            <span className="text-text-muted">Settlement</span>
            <span className="text-text-secondary capitalize">{settlement === 'fast' ? '⚡ Fast' : 'Standard'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Network fee</span>
            <span className="text-text-secondary">{formatUsd(fee)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Rate</span>
            <span className="text-text-secondary">1 {from.symbol} = {formatAmount(to.price / from.price === 0 ? 0 : from.price / to.price)} {to.symbol}</span>
          </div>
        </div>
        <button
          onClick={onConfirm}
          className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-dm font-semibold rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          Confirm Swap
        </button>
      </div>
    </Modal>
  );
}

function SuccessModal({ isOpen, onClose, fromToken, toToken, fromAmount, toAmount, txHash }) {
  const from = getToken(fromToken);
  const to = getToken(toToken);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center space-y-4 py-2">
        <div className="w-16 h-16 mx-auto rounded-full bg-success/10 border border-success/20 flex items-center justify-center animate-success-pop">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14l6 6 10-10" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="font-syne font-bold text-xl text-text-primary">Swap complete</h3>
          <p className="text-text-secondary text-sm font-dm mt-1">
            {formatAmount(parseFloat(fromAmount))} {from?.symbol} → {formatAmount(parseFloat(toAmount))} {to?.symbol}
          </p>
        </div>
        <div className="bg-bg-elevated rounded-xl p-3 flex items-center justify-between gap-2">
          <span className="text-text-muted text-xs font-dm">Transaction</span>
          <div className="flex items-center gap-2">
            <span className="text-text-secondary text-xs font-dm font-mono">{txHash}</span>
            <button
              onClick={() => navigator.clipboard?.writeText(txHash).catch(() => {})}
              className="text-text-muted hover:text-accent transition-colors cursor-pointer"
              aria-label="Copy transaction hash"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="3" width="7" height="8" rx="1.2" stroke="currentColor" strokeWidth="1"/>
                <path d="M3.5 3V2a1 1 0 011-1h5a1 1 0 011 1v7a1 1 0 01-1 1H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 bg-bg-elevated hover:bg-bg-surface border border-border hover:border-accent/30 text-text-primary font-dm font-medium rounded-xl transition-all duration-200 cursor-pointer"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}

export default function Swap() {
  const { isConnected, connectWallet } = useApp();
  const { isActive, currentStep } = useOnboarding();
  const isDemoMode = isActive && currentStep === 2;

  const [fromToken, setFromToken] = useState('xrb');
  const [toToken, setToToken] = useState('usdt');
  const [fromAmount, setFromAmount] = useState('');
  const [settlement, setSettlement] = useState('fast');

  // Ghost demo animation when step 3 is active
  const [demoFrom, setDemoFrom] = useState('');
  const [demoTo, setDemoTo] = useState('');

  useEffect(() => {
    if (!isDemoMode) return;
    const seq = [
      [400,  () => setDemoFrom('1')],
      [750,  () => setDemoFrom('10')],
      [1100, () => setDemoFrom('100')],
      [1700, () => setDemoTo('82.41')],
    ];
    const timers = seq.map(([d, fn]) => setTimeout(fn, d));
    return () => {
      timers.forEach(clearTimeout);
      setDemoFrom('');
      setDemoTo('');
    };
  }, [isDemoMode]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [lastTxHash, setLastTxHash] = useState('');

  const toAmount = fromAmount ? calculateSwapOutput(fromToken, toToken, fromAmount) : 0;
  const priceImpact = fromAmount ? calculatePriceImpact(fromToken, toToken, fromAmount) : 0;
  const settlementOpt = SETTLEMENT_OPTIONS.find(s => s.id === settlement);
  const canSwap = isConnected && fromToken && toToken && parseFloat(fromAmount) > 0;
  const highImpact = priceImpact > 3;

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount ? String(toAmount) : '');
  };

  const handleConfirmSwap = async () => {
    setShowConfirm(false);
    setIsSwapping(true);
    await new Promise(r => setTimeout(r, 1800));
    setIsSwapping(false);
    const hash = `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`;
    setLastTxHash(hash);
    setShowSuccess(true);
  };

  const handleSwapClick = () => {
    if (highImpact) {
      setShowConfirm(true);
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <div className="flex-1 flex items-start justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-syne font-bold text-3xl text-text-primary mb-2">Trade anything</h1>
          <p className="text-text-secondary font-dm text-sm">Fast, secure, Bitcoin-native swaps</p>
        </div>

        <div className="bg-bg-surface rounded-3xl border border-border shadow-2xl p-4 space-y-2" data-onboarding="swap-card">
          {/* From */}
          <TokenInput
            label="You pay"
            tokenId={fromToken}
            amount={isDemoMode ? demoFrom : fromAmount}
            onTokenSelect={isDemoMode ? () => {} : setFromToken}
            onAmountChange={isDemoMode ? () => {} : setFromAmount}
            readOnly={isDemoMode}
          />

          {/* Swap arrow */}
          <div className="relative h-0 flex justify-center">
            <SwapArrowButton onClick={handleSwapTokens} />
          </div>

          {/* To */}
          <TokenInput
            label="You receive"
            tokenId={toToken}
            amount={isDemoMode ? demoTo : (toAmount ? toAmount.toString() : '')}
            onTokenSelect={isDemoMode ? () => {} : setToToken}
            onAmountChange={null}
            readOnly
          />

          {/* Details row */}
          {((fromAmount && parseFloat(fromAmount) > 0) || isDemoMode) && (
            <div className="px-1 py-2 space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-dm">
                <span className="text-text-muted">Price impact</span>
                <PriceImpactBadge impact={priceImpact} />
              </div>
              <div className="flex items-center justify-between text-xs font-dm">
                <span className="text-text-muted">Network fee</span>
                <span className="text-text-secondary">{formatUsd(settlementOpt?.fee ?? 0.02)}</span>
              </div>
              {getToken(fromToken) && getToken(toToken) && (
                <div className="flex items-center justify-between text-xs font-dm">
                  <span className="text-text-muted">Rate</span>
                  <span className="text-text-secondary">
                    1 {getToken(fromToken)?.symbol} = {formatAmount(getToken(fromToken)?.price / getToken(toToken)?.price)} {getToken(toToken)?.symbol}
                  </span>
                </div>
              )}
              {highImpact && (
                <div className="flex items-center gap-2 bg-danger/5 border border-danger/20 rounded-xl px-3 py-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-danger flex-shrink-0">
                    <path d="M7 2L1 12h12L7 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    <path d="M7 6v3M7 10.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-danger text-xs font-dm">High price impact — proceed with caution</span>
                </div>
              )}
            </div>
          )}

          {/* Settlement */}
          <div className="pt-1">
            <p className="text-text-muted text-xs font-dm font-medium uppercase tracking-wider mb-2 px-1">Settlement speed</p>
            <SettlementToggle selected={settlement} onChange={setSettlement} />
          </div>

          {/* CTA */}
          <div className="pt-1">
            {!isConnected ? (
              <button
                onClick={connectWallet}
                className="w-full py-4 bg-accent hover:bg-accent/90 text-white font-syne font-bold text-base rounded-2xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                Connect Wallet to Swap
              </button>
            ) : isSwapping ? (
              <button disabled className="w-full py-4 bg-accent/40 text-white/60 font-syne font-bold text-base rounded-2xl cursor-not-allowed flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Processing swap...
              </button>
            ) : (
              <button
                onClick={handleSwapClick}
                disabled={!canSwap}
                className={`w-full py-4 font-syne font-bold text-base rounded-2xl transition-all duration-200 ${
                  canSwap
                    ? 'bg-accent hover:bg-accent/90 text-white cursor-pointer active:scale-[0.98] shadow-lg shadow-accent/20'
                    : 'bg-bg-elevated text-text-muted cursor-not-allowed border border-border'
                }`}
              >
                {!fromAmount || parseFloat(fromAmount) === 0 ? 'Enter an amount' : 'Swap'}
              </button>
            )}
          </div>
        </div>

        {/* ORO coming soon */}
        <div className="mt-4 bg-bg-surface border border-border rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TokenIcon tokenId="oro" size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-dm font-semibold text-text-primary text-sm">ORO Stable</span>
                <Badge variant="purple" size="xs">Coming soon</Badge>
              </div>
              <p className="text-text-muted text-xs font-dm">Bitcoin-backed stablecoin</p>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-lg border border-purple-500/30 text-purple-400 text-xs font-dm font-medium hover:bg-purple-500/10 transition-colors cursor-pointer">
            Join waitlist
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSwap}
        fromToken={fromToken}
        toToken={toToken}
        fromAmount={fromAmount}
        toAmount={toAmount.toString()}
        settlement={settlement}
        fee={settlementOpt?.fee ?? 0.02}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => { setShowSuccess(false); setFromAmount(''); }}
        fromToken={fromToken}
        toToken={toToken}
        fromAmount={fromAmount}
        toAmount={toAmount.toString()}
        txHash={lastTxHash}
      />
    </div>
  );
}
