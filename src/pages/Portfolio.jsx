import { useApp } from '../context/useApp';
import TokenIcon from '../components/ui/TokenIcon';
import Badge from '../components/ui/Badge';
import {
  TOKENS, RECENT_TRANSACTIONS, WALLET_BALANCES,
  formatUsd, formatAmount, getToken,
} from '../data/mock';

function ChangeChip({ value }) {
  const positive = value >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-dm font-medium ${positive ? 'text-success' : 'text-danger'}`}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        {positive
          ? <path d="M5 2l3 4H2l3-4z" fill="currentColor"/>
          : <path d="M5 8L2 4h6L5 8z" fill="currentColor"/>}
      </svg>
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}

function AssetRow({ token }) {
  const bal = WALLET_BALANCES[token.id];
  if (!bal || bal.amount === 0) return null;

  return (
    <div className="flex items-center gap-4 py-3 hover:bg-bg-elevated/50 rounded-xl px-3 transition-colors duration-150 cursor-default group -mx-3">
      <TokenIcon tokenId={token.id} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-dm font-semibold text-text-primary">{token.symbol}</span>
          {token.isRWA && <Badge variant="gold" size="xs">RWA</Badge>}
        </div>
        <p className="text-text-muted text-xs font-dm truncate">{token.name}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-dm font-semibold text-text-primary">{formatAmount(bal.amount)} {token.symbol}</p>
        <p className="text-text-muted text-xs font-dm">{formatUsd(bal.usdValue)}</p>
      </div>
      <div className="text-right flex-shrink-0 w-16">
        <ChangeChip value={token.priceChange24h} />
        <p className="text-text-muted text-xs font-dm mt-0.5">{formatUsd(token.price)}</p>
      </div>
    </div>
  );
}

function TxRow({ tx }) {
  const getIcon = () => {
    switch(tx.type) {
      case 'swap': return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 5h8M7 3l3 2-3 2M12 9H4M7 7l-3 2 3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
      case 'add_liquidity': return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M7 4.5v5M4.5 7h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      );
      case 'receive': return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 3v6M4 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 11h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      );
      default: return null;
    }
  };

  const getLabel = () => {
    switch(tx.type) {
      case 'swap': {
        const from = getToken(tx.fromToken);
        const to = getToken(tx.toToken);
        return `${formatAmount(tx.fromAmount)} ${from?.symbol} → ${formatAmount(tx.toAmount)} ${to?.symbol}`;
      }
      case 'add_liquidity': {
        const a = getToken(tx.tokenA);
        const b = getToken(tx.tokenB);
        return `Added ${a?.symbol}/${b?.symbol} — ${formatUsd(tx.usdAmount)}`;
      }
      case 'receive': {
        const t = getToken(tx.token);
        return `Received ${formatAmount(tx.amount)} ${t?.symbol}`;
      }
      default: return '';
    }
  };

  const typeColors = {
    swap: 'bg-accent/10 text-accent',
    add_liquidity: 'bg-success/10 text-success',
    receive: 'bg-blue-500/10 text-blue-400',
  };

  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[tx.type] || 'bg-bg-elevated text-text-secondary'}`}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-dm text-text-primary text-sm truncate">{getLabel()}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-text-muted text-xs font-dm">{tx.timeAgo}</span>
          {tx.settlement && (
            <span className={`text-xs font-dm ${tx.settlement === 'fast' ? 'text-accent' : 'text-text-muted'}`}>
              {tx.settlement === 'fast' ? '⚡ Fast' : 'Standard'}
            </span>
          )}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="flex items-center gap-1.5 justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          <span className="text-text-muted text-xs font-dm">Complete</span>
        </div>
        <button
          onClick={() => navigator.clipboard?.writeText(tx.txHash).catch(() => {})}
          className="text-text-muted text-xs font-dm hover:text-accent transition-colors cursor-pointer mt-0.5 font-mono"
          title="Copy transaction hash"
        >
          {tx.txHash}
        </button>
      </div>
    </div>
  );
}

