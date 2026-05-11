import { useState, useRef, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { useTheme } from './context/useTheme';
import Header from './components/layout/Header';
import Swap from './pages/Swap';
import Pools from './pages/Pools';
import Portfolio from './pages/Portfolio';
import Market from './pages/Market';

const PAGES = { swap: Swap, pools: Pools, portfolio: Portfolio, market: Market };

function PageTransition({ pageId }) {
  const [displayPage, setDisplayPage] = useState(pageId);
  const [animKey, setAnimKey] = useState(0);
  const prevPage = useRef(pageId);

  useEffect(() => {
    if (pageId !== prevPage.current) {
      prevPage.current = pageId;
      setDisplayPage(pageId);
      setAnimKey(k => k + 1);
    }
  }, [pageId]);

  const PageComponent = PAGES[displayPage] || Swap;
  return <PageComponent key={animKey} />;
}

function AppShell() {
  const [activePage, setActivePage] = useState('swap');
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Header
        activePage={activePage}
        onNavigate={setActivePage}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <main className="flex-1 flex flex-col">
        <PageTransition pageId={activePage} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
