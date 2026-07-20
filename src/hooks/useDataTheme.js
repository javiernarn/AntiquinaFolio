import { useEffect, useState } from 'react';

// Reads the current `data-theme` attribute off <html> (the one useTheme.js
// sets) and stays in sync live, even if toggled from somewhere else on the
// page. Returns 'light' or 'dark'.
export function useDataTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  );

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(el.getAttribute('data-theme') || 'dark');
    });
    observer.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return theme;
}