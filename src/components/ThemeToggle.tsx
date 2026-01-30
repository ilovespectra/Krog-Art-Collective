'use client';

import { useTheme } from '@/store/useTheme';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.button}
      title="Toggle theme"
    >
      {isDark ? (
        <svg className={`${styles.icon} ${styles.moonIcon}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg className={`${styles.icon} ${styles.sunIcon}`} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a4 4 0 00 5.656 5.656l2.12-2.12a4 4 0 00-5.656-5.656zM9 16.9a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM3.1 9a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm10 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM3.464 4.464a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414L3.464 5.878a1 1 0 010-1.414zm11.314 1.414a1 1 0 011.414-1.414l1.414 1.414a1 1 0 11-1.414 1.414L14.778 5.878z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}
