import React, { useState, useCallback, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translateService } from '../../services/translateService';

export default function TranslationButton() {
  const { language, setLanguage } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = useCallback(async (targetLang: 'ar' | 'en') => {
    try {
      setError(null);
      setIsTranslating(true);
      setShowDropdown(false);
      setProgress(0);

      // Get all translatable content
      const elements = Array.from(document.querySelectorAll(
        'p, h1, h2, h3, h4, h5, h6, span, button, a, label, td, th, div'
      ));
      const totalElements = elements.length;
      
      // Translate in batches
      const batchSize = 5;
      for (let i = 0; i < elements.length; i += batchSize) {
        const batch = elements.slice(i, i + batchSize) as HTMLElement[];
        await translateService.translatePage(batch, targetLang);
        
        // Update progress
        setProgress(Math.min(((i + batchSize) / totalElements) * 100, 100));
      }

      // Update language context and document direction
      setLanguage(targetLang);
      document.dir = targetLang === 'ar' ? 'rtl' : 'ltr';
      
    } catch (error) {
      console.error('Translation failed:', error);
      setError('Failed to translate page. Please try again.');
    } finally {
      setIsTranslating(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, [setLanguage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown && !(event.target as Element).closest('.translation-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all ${
          isTranslating ? 'animate-pulse' : ''
        }`}
        disabled={isTranslating}
      >
        <Languages 
          className={`w-5 h-5 ${isTranslating ? 'text-blue-600 animate-spin' : 'text-gray-600'}`} 
        />
      </button>

      {showDropdown && !isTranslating && (
        <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-xl w-72 overflow-hidden translation-dropdown animate-slideIn">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Languages className="w-5 h-5 text-blue-600" />
              <span className="font-medium">
                {language === 'ar' ? 'Translate this page?' : 'ترجمة هذه الصفحة؟'}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {language === 'ar' 
                ? 'Would you like to translate this page to English?' 
                : 'هل تريد ترجمة هذه الصفحة إلى العربية؟'
              }
            </p>
          </div>

          <div className="p-2">
            <button
              onClick={() => handleTranslate(language === 'ar' ? 'en' : 'ar')}
              className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-between"
            >
              <span>
                {language === 'ar' ? 'Translate to English' : 'ترجمة إلى العربية'}
              </span>
              <Languages className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 py-2 bg-gray-50">
            <button
              onClick={() => setShowDropdown(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {language === 'ar' ? 'Not now' : 'ليس الآن'}
            </button>
          </div>
        </div>
      )}

      {isTranslating && progress > 0 && (
        <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-xl p-4 w-72">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {language === 'ar' ? 'Translating...' : 'جاري الترجمة...'}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute bottom-full mb-2 right-0 bg-red-50 text-red-600 rounded-lg shadow-xl p-4 w-72">
          {error}
        </div>
      )}
    </div>
  );
}