"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './storeLinks.module.css';

export type StoreLinksData = {
  ios?: string;
  android?: string;
  website?: string;
};

type StoreLinksProps = {
  links: StoreLinksData;
  className?: string;
};

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.storeIcon}>
    <path
      fill="currentColor"
      d="M16.37 12.86c.02 3.39 2.97 4.52 3 4.53-.03.08-.47 1.6-1.54 3.17-.93 1.36-1.9 2.71-3.42 2.74-1.5.03-1.98-.89-3.7-.89-1.71 0-2.24.86-3.66.92-1.47.06-2.59-1.47-3.53-2.82C1.67 17.8.3 13.29 1.98 10.24c.83-1.52 2.32-2.48 3.93-2.51 1.54-.03 3 .99 3.7.99.7 0 2.41-1.22 4.07-.104.69.03 2.64.28 3.89 2.1-.1.06-2.32 1.36-2.2 4.14ZM13.76 5.33c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.34 1.72-.73.85-1.37 2.21-1.2 3.51 1.27.1 2.57-.64 3.36-1.61Z"
    />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.storeIcon}>
    <path
      fill="currentColor"
      d="M5.04 2.6c-.5-.3-1.14.06-1.14.64v17.52c0 .58.64.94 1.14.64l14.3-8.76a.74.74 0 0 0 0-1.28L5.04 2.6Z"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.storeIcon}>
    <path
      fill="currentColor"
      d="M12 2.5A9.5 9.5 0 1 0 21.5 12 9.51 9.51 0 0 0 12 2.5Zm6.86 8.7h-3.13a14.7 14.7 0 0 0-1.2-5.05 7.53 7.53 0 0 1 4.33 5.05ZM12 4.5c.9 1.18 1.62 2.82 2.03 4.7H9.97C10.38 7.32 11.1 5.68 12 4.5ZM4.62 13.2h3.13a14.7 14.7 0 0 0 1.2 5.05 7.53 7.53 0 0 1-4.33-5.05Zm3.13-2.4H4.62a7.53 7.53 0 0 1 4.33-5.05A14.7 14.7 0 0 0 7.75 10.8Zm1.72 0h6.06c-.4 1.9-1.14 3.56-2.03 4.7-.9-1.14-1.63-2.8-2.03-4.7Zm6.06 2.4h3.13a7.53 7.53 0 0 1-4.33 5.05 14.7 14.7 0 0 0 1.2-5.05ZM12 19.5c-.9-1.18-1.62-2.82-2.03-4.7h4.06c-.41 1.88-1.13 3.52-2.03 4.7Z"
    />
  </svg>
);

const StoreLinks = ({ links, className }: StoreLinksProps) => {
  const { t } = useTranslation();

  if (!links.ios && !links.android && !links.website) {
    return null;
  }

  const stopCardClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`${styles.storeLinks} ${className ?? ''}`}
      onClick={stopCardClick}
      onKeyDown={stopCardClick}
    >
      {links.website && (
        <a
          href={links.website}
          className={styles.storeBtn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('projects.visitSiteAria')}
        >
          <GlobeIcon />
          <span className={styles.storeCopy}>
            <span className={styles.storeEyebrow}>{t('projects.visitSiteEyebrow')}</span>
            <span className={styles.storeName}>{t('projects.visitSite')}</span>
          </span>
        </a>
      )}
      {links.ios && (
        <a
          href={links.ios}
          className={styles.storeBtn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('projects.appStoreAria')}
        >
          <AppleIcon />
          <span className={styles.storeCopy}>
            <span className={styles.storeEyebrow}>{t('projects.downloadOn')}</span>
            <span className={styles.storeName}>{t('projects.appStore')}</span>
          </span>
        </a>
      )}
      {links.android && (
        <a
          href={links.android}
          className={styles.storeBtn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('projects.playStoreAria')}
        >
          <PlayIcon />
          <span className={styles.storeCopy}>
            <span className={styles.storeEyebrow}>{t('projects.getItOn')}</span>
            <span className={styles.storeName}>{t('projects.playStore')}</span>
          </span>
        </a>
      )}
    </div>
  );
};

export default StoreLinks;
