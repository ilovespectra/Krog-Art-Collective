'use client';

import { useCart } from '@/store/useCart';
import { useState } from 'react';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (items.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Checkout</h1>
          <div className={styles.emptyState}>
            <p className={styles.subtitle}>Your cart is empty</p>
            <a href="/browse" className={styles.button}>Continue Shopping</a>
          </div>
        </div>
      </main>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Transform cart items to the format expected by the API
      const lineItems = items.map(cartItem => ({
        name: cartItem.item.name,
        description: cartItem.item.description,
        price: cartItem.item.price,
        quantity: cartItem.quantity,
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lineItems }),
      });

      const data = await response.json();
      console.log('Checkout response:', { status: response.status, data });

      if (!response.ok) {
        setMessage(`❌ ${data.error || 'Failed to create checkout session'}`);
        return;
      }

      if (data.sessionId) {
        // Save order data for inventory update after payment
        const orderData = items.map(item => ({
          id: item.item.id,
          quantity: item.quantity,
        }));
        localStorage.setItem('pending_order', JSON.stringify(orderData));
        
        console.log('Redirecting to Stripe with sessionId:', data.sessionId);
        // Redirect to Stripe Hosted Checkout
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      } else {
        setMessage(`❌ ${data.error || 'No session created'}`);
      }
    } catch {
      setMessage(`❌ An error occurred`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
          {/* Order Summary */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Order Summary</h2>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.item.id} className={styles.itemRow}>
                  <div>
                    <p className={styles.itemName}>{item.item.name}</p>
                    <p className={styles.itemPrice}>€{item.item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                  <p className={styles.itemTotal}>€{(item.item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className={styles.divider} />

            <div className={styles.total}>
              <span>Total:</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Payment</h2>
            <div className={styles.paymentInfo}>
              <p className={styles.infoText}>Secure payment powered by Stripe</p>
              <p className={styles.infoText}>Your card details are encrypted and secure</p>
            </div>

            {message && (
              <div className={message.includes('❌') ? styles.errorMessage : styles.successMessage}>
                {message}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className={styles.checkoutButton}
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Processing...' : `Pay €${total.toFixed(2)}`}
            </button>

            <button
              onClick={() => window.history.back()}
              className={styles.backButton}
              disabled={loading}
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
