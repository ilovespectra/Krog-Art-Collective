'use client';

import Image from 'next/image';
import { InventoryItem } from '@/types/inventory';
import { useCart } from '@/store/useCart';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './InventoryCard.module.css';

interface InventoryCardProps {
  item: InventoryItem;
}

export default function InventoryCard({ item }: InventoryCardProps) {
  const { addItem } = useCart();
  const { t } = useTranslation();

  const conditionColorMap = {
    excellent: styles.tagExcellent,
    good: styles.tagGood,
    fair: styles.tagFair,
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            className={styles.img}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.icon}>🎨</div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          {item.name}
        </h3>

        <p className={styles.description}>
          {item.description}
        </p>

        <div className={styles.tags}>
          <span className={`${styles.tag} ${conditionColorMap[item.condition]}`}>
            {item.condition}
          </span>
          {item.quantity > 0 && (
            <span className={`${styles.tag} ${styles.tagQuantity}`}>
              {item.quantity} {t('item.quantity')}
            </span>
          )}
        </div>

        <div className={styles.spacer}></div>

        <div className={styles.footer}>
          <span className={styles.price}>
            €{item.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => addItem(item, 1)}
          disabled={item.quantity === 0}
          className={styles.addButton}
        >
          {item.quantity > 0
            ? t('item.addToCart')
            : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
