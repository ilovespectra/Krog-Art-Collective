'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.section}>
            <div className={styles.brandSection}>
              <Image src="/kolektivkrog.png" alt="Krog Logo" width={40} height={40} className={styles.logoImage} />
              <h3 className={styles.brandTitle}>
                Krog
              </h3>
            </div>
            <p className={styles.subtitle}>
              {t('header.subtitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {t('nav.browse')}
            </h4>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link href="/" className={styles.link}>
                  {t('browse.all')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {t('nav.about')}
            </h4>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link href="/about" className={styles.link}>
                  {t('about.mission')}
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link href="/join" className={styles.link}>
                  {t('nav.join')}
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link href="/donate" className={styles.link}>
                  {t('footer.donate')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {t('nav.contact')}
            </h4>
            <ul className={styles.list}>
              <li className={styles.listItem}>{t('footer.address')}</li>
              <li className={styles.listItem}>
                <a
                  href="mailto:info@kolektivkrog.si"
                  className={styles.link}
                >
                  info@kolektivkrog.si
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.divider}>
          <p className={styles.copyright}>
            © {currentYear} Krog Art Collective. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
