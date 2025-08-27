"use client";

import { useEffect } from 'react';
import i18n from '../../i18n';

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialize i18n on client side only if not already initialized
    if (!i18n.isInitialized) {
      i18n.init().catch((error) => {
        console.error('Failed to initialize i18n:', error);
      });
    }
  }, []);

  useEffect(() => {
    // Update the document language when i18n language changes
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
    };

    // Set initial language
    if (i18n.language) {
      document.documentElement.lang = i18n.language;
    }

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return <>{children}</>;
};

export default LanguageProvider;
