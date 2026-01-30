'use client';

import { InventoryCategory } from '@/types/inventory';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  selected: InventoryCategory | null;
  onSelect: (category: InventoryCategory | null) => void;
}

const categories = [
  { key: InventoryCategory.PAINTS, label: 'browse.categories.paints' },
  { key: InventoryCategory.DRAWING, label: 'browse.categories.drawing' },
  { key: InventoryCategory.SURFACES, label: 'browse.categories.surfaces' },
  { key: InventoryCategory.BRUSHES, label: 'browse.categories.brushes' },
  { key: InventoryCategory.SPECIALTY, label: 'browse.categories.specialty' },
];

export default function CategoryFilter({
  selected,
  onSelect,
}: CategoryFilterProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {t('browse.filter')}
      </h3>

      <div className={styles.list}>
        <button
          onClick={() => onSelect(null)}
          className={`${styles.button} ${selected === null ? styles.buttonActive : styles.buttonInactive}`}
        >
          {t('browse.all')}
        </button>

        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`${styles.button} ${selected === key ? styles.buttonActive : styles.buttonInactive}`}
          >
            {t(label)}
          </button>
        ))}
      </div>
    </div>
  );
}
