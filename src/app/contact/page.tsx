'use client';

import { useTranslation } from '@/hooks/useTranslation';
import styles from './contact.module.css';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          {t('contact.title')}
        </h1>

        <div className={styles.grid}>
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>
              {t('contact.getInTouch')}
            </h2>
            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <h3 className={styles.contactLabel}>
                  {t('contact.email')}
                </h3>
                <a
                  href="mailto:info@kolektivkrog.si"
                  className={styles.emailLink}
                >
                  info@kolektivkrog.si
                </a>
              </div>
              <div className={styles.contactItem}>
                <h3 className={styles.contactLabel}>
                  {t('contact.location')}
                </h3>
                <p className={styles.contactValue}>
                  {t('contact.address')}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>
              {t('contact.whyContact')}
            </h2>
            <ul className={styles.reasonsList}>
              <li className={styles.reasonItem}>
                <span>📦</span>
                <span>{t('contact.donateSupplies')}</span>
              </li>
              <li className={styles.reasonItem}>
                <span>❓</span>
                <span>{t('contact.askQuestions')}</span>
              </li>
              <li className={styles.reasonItem}>
                <span>🤝</span>
                <span>{t('contact.collaborate')}</span>
              </li>
              <li className={styles.reasonItem}>
                <span>🎨</span>
                <span>{t('contact.learnProgram')}</span>
              </li>
              <li className={styles.reasonItem}>
                <span>💡</span>
                <span>{t('contact.suggestFeatures')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
