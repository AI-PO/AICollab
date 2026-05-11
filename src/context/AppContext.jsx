import { createContext, useState, useCallback } from 'react';
import { MOCK_WALLET, WALLET_BALANCES } from '../data/mock';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [balances, setBalances] = useState({});

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    await new Promise(r => setTimeout(r, 1400));
    setIsConnected(true);
    setIsConnecting(false);
    setWallet(MOCK_WALLET);
    setBalances(WALLET_BALANCES);
  }, []);

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    setWallet(null);
    setBalances({});
  }, []);

  const getBalance = useCallback((tokenId) => {
    return balances[tokenId] || { amount: 0, usdValue: 0 };
  }, [balances]);

  return (
    <AppContext.Provider value={{
      isConnected,
      isConnecting,
      wallet,
      balances,
      connectWallet,
      disconnectWallet,
      getBalance,
    }}>
      {children}
    </AppContext.Provider>
  );
}
