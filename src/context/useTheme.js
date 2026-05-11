import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('oroswap-theme') === 'dark'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('oroswap-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(v => !v);

  return { isDark, toggleTheme };
}
