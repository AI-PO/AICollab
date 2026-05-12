import { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useTheme } from './context/useTheme';
import { OnboardingProvider } from './context/OnboardingContext';
import Header from './components/layout/Header';
import OnboardingOverlay from './components/onboarding/OnboardingOverlay';
import Swap from './pages/Swap';
import Pools from './pages/Pools';
import Portfolio from './pages/Portfolio';
import Market from './pages/Market';
import Landing from './pages/Landing';

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
    <OnboardingProvider navigateTo={setActivePage}>
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
        <OnboardingOverlay />
      </div>
    </OnboardingProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<AppShell />} />
      </Routes>
    </AppProvider>
  );
}
