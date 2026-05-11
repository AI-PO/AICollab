import { useState } from 'react';
import { useApp } from '../context/useApp';
import Modal from '../components/ui/Modal';
import { TokenPair } from '../components/ui/TokenIcon';
import Badge from '../components/ui/Badge';
import { POOLS, MY_POSITIONS, getToken, formatUsd } from '../data/mock';

function StatPill({ label, value }) {
  return (
    <div className="text-center">
      <p className="text-text-muted text-xs font-dm uppercase tracking-wider mb-0.5">{label}</p>
      <p className="font-syne font-semibold text-text-primary text-sm">{value}</p>
    </div>
  );
}

function PoolCard({ pool, onAddLiquidity }) {
  const tokenA = getToken(pool.tokenA);
  const tokenB = getToken(pool.tokenB);
  if (!tokenA || !tokenB) return null;

  return (
    <div className={`bg-bg-surface rounded-2xl border transition-all duration-200 hover:border-accent/20 cursor-pointer group ${
      pool.isTop ? 'border-accent/30' : 'border-border'
    }`}>
      {pool.isTop && (
        <div className="px-5 pt-3 pb-0 flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1l1.4 2.9L11 4.35l-2.5 2.4.6 3.4L6 8.65 2.9 10.15l.6-3.4L1 4.35l3.6-.45L6 1z" fill="#F97316" stroke="#F97316" strokeWidth="0.5" strokeLinejoin="round"/>
          </svg>
          <span className="text-accent text-xs font-dm font-semibold">Top pool</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <TokenPair tokenA={pool.tokenA} tokenB={pool.tokenB} size="md" />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-syne font-bold text-text-primary">
                  {tokenA.symbol}/{tokenB.symbol}
                </span>
                {pool.isDualYield && (
                  <Badge variant="gold" size="xs">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1l1 2.5L9 4l-2 2 .5 3L5 7.5 2.5 9 3 6 1 4l3-.5L5 1z" fill="currentColor"/>
                    </svg>
                    Dual yield
                  </Badge>
                )}
              </div>
              <p className="text-text-muted text-xs font-dm">0.30% fee tier</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-syne font-bold text-success text-xl">{pool.apr}%</p>
            <p className="text-text-muted text-xs font-dm">APR</p>
          </div>
        </div>

        {pool.isDualYield && (
          <div className="flex gap-2 mb-4">
            <div className="flex-1 bg-bg-elevated rounded-lg p-2 text-center">
              <p className="text-text-muted text-xs font-dm">Swap fees</p>
              <p className="font-dm font-semibold text-text-primary text-sm">{pool.feeApr}%</p>
            </div>
            <div className="flex-1 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-2 text-center">
              <p className="text-yellow-500/70 text-xs font-dm">RWA yield</p>
              <p className="font-dm font-semibold text-yellow-400 text-sm">{pool.rwaApr}%</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border mb-4">
          <StatPill label="TVL" value={formatUsd(pool.tvl, true)} />
          <StatPill label="24h Volume" value={formatUsd(pool.volume24h, true)} />
        </div>

        <button
          onClick={() => onAddLiquidity(pool)}
          className="w-full py-2.5 bg-bg-elevated hover:bg-accent/10 border border-border hover:border-accent/30 text-text-secondary hover:text-accent font-dm font-medium text-sm rounded-xl transition-all duration-200 cursor-pointer"
        >
          Add Liquidity
        </button>
      </div>
    </div>
  );
}

function PositionCard({ position, onManage }) {
  const tokenA = getToken(position.tokenA);
  const tokenB = getToken(position.tokenB);
  if (!tokenA || !tokenB) return null;
  const pool = POOLS.find(p => p.id === position.poolId);
  const totalValue = position.deposited + position.feesEarned;

  return (
    <div className="bg-bg-surface rounded-2xl border border-border hover:border-accent/20 transition-all duration-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TokenPair tokenA={position.tokenA} tokenB={position.tokenB} size="md" />
          <div>
            <span className="font-syne font-bold text-text-primary">{tokenA.symbol}/{tokenB.symbol}</span>
            <p className="text-text-muted text-xs font-dm mt-0.5">{position.sharePercent}% pool share</p>
          </div>
        </div>
        {pool?.isDualYield && <Badge variant="gold" size="xs">Dual yield</Badge>}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-bg-elevated rounded-xl p-3">
          <p className="text-text-muted text-xs font-dm mb-1">Deposited</p>
          <p className="font-syne font-bold text-text-primary">{formatUsd(position.deposited)}</p>
        </div>
        <div className="bg-bg-elevated rounded-xl p-3">
          <p className="text-text-muted text-xs font-dm mb-1">Fees earned</p>
          <p className="font-syne font-bold text-success">{formatUsd(position.feesEarned)}</p>
        </div>
        <div className="bg-bg-elevated rounded-xl p-3">
          <p className="text-text-muted text-xs font-dm mb-1">Total value</p>
          <p className="font-syne font-bold text-text-primary">{formatUsd(totalValue)}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onManage(position, 'add')}
          className="flex-1 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 text-accent font-dm font-medium text-sm rounded-xl transition-all duration-200 cursor-pointer"
        >
          Add
        </button>
        <button
          onClick={() => onManage(position, 'remove')}
          className="flex-1 py-2 bg-bg-elevated hover:bg-danger/10 border border-border hover:border-danger/30 text-text-secondary hover:text-danger font-dm font-medium text-sm rounded-xl transition-all duration-200 cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function AddLiquidityModal({ isOpen, onClose, pool }) {
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [step, setStep] = useState('input');

  if (!pool) return null;
  const tokenA = getToken(pool.tokenA);
  const tokenB = getToken(pool.tokenB);

  const handleAmountAChange = (val) => {
    setAmountA(val);
    if (val && tokenA && tokenB) {
      const usdA = parseFloat(val) * tokenA.price;
      setAmountB(String((usdA / tokenB.price).toFixed(6)));
    } else {
      setAmountB('');
    }
  };

  const handleConfirm = async () => {
    setStep('confirming');
    await new Promise(r => setTimeout(r, 1500));
    setStep('success');
  };

  const handleClose = () => {
    setStep('input');
    setAmountA('');
    setAmountB('');
    onClose();
  };

  if (step === 'success') {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} size="sm">
        <div className="text-center space-y-4 py-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-success/10 border border-success/20 flex items-center justify-center animate-success-pop">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l6 6 10-10" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-syne font-bold text-xl text-text-primary">Liquidity added</h3>
            <p className="text-text-secondary text-sm font-dm mt-1">
              {tokenA?.symbol}/{tokenB?.symbol} position created
            </p>
          </div>
          <button onClick={handleClose} className="w-full py-3 bg-bg-elevated border border-border text-text-primary font-dm font-medium rounded-xl transition-colors hover:border-accent/30 cursor-pointer">
            Done
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Add Liquidity — ${tokenA?.symbol}/${tokenB?.symbol}`} size="md">
      <div className="space-y-4">
        <div className="space-y-2">
          {[{ token: pool.tokenA, amount: amountA, onChange: handleAmountAChange },
            { token: pool.tokenB, amount: amountB, onChange: setAmountB }].map(({ token, amount, onChange }) => {
            const t = getToken(token);
            const usd = amount && t ? parseFloat(amount) * t.price : 0;
            return (
              <div key={token} className="bg-bg-elevated rounded-xl p-4 flex items-center gap-3">
                <div className="flex items-center gap-2 w-24 flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-syne font-bold text-xs" style={{ backgroundColor: t?.bgColor, color: t?.color }}>
                    {t?.symbol.charAt(0)}
                  </div>
                  <span className="font-dm font-semibold text-text-primary text-sm">{t?.symbol}</span>
                </div>
                <div className="flex-1 text-right">
                  <input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={e => onChange(e.target.value)}
                    className="w-full bg-transparent text-right font-syne font-bold text-xl text-text-primary placeholder-text-muted focus:outline-none"
                  />
                  {usd > 0 && <p className="text-text-muted text-xs font-dm">{formatUsd(usd)}</p>}
                </div>
              </div>
            );
          })}
        </div>

        {amountA && parseFloat(amountA) > 0 && (
          <div className="bg-bg-elevated rounded-xl p-4 space-y-2 animate-fade-in">
            <div className="flex justify-between text-sm font-dm">
              <span className="text-text-muted">Projected APR</span>
              <span className="text-success font-semibold">{pool.apr}%</span>
            </div>
            <div className="flex justify-between text-sm font-dm">
              <span className="text-text-muted">Fee tier</span>
              <span className="text-text-secondary">0.30%</span>
            </div>
            {pool.isDualYield && (
              <div className="flex justify-between text-sm font-dm">
                <span className="text-text-muted">RWA yield included</span>
                <Badge variant="gold" size="xs">{pool.rwaApr}% extra</Badge>
              </div>
            )}
            <div className="flex justify-between text-sm font-dm">
              <span className="text-text-muted">Total deposit</span>
              <span className="text-text-primary font-semibold">
                {formatUsd((parseFloat(amountA) || 0) * (getToken(pool.tokenA)?.price || 0) + (parseFloat(amountB) || 0) * (getToken(pool.tokenB)?.price || 0))}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={!amountA || parseFloat(amountA) <= 0 || step === 'confirming'}
          className={`w-full py-3.5 font-dm font-semibold rounded-xl transition-all duration-200 ${
            amountA && parseFloat(amountA) > 0 && step !== 'confirming'
              ? 'bg-accent hover:bg-accent/90 text-white cursor-pointer active:scale-[0.98]'
              : 'bg-bg-elevated text-text-muted cursor-not-allowed border border-border'
          }`}
        >
          {step === 'confirming' ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Adding liquidity...
            </span>
          ) : 'Add Liquidity'}
        </button>
      </div>
    </Modal>
  );
}

export default function Pools() {
  const { isConnected } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPool, setSelectedPool] = useState(null);

  const sortedPools = [...POOLS].sort((a, b) => (b.isTop ? 1 : 0) - (a.isTop ? 1 : 0));

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Liquidity Pools</h1>
          <p className="text-text-secondary font-dm text-sm">Earn fees and yield by providing liquidity</p>
        </div>
        <div className="flex items-center gap-1 bg-bg-surface border border-border rounded-xl p-1">
          {[{ id: 'all', label: 'All Pools' }, { id: 'mine', label: 'My Positions' }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-dm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-bg-elevated text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
              {tab.id === 'mine' && isConnected && (
                <span className="ml-1.5 text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">
                  {MY_POSITIONS.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedPools.map(pool => (
            <PoolCard key={pool.id} pool={pool} onAddLiquidity={setSelectedPool} />
          ))}
        </div>
      )}

      {activeTab === 'mine' && (
        <>
          {!isConnected ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="8" width="22" height="16" rx="2.5" stroke="#4B5563" strokeWidth="1.5"/>
                  <path d="M3 13h22M9 8V6a5 5 0 0110 0v2" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-syne font-bold text-text-primary mb-2">Connect your wallet</h3>
              <p className="text-text-muted font-dm text-sm">Connect to view your LP positions</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MY_POSITIONS.map(pos => (
                <PositionCard
                  key={pos.id}
                  position={pos}
                  onManage={(position, action) => {
                    if (action === 'add') {
                      const pool = POOLS.find(p => p.id === position.poolId);
                      if (pool) setSelectedPool(pool);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      <AddLiquidityModal
        isOpen={!!selectedPool}
        onClose={() => setSelectedPool(null)}
        pool={selectedPool}
      />
    </div>
  );
}
