import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type FontScale = 87.5 | 100 | 125 | 150;

const VALID: FontScale[] = [87.5, 100, 125, 150];

type A11yContextValue = {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
};

const A11yContext = createContext<A11yContextValue | null>(null);

const STORAGE_KEY = "ncrp-a11y";

export function A11yProvider({ children }: { children: ReactNode }) {
  // Compact size is the default — the previous default read as oversized.
  const [fontScale, setFontScaleState] = useState<FontScale>(87.5);
  const [highContrast, setHighContrast] = useState(false);

  // Read persisted preferences after hydration to avoid SSR mismatches.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { fontScale?: FontScale; highContrast?: boolean };
      if (parsed.fontScale && VALID.includes(parsed.fontScale)) {
        setFontScaleState(parsed.fontScale);
      }
      if (typeof parsed.highContrast === "boolean") setHighContrast(parsed.highContrast);
    } catch {
      /* preferences are optional */
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--user-font-size", `${fontScale}%`);
    document.documentElement.classList.toggle("contrast-high", highContrast);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ fontScale, highContrast }));
    } catch {
      /* ignore */
    }
  }, [fontScale, highContrast]);

  const setFontScale = useCallback((scale: FontScale) => setFontScaleState(scale), []);
  const toggleHighContrast = useCallback(() => setHighContrast((v) => !v), []);

  return (
    <A11yContext.Provider value={{ fontScale, setFontScale, highContrast, toggleHighContrast }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used inside A11yProvider");
  return ctx;
}
