'use client';

import { createContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { type Lang, translations, locales } from './translations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TranslationDict = Record<string, any>;

interface I18nContextType {
  lang: Lang;
  t: TranslationDict;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const I18nContext = createContext<I18nContextType | null>(null);

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'zh';
  const stored = localStorage.getItem('streamflow-lang') as Lang | null;
  if (stored && locales.includes(stored)) return stored;
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('zh') ? 'zh' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    setLangState(getInitialLang());
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('streamflow-lang', newLang);
    document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en';
  }, []);

  const toggleLang = useCallback(() => {
    setLangState(prev => {
      const next = prev === 'zh' ? 'en' : 'zh';
      localStorage.setItem('streamflow-lang', next);
      document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
      return next;
    });
  }, []);

  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}
