import { getToken } from '../../data/mock';

export default function TokenIcon({ tokenId, size = 'md', className = '' }) {
  const token = getToken(tokenId);
  if (!token) return null;

  const sizes = {
    xs: 'w-5 h-5 text-xs',
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-syne font-bold flex-shrink-0 ${className}`}
      style={{ backgroundColor: token.bgColor, color: token.color }}
      title={token.name}
    >
      {token.symbol.charAt(0)}
    </div>
  );
}

export function TokenPair({ tokenA, tokenB, size = 'sm' }) {
  const sizes = { xs: 'w-5 h-5', sm: 'w-7 h-7', md: 'w-9 h-9' };
  const tokenAData = getToken(tokenA);
  const tokenBData = getToken(tokenB);
  if (!tokenAData || !tokenBData) return null;

  return (
    <div className="flex items-center -space-x-2">
      <div
        className={`${sizes[size]} rounded-full flex items-center justify-center font-syne font-bold text-xs ring-2 ring-bg-surface z-10 flex-shrink-0`}
        style={{ backgroundColor: tokenAData.bgColor, color: tokenAData.color }}
      >
        {tokenAData.symbol.charAt(0)}
      </div>
      <div
        className={`${sizes[size]} rounded-full flex items-center justify-center font-syne font-bold text-xs ring-2 ring-bg-surface flex-shrink-0`}
        style={{ backgroundColor: tokenBData.bgColor, color: tokenBData.color }}
      >
        {tokenBData.symbol.charAt(0)}
      </div>
    </div>
  );
}
