'use client';

import { useState, useMemo } from 'react';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import InventoryCard from '@/components/InventoryCard';
import { InventoryCategory } from '@/types/inventory';
import { inventoryCache } from '@/data/inventory';
import { semanticSearch, searchByCategory } from '@/utils/search';
import styles from './browse.module.css';

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<InventoryCategory | null>(null);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest'>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredItems = useMemo(() => {
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
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Art Supply Library</h1>
          <p className={styles.subtitle}>
            Browse donated art supplies and materials available for the community
          </p>
          <div className={styles.searchContainer}>
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <button 
          className={styles.filterToggle}
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-label="Toggle filters"
        >
          {filtersOpen ? '✕ Hide Filters' : '☰ Show Filters'}
        </button>
        
        <aside className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Categories</h3>
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>

          <div className={styles.sortSection}>
            <h3 className={styles.filterTitle}>Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price-low' | 'price-high' | 'newest')}
              className={styles.select}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </aside>

        <section className={styles.results}>
          {filteredItems.length > 0 ? (
            <div className={styles.grid}>
              {filteredItems.map((item) => (
                <InventoryCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No items found</p>
              <p className={styles.emptySubtext}>
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
