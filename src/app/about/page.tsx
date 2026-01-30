'use client';

import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './about.module.css';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleSection}>
          <Image 
            src="/kolektivkrog.png" 
            alt="Krog Logo" 
            width={120} 
            height={120} 
            className={styles.titleLogo}
            priority
          />
          <h1 className={styles.title}>
            {t('about.title')}
          </h1>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {t('about.mission')}
          </h2>
          <p className={styles.sectionText}>
            {t('about.mission_text')}
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {t('about.story')}
          </h2>
          <p className={styles.sectionText}>
            {t('about.story_text')}
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {t('about.philosophy')}
          </h2>
          <p className={styles.sectionText}>
            {t('about.philosophy_text')}
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {t('about.values')}
          </h2>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>
                {t('about.accessibility')}
              </h3>
              <p className={styles.valueText}>
                {t('about.accessibility_text')}
              </p>
            </div>

            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>
                {t('about.sustainability')}
              </h3>
              <p className={styles.valueText}>
                {t('about.sustainability_text')}
              </p>
            </div>

            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>
                {t('about.community')}
              </h3>
              <p className={styles.valueText}>
                {t('about.community_text')}
              </p>
            </div>

            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>
                {t('about.tools')}
              </h3>
              <p className={styles.valueText}>
                {t('about.tools_text')}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            {t('footer.donate')}
          </h2>
          <p className={styles.ctaText}>
            We&apos;re always looking for donated art supplies to keep our collection fresh and diverse. If you have materials you&apos;d like to contribute&mdash;whether it&apos;s paints, brushes, paper, or specialty tools&mdash;please contact us. Your donations directly enable creative access for our community.
          </p>
          <a
            href="mailto:donate@kolektivkrog.si?subject=I%20want%20to%20donate%20art%20supplies"
            className={styles.ctaLink}
          >
            Donate Your Supplies
          </a>
        </section>
      </div>
    </div>
  );
}
