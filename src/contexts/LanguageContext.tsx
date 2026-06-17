import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n/translations.json';

type Language = 'es' | 'eu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getCardTranslation: (cardId: string, cardType: 'thd' | 'cases') => { title: string; description: string };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<ProviderProps> = (props: ProviderProps) => {
  const { children } = props;
  const [language, setLanguageSate] = useState<Language>('es');

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'es' || saved === 'eu')) {
      setLanguageSate(saved);
    } else {
      // Default to Spanish
      setLanguageSate('es');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageSate(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Fallback to key if not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const getCardTranslation = (cardId: string, cardType: 'thd' | 'cases') => {
    try {
      const langData = translations[language as keyof typeof translations] as any;
      if (langData && langData[cardType] && langData[cardType][cardId]) {
        return {
          title: langData[cardType][cardId].title,
          description: langData[cardType][cardId].description,
        };
      }
    } catch (e) {
      // Fallback
    }
    return { title: '', description: '' };
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    getCardTranslation,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
