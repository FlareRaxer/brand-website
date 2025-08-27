import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import daTranslations from './locales/da.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  da: {
    translation: daTranslations,
  },
};

// Custom language detector for Danish users
const customLanguageDetector = {
  name: 'customDetector',
  lookup() {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return 'da'; // Default to Danish on server
    }

    try {
      // Check if user is from Denmark based on IP/timezone (simplified)
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const language = navigator.language || navigator.languages[0];

      // If user is in Danish timezone or has Danish as primary language, default to Danish
      if (timezone === 'Europe/Copenhagen' || language.startsWith('da')) {
        return 'da';
      }

      // Otherwise default to English
      return 'en';
    } catch {
      // Fallback if any browser API fails
      return 'da';
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'da',
    debug: false,

    detection: {
      order: ['localStorage', 'customDetector', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    // Prevent multiple initializations
    initImmediate: false,
  });

// Add custom detector
i18n.services.languageDetector.addDetector(customLanguageDetector);

export default i18n;
