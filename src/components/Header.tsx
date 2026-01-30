'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/store/useCart';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useTranslation();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {/* Logo / Title */}
          <Link href="/" className={styles.logo}>
            <Image src="/kolektivkrog.png" alt="Krog Logo" width={40} height={40} className={styles.logoImage} />
            <div className={styles.logoBrand}>
              <h1 className={styles.logoTitle}>
                {t('header.logoTitle')}
              </h1>
              <p className={styles.logoSubtitle}>{t('header.logoSubtitle')}</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              {t('nav.browse')}
            </Link>
            <Link href="/tools" className={styles.navLink}>
              {t('nav.tools')}
            </Link>
            <Link href="/donate" className={styles.navLink}>
              {t('nav.donate')}
            </Link>
            <Link href="/join" className={styles.navLink}>
              {t('nav.join')}
            </Link>
            <Link href="/about" className={styles.navLink}>
              {t('nav.about')}
            </Link>
            <Link href="/contact" className={styles.navLink}>
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Controls */}
          <div className={styles.controls}>
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/cart" className={styles.cartLink}>
              <svg
                className={styles.cartIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className={styles.cartBadge}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