function SettlementSplit() {
  const fastCount = RECENT_TRANSACTIONS.filter(t => t.settlement === 'fast').length;
  const standardCount = RECENT_TRANSACTIONS.filter(t => t.settlement === 'standard').length;
  const total = fastCount + standardCount;
  const fastPct = total > 0 ? Math.round((fastCount / total) * 100) : 0;

  return (
    <div className="bg-bg-surface rounded-2xl border border-border p-5">
      <h3 className="font-syne font-semibold text-text-primary mb-4">Settlement history</h3>
      <div className="flex gap-3 mb-4">
        <div className="flex-1 bg-bg-elevated rounded-xl p-3 text-center">
          <p className="font-syne font-bold text-accent text-2xl">{fastCount}</p>
          <p className="text-text-muted text-xs font-dm mt-0.5">Fast</p>
        </div>
        <div className="flex-1 bg-bg-elevated rounded-xl p-3 text-center">
          <p className="font-syne font-bold text-text-primary text-2xl">{standardCount}</p>
          <p className="text-text-muted text-xs font-dm mt-0.5">Standard</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-dm">
          <span className="text-accent">⚡ Fast</span>
          <span className="text-text-muted">{fastPct}%</span>
        </div>
        <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-700"
            style={{ width: `${fastPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { isConnected, connectWallet } = useApp();

  const totalBalance = Object.values(WALLET_BALANCES).reduce((s, b) => s + b.usdValue, 0);
  const activeTokens = TOKENS.filter(t => WALLET_BALANCES[t.id]?.amount > 0 && !t.comingSoon);

  if (!isConnected) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-20 animate-fade-in">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-bg-elevated border border-border flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="4" y="10" width="28" height="20" rx="3" stroke="#4B5563" strokeWidth="1.5"/>
              <path d="M4 17h28M12 10V8a6 6 0 0112 0v2" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="18" cy="22" r="2" fill="#4B5563"/>
            </svg>
          </div>
          <h2 className="font-syne font-bold text-2xl text-text-primary mb-2">Your portfolio</h2>
          <p className="text-text-muted font-dm text-sm mb-6">Connect your wallet to see your balances, positions, and transaction history.</p>
          <button
            onClick={connectWallet}
            className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-dm font-semibold rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Balance hero */}
      <div className="bg-bg-surface rounded-3xl border border-border p-8 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-accent blur-3xl" />
        </div>
        <p className="text-text-muted font-dm text-sm mb-2 relative">Total balance</p>
        <div className="flex items-end gap-3 mb-4 relative">
          <h1 className="font-syne font-bold text-5xl text-text-primary tracking-tight">{formatUsd(totalBalance)}</h1>
          <ChangeChip value={2.4} />
        </div>
        <div className="flex gap-4 relative">
          <div>
            <p className="text-text-muted text-xs font-dm">Wallet</p>
            <p className="font-dm font-semibold text-text-primary">{formatUsd(totalBalance)}</p>
          </div>
          <div className="w-px bg-border" />
          <div>
            <p className="text-text-muted text-xs font-dm">In Pools</p>
            <p className="font-dm font-semibold text-success">{formatUsd(2079.7)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Assets */}
          <div className="bg-bg-surface rounded-2xl border border-border p-5">
            <h3 className="font-syne font-semibold text-text-primary mb-1">Assets</h3>
            <p className="text-text-muted text-xs font-dm mb-4">{activeTokens.length} tokens</p>
            <div className="divide-y divide-border -mx-3">
              {activeTokens.map(token => (
                <AssetRow key={token.id} token={token} />
              ))}
            </div>
          </div>

          {/* Recent transactions */}
          <div className="bg-bg-surface rounded-2xl border border-border p-5">
            <h3 className="font-syne font-semibold text-text-primary mb-4">Recent activity</h3>
            <div>
              {RECENT_TRANSACTIONS.map(tx => (
                <TxRow key={tx.id} tx={tx} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <SettlementSplit />

          {/* Quick stats */}
          <div className="bg-bg-surface rounded-2xl border border-border p-5 space-y-4">
            <h3 className="font-syne font-semibold text-text-primary">LP summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-dm">
                <span className="text-text-muted">Total deposited</span>
                <span className="text-text-primary font-medium">{formatUsd(2000)}</span>
              </div>
              <div className="flex justify-between text-sm font-dm">
                <span className="text-text-muted">Total fees earned</span>
                <span className="text-success font-medium">{formatUsd(79.7)}</span>
              </div>
              <div className="flex justify-between text-sm font-dm">
                <span className="text-text-muted">Active positions</span>
                <span className="text-text-primary font-medium">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
