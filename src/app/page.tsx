'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import { InventoryCategory } from '@/types/inventory';
import { inventoryCache } from '@/data/inventory';
import { semanticSearch, searchByCategory } from '@/utils/search';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './home.module.css';

export default function Home() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<InventoryCategory | null>(null);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest'>('newest');

  useMemo(() => {
    let items = inventoryCache;

    if (searchQuery.trim()) {
      const searchResults = semanticSearch(searchQuery, items);
      items = searchResults.map((r) => r.item);
    } else if (selectedCategory) {
      items = searchByCategory(selectedCategory, items);
    }

    const sorted = [...items];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      sorted.sort(
        (a, b) => new Date(b.donatedDate).getTime() - new Date(a.donatedDate).getTime()
      );
    }

    return sorted;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTop}>
            <Image 
              src="/kolektivkrog.png" 
              alt="Krog Logo" 
              width={120} 
              height={120} 
              className={styles.headerLogo}
              priority
            />
            <div>
              <h1 className={styles.title}>{t('browse.title')}</h1>
              <p className={styles.subtitle}>
                {t('header.subtitle')}
              </p>
            </div>
          </div>
          <div className={styles.searchWrapper}>
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.gridContainer}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

              <div className={styles.sortSection}>
                <h3 className={styles.sortTitle}>
                  {t('browse.sort')}
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price-low' | 'price-high' | 'newest')}
                  className={styles.sortSelect}
                >
                  <option value="newest">{t('browse.newest')}</option>
                  <option value="price-low">{t('browse.price_low')}</option>
                  <option value="price-high">{t('browse.price_high')}</option>
                </select>
              </div>
            </div>
          </aside>

          <section className={styles.mainSection}>
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>📦</div>
              <h2 className={styles.noResultsTitle}>
                {t('browse.growing_title')}
              </h2>
              <p className={styles.noResultsText}>
                {t('browse.growing_text')}
              </p>
              <p className={styles.noResultsSubtext}>
                {t('browse.seeking_donations')}
              </p>
              <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '1rem', color: '#666' }}>
                <li>🎨 {t('browse.donate_paints')}</li>
                <li>✏️ {t('browse.donate_drawing')}</li>
                <li>📄 {t('browse.donate_paper')}</li>
                <li>🖌️ {t('browse.donate_brushes')}</li>
                <li>🎭 {t('browse.donate_specialty')}</li>
              </ul>
              <p style={{ marginTop: '2rem', color: '#666', fontSize: '0.95rem' }}>
                {t('browse.donate_cta')} <a href="/donate" style={{ color: '#a855f7', fontWeight: 600, textDecoration: 'none' }}>{t('browse.donatePageLink')}</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
