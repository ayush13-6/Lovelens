import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE } from './languages.js';
import { en } from './translations/en.js';
import { hinglish } from './translations/hinglish.js';
import { hi } from './translations/hi.js';
import { ja } from './translations/ja.js';
import { ru } from './translations/ru.js';
import { RAW_QUESTIONS } from '../data/questions.js';
import { CATEGORIES } from '../data/categories.js';

const TRANSLATIONS = {
  en,
  hinglish,
  hi,
  ja,
  ru,
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lovelens_lang');
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
    } catch {
      // ignore
    }
    return DEFAULT_LANGUAGE;
  });

  const changeLanguage = (newLang) => {
    if (TRANSLATIONS[newLang]) {
      setCurrentLang(newLang);
      try {
        localStorage.setItem('lovelens_lang', newLang);
      } catch {
        // ignore
      }
    }
  };

  const t = useMemo(() => TRANSLATIONS[currentLang] || TRANSLATIONS.en, [currentLang]);

  // Localized questions array (preserves exact question IDs and categories)
  const localizedQuestions = useMemo(() => {
    return RAW_QUESTIONS.map(q => ({
      ...q,
      text: t.questions?.[q.id] || q.text,
    }));
  }, [t]);

  // Interleaved questions in current language
  const localizedInterleavedQuestions = useMemo(() => {
    const groups = {
      words_of_affirmation: localizedQuestions.filter(q => q.category === 'words_of_affirmation'),
      quality_time: localizedQuestions.filter(q => q.category === 'quality_time'),
      receiving_gifts: localizedQuestions.filter(q => q.category === 'receiving_gifts'),
      acts_of_service: localizedQuestions.filter(q => q.category === 'acts_of_service'),
      physical_touch: localizedQuestions.filter(q => q.category === 'physical_touch'),
    };

    const order = [
      'words_of_affirmation',
      'quality_time',
      'receiving_gifts',
      'acts_of_service',
      'physical_touch'
    ];

    const interleaved = [];
    for (let i = 0; i < 5; i++) {
      for (const key of order) {
        if (groups[key][i]) {
          interleaved.push(groups[key][i]);
        }
      }
    }
    return interleaved;
  }, [localizedQuestions]);

  // Localized categories metadata
  const localizedCategories = useMemo(() => {
    const res = {};
    for (const key of Object.keys(CATEGORIES)) {
      const base = CATEGORIES[key];
      const trans = t.categories?.[key] || {};
      res[key] = {
        ...base,
        name: trans.name || base.name,
        shortName: trans.shortName || base.shortName,
        tagline: trans.tagline || base.tagline,
        summary: trans.summary || base.summary,
        whatItMeans: trans.whatItMeans || base.whatItMeans,
        practicalWays: trans.practicalWays || base.practicalWays,
        conversationStarter: trans.conversationStarter || base.conversationStarter,
      };
    }
    return res;
  }, [t]);

  const value = {
    lang: currentLang,
    setLang: changeLanguage,
    t,
    languages: LANGUAGES,
    currentLanguageObj: LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0],
    questions: localizedInterleavedQuestions,
    rawQuestions: localizedQuestions,
    ratingOptions: t.ratingOptions,
    categories: localizedCategories,
    faqs: t.faq.items,
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

