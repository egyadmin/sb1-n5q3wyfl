import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Languages className="w-5 h-5" />
      <span>{language === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}