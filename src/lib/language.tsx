import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Every language is written in its own script first, so a reader who cannot read
 * English still recognises their language in the list.
 */
export const LANGUAGES = [
  { code: "en", native: "English", english: "English" },
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "bn", native: "বাংলা", english: "Bengali" },
  { code: "te", native: "తెలుగు", english: "Telugu" },
  { code: "mr", native: "मराठी", english: "Marathi" },
  { code: "ta", native: "தமிழ்", english: "Tamil" },
  { code: "gu", native: "ગુજરાતી", english: "Gujarati" },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada" },
  { code: "ml", native: "മലയാളം", english: "Malayalam" },
  { code: "or", native: "ଓଡ଼ିଆ", english: "Odia" },
  { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { code: "as", native: "অসমীয়া", english: "Assamese" },
  { code: "ur", native: "اردو", english: "Urdu" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

/** "Change language" written in each language, so the control explains itself. */
export const CHANGE_LANGUAGE_LABEL: Record<LanguageCode, string> = {
  en: "Change language",
  hi: "भाषा बदलें",
  bn: "ভাষা পরিবর্তন করুন",
  te: "భాష మార్చండి",
  mr: "भाषा बदला",
  ta: "மொழியை மாற்றவும்",
  gu: "ભાષા બદલો",
  kn: "ಭಾಷೆ ಬದಲಾಯಿಸಿ",
  ml: "ഭാഷ മാറ്റുക",
  or: "ଭାଷା ବଦଳାନ୍ତୁ",
  pa: "ਭਾਸ਼ਾ ਬਦਲੋ",
  as: "ভাষা সলনি কৰক",
  ur: "زبان تبدیل کریں",
};

const STORAGE_KEY = "ncrp-language";

type LanguageValue = {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // English is always the default on first open.
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (saved && LANGUAGES.some((l) => l.code === saved)) setLanguageState(saved);
    } catch {
      /* optional */
    }
  }, []);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* optional */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
