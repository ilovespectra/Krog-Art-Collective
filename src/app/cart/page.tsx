'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/useCart';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './cart.module.css';

export default function Cart() {
  const router = useRouter();
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>
            {t('cart.title')}
          </h1>

          <div className={styles.emptyWrapper}>
            <div className={styles.emptyIcon}>🛒</div>
            <h2 className={styles.emptyTitle}>
              {t('cart.empty')}
            </h2>
            <Link href="/" className={styles.emptyLink}>
              {t('cart.continue')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          {t('cart.title')}
        </h1>

        <div className={styles.grid}>
          {/* Items */}
          <div className={styles.itemsSection}>
            {items.map((cartItem) => (
              <div
                key={cartItem.item.id}
                className={styles.cartItem}
              >
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>
                    {cartItem.item.name}
                  </h3>
                  <p className={styles.itemPrice}>
                    €{cartItem.item.price.toFixed(2)} each
                  </p>
                </div>

                <div className={styles.quantityControl}>
                  <button
                    onClick={() =>
                      updateQuantity(
                        cartItem.item.id,
                        cartItem.quantity - 1
                      )
                    }
                    className={styles.quantityButton}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        cartItem.item.id,
                        cartItem.quantity + 1
                      )
                    }
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  €{(cartItem.item.price * cartItem.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeItem(cartItem.item.id)}
                  className={styles.removeButton}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>
              Order Summary
            </h2>

            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>{t('cart.total')}</span>
              <span className={styles.totalPrice}>
                €{total.toFixed(2)}
              </span>
            </div>

            <button 
              onClick={() => router.push('/checkout')}
              className={styles.checkoutButton}
            >
              {t('cart.checkout')}
            </button>

            <Link
              href="/"
              className={styles.continueLink}
            >
              {t('cart.continue')}
            </Link>

            <button
              onClick={clearCart}
              className={styles.clearButton}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
