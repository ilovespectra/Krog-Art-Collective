'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/store/useCart';
import styles from './success.module.css';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const updateInventory = async () => {
      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        setError('No session found');
        setLoading(false);
        return;
      }

      try {
        // Get the order details from localStorage (saved when checkout started)
        const orderData = localStorage.getItem('pending_order');
        if (orderData) {
          const items = JSON.parse(orderData);
          
          // Update inventory
          await fetch('/api/inventory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items }),
          });

          // Clear cart and storage
          clearCart();
          localStorage.removeItem('pending_order');
        }

        setLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update inventory';
        setError(message);
        setLoading(false);
      }
    };

    updateInventory();
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.loading}>Processing your order...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Error</h1>
          <p className={styles.message}>{error}</p>
          <Link href="/" className={styles.button}>Return Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.successIcon}>✓</div>
        <h1 className={styles.heading}>Payment Successful!</h1>
        <p className={styles.message}>
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        <p className={styles.subMessage}>
          A confirmation email has been sent to your email address.
        </p>

        <div className={styles.buttonGroup}>
          <a href="/browse" className={styles.button}>Continue Shopping</a>
          <Link href="/" className={styles.secondaryButton}>Return Home</Link>
        </div>
      </div>
    </main>
  );
}
