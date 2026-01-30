'use client';

import { useLanguage } from '@/store/useLanguage';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`${styles.button} ${locale === 'en' ? styles.buttonActive : styles.buttonInactive}`}
      title="Toggle language"
    >
      <span className={styles.flag}>
        {locale === 'en' ? '🇬🇧' : '🇸🇮'}
      </span>
      <span className={styles.text}>
        {locale === 'en' ? 'EN' : 'SL'}
      </span>
    </button>
  );
}
