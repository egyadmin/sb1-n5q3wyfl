import React, { createContext, useContext, useState, useEffect } from 'react';
import { arTranslations } from '../translations/ar';
import { enTranslations } from '../translations/en';

type Language = 'ar' | 'en';
type Translations = typeof arTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang as Language) || 'ar';
  });

  const t = (key: keyof Translations): string => {
    const translations = language === 'ar' ? arTranslations : enTranslations;
    return translations[key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    localStorage.setItem('language', language);

    // Update font family based on language
    if (language === 'ar') {
      document.body.style.fontFamily = "'Noto Sans Arabic', sans-serif";
    } else {
      document.body.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    }

    // Update text alignment for the entire app
    document.body.style.textAlign = language === 'ar' ? 'right' : 'left';
  }, [language, dir]);

  const value = {
    language,
    setLanguage,
    t,
    dir
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}