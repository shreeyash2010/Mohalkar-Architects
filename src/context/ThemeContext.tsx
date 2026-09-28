import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  resolvedTheme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const STORAGE_KEY_1 = 'mohalkar_theme';
const STORAGE_KEY_2 = 'mohalkar_theme_preference';

function getSystemPreference(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getStoredThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(STORAGE_KEY_2) || localStorage.getItem(STORAGE_KEY_1);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved as ThemeMode;
    }
  } catch {
    // ignore
  }
  return 'light';
}

function applyThemeToDOM(isDark: boolean) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;

  if (isDark) {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
    if (body) {
      body.classList.add('dark');
      body.classList.remove('light');
      body.style.backgroundColor = '#0c0e12';
      body.style.color = '#e2e4e8';
    }
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    root.setAttribute('data-theme', 'light');
    if (body) {
      body.classList.remove('dark');
      body.classList.add('light');
      body.style.backgroundColor = '#f7f5f2';
      body.style.color = '#3a3a3a';
    }
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getStoredThemeMode);
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemPreference);

  // Listen for OS system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolvedTheme: Theme = themeMode === 'system' ? systemTheme : themeMode;
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_1, resolvedTheme);
      localStorage.setItem(STORAGE_KEY_2, themeMode);
    } catch {
      // ignore
    }
    applyThemeToDOM(isDark);

    // Notify any listeners
    window.dispatchEvent(
      new CustomEvent('mohalkar:theme-change', {
        detail: { resolvedTheme, themeMode, isDark },
      })
    );
  }, [themeMode, resolvedTheme, isDark]);

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => {
      const currentResolved = prev === 'system' ? getSystemPreference() : prev;
      return currentResolved === 'dark' ? 'light' : 'dark';
    });
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeModeState(newTheme);
  }, []);

  const setThemeMode = useCallback((newMode: ThemeMode) => {
    setThemeModeState(newMode);
  }, []);

  const value: ThemeContextType = {
    theme: resolvedTheme,
    themeMode,
    resolvedTheme,
    isDark,
    toggleTheme,
    setTheme,
    setThemeMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Standalone fallback hook for when ThemeProvider is missing in user's root
function useStandaloneTheme(): ThemeContextType {
  const [mode, setMode] = useState<ThemeMode>(getStoredThemeMode);
  const [sysTheme] = useState<Theme>(getSystemPreference);

  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.themeMode) {
        setMode(detail.themeMode);
      }
    };
    window.addEventListener('mohalkar:theme-change', handleCustomChange);
    return () => window.removeEventListener('mohalkar:theme-change', handleCustomChange);
  }, []);

  const resolvedTheme: Theme = mode === 'system' ? sysTheme : mode;
  const isDark = resolvedTheme === 'dark';

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = isDark ? 'light' : 'dark';
    setMode(nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY_1, nextTheme);
      localStorage.setItem(STORAGE_KEY_2, nextTheme);
    } catch {}
    applyThemeToDOM(nextTheme === 'dark');
    window.dispatchEvent(
      new CustomEvent('mohalkar:theme-change', {
        detail: { resolvedTheme: nextTheme, themeMode: nextTheme, isDark: nextTheme === 'dark' },
      })
    );
  }, [isDark]);

  const setTheme = useCallback((t: Theme) => {
    setMode(t);
    try {
      localStorage.setItem(STORAGE_KEY_1, t);
      localStorage.setItem(STORAGE_KEY_2, t);
    } catch {}
    applyThemeToDOM(t === 'dark');
    window.dispatchEvent(
      new CustomEvent('mohalkar:theme-change', {
        detail: { resolvedTheme: t, themeMode: t, isDark: t === 'dark' },
      })
    );
  }, []);

  const setThemeMode = useCallback((m: ThemeMode) => {
    setMode(m);
    const resolved = m === 'system' ? getSystemPreference() : m;
    try {
      localStorage.setItem(STORAGE_KEY_1, resolved);
      localStorage.setItem(STORAGE_KEY_2, m);
    } catch {}
    applyThemeToDOM(resolved === 'dark');
    window.dispatchEvent(
      new CustomEvent('mohalkar:theme-change', {
        detail: { resolvedTheme: resolved, themeMode: m, isDark: resolved === 'dark' },
      })
    );
  }, []);

  return {
    theme: resolvedTheme,
    themeMode: mode,
    resolvedTheme,
    isDark,
    toggleTheme,
    setTheme,
    setThemeMode,
  };
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  const standalone = useStandaloneTheme();
  if (!context) {
    return standalone;
  }
  return context;
};
