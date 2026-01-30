'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './donate.module.css';

type DonationType = 'supplies' | 'tools' | 'monetary';

export default function DonatePage() {
  const { t } = useTranslation();
  const [donationType, setDonationType] = useState<DonationType>('supplies');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [items, setItems] = useState('');
  const [toolName, setToolName] = useState('');
  const [toolCondition, setToolCondition] = useState('good');
  const [monetaryAmount, setMonetaryAmount] = useState('');
  const [taxDeductible, setTaxDeductible] = useState(true);
  const [pickupRequired, setPickupRequired] = useState(false);
  const [pickupNotes, setPickupNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!donorName || !donorEmail || !donorPhone) {
      setMessage(t('donate.fillRequired'));
      return;
    }

    setLoading(true);

    try {
      const payload: any = {
        donationType,
        donorName,
        donorEmail,
        donorPhone,
        donorAddress,
      };

      if (donationType === 'supplies') {
        payload.items = items ? [{ description: items, quantity: 1 }] : [];
      } else if (donationType === 'tools') {
        payload.toolDetails = {
          name: toolName,
          condition: toolCondition,
        };
      } else if (donationType === 'monetary') {
        payload.monetaryAmount = parseFloat(monetaryAmount);
        payload.taxDeductible = taxDeductible;
      }

      if (pickupRequired) {
        payload.pickupRequired = true;
        payload.pickupNotes = pickupNotes;
      }

      // Save to localStorage instead of sending to backend
      const donations = JSON.parse(localStorage.getItem('donations') || '[]');
      donations.push({
        ...payload,
        id: `donation_${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('donations', JSON.stringify(donations));

      // Show success message
      setMessage(t('donate.successMessage'));
      // Reset form
      setDonorName('');
      setDonorEmail('');
      setDonorPhone('');
      setDonorAddress('');
      setItems('');
      setToolName('');
      setMonetaryAmount('');
      setTimeout(() => setMessage(''), 6000);
    } catch (error) {
      setMessage(t('donate.errorMessage'));
      console.error('Donation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          {t('donate.heading').split(' ').slice(0, 2).join(' ')}
          <br />
          {t('donate.heading').split(' ').slice(2).join(' ')}
        </h1>
        <p className={styles.subtitle}>
          {t('donate.subtitle')}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Donor Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('donate.yourInfo')}</h2>
            <div className={styles.grid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('donate.name')} *</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t('donate.email')} *</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t('donate.phone')} *</label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t('donate.address')}</label>
                <input
                  type="text"
                  value={donorAddress}
                  onChange={(e) => setDonorAddress(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Donation Type Selection */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('donate.donationType')}</h2>

            <div className={styles.radioGroup}>
              {/* Supplies */}
              <label className={styles.radioOption} style={{ borderColor: donationType === 'supplies' ? '#666' : '' }}>
                <input
                  type="radio"
                  name="donationType"
                  value="supplies"
                  checked={donationType === 'supplies'}
                  onChange={() => setDonationType('supplies')}
                  style={{ marginTop: '0.25rem', marginRight: '0.75rem' }}
                />
                <div>
                  <h3 className={styles.radioLabel}>{t('donate.supplies')}</h3>
                  <p className={styles.radioDescription}>
                    {t('donate.suppliesDesc')}
                  </p>
                </div>
              </label>

              {donationType === 'supplies' && (
                <div className={styles.nestedFormSection}>
                  <label className={styles.label}>{t('donate.whatDonating')}</label>
                  <textarea
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                    className={styles.textarea}
                    rows={3}
                    placeholder={t('donate.suppliesPlaceholder')}
                  />
                </div>
              )}

              {/* Tools */}
              <label className={styles.radioOption} style={{ borderColor: donationType === 'tools' ? '#666' : '' }}>
                <input
                  type="radio"
                  name="donationType"
                  value="tools"
                  checked={donationType === 'tools'}
                  onChange={() => setDonationType('tools')}
                  style={{ marginTop: '0.25rem', marginRight: '0.75rem' }}
                />
                <div>
                  <h3 className={styles.radioLabel}>{t('donate.tools')}</h3>
                  <p className={styles.radioDescription}>
                    {t('donate.toolsDesc')}
                  </p>
                </div>
              </label>

              {donationType === 'tools' && (
                <div className={styles.nestedFormSection}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t('donate.toolName')}</label>
                    <input
                      type="text"
                      value={toolName}
                      onChange={(e) => setToolName(e.target.value)}
                      className={styles.input}
                      placeholder={t('donate.toolPlaceholder')}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t('donate.condition')}</label>
                    <select
                      value={toolCondition}
                      onChange={(e) => setToolCondition(e.target.value)}
                      className={styles.select}
                    >
                      <option value="excellent">{t('donate.excellent')}</option>
                      <option value="good">{t('donate.good')}</option>
                      <option value="fair">{t('donate.fair')}</option>
                      <option value="poor">{t('donate.poor')}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Monetary */}
              <label className={styles.radioOption} style={{ borderColor: donationType === 'monetary' ? '#666' : '' }}>
                <input
                  type="radio"
                  name="donationType"
                  value="monetary"
                  checked={donationType === 'monetary'}
                  onChange={() => setDonationType('monetary')}
                  style={{ marginTop: '0.25rem', marginRight: '0.75rem' }}
                />
                <div>
                  <h3 className={styles.radioLabel}>{t('donate.monetary')}</h3>
                  <p className={styles.radioDescription}>
                    {t('donate.monetaryDesc')}
                  </p>
                </div>
              </label>

              {donationType === 'monetary' && (
                <div className={styles.nestedFormSection}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t('donate.amount')}</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={monetaryAmount}
                      onChange={(e) => setMonetaryAmount(e.target.value)}
                      className={styles.input}
                      placeholder="0.00"
                    />
                  </div>
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={taxDeductible}
                      onChange={(e) => setTaxDeductible(e.target.checked)}
                    />
                    <span>{t('donate.taxDeductible')}</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Pickup Options */}
          {donationType !== 'monetary' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('donate.delivery')}</h2>

              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={pickupRequired}
                  onChange={(e) => setPickupRequired(e.target.checked)}
                />
                <span>{t('donate.pickupService')}</span>
              </label>

              {pickupRequired && (
                <textarea
                  value={pickupNotes}
                  onChange={(e) => setPickupNotes(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                  placeholder={t('donate.pickupNotes')}
                  style={{ marginTop: '1rem' }}
                />
              )}
            </div>
          )}

          {/* Message */}
          {message && (
            <div className={message.includes('✅') ? styles.messageSuccess : styles.messageError}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? t('donate.processing') : t('donate.submit')}
          </button>
        </form>

        {/* Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '3rem' }}>
          <div className={styles.infoBox} style={{ borderLeftColor: '#2563eb' }}>
            <h3 className={styles.infoTitle}>{t('donate.whyDonate')}</h3>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li className={styles.infoText}>{t('donate.reason1')}</li>
              <li className={styles.infoText}>{t('donate.reason2')}</li>
              <li className={styles.infoText}>{t('donate.reason3')}</li>
              <li className={styles.infoText}>{t('donate.reason4')}</li>
            </ul>
          </div>

          <div className={styles.infoBox} style={{ borderLeftColor: '#22c55e' }}>
            <h3 className={styles.infoTitle}>{t('donate.questions')}</h3>
            <p className={styles.infoText} style={{ marginTop: '0.5rem' }}>
              {t('donate.contactDonate')}
            </p>
            <p className={styles.infoText} style={{ marginTop: '0.5rem' }}>
              {t('donate.happy')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
