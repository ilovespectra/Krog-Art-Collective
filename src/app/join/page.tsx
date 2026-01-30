'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './join.module.css';

export default function JoinPage() {
  const { t } = useTranslation();
  const artMediums = Array.isArray(t('join.mediums')) ? t('join.mediums') as string[] : [];
  const artTools = Array.isArray(t('join.tools')) ? t('join.tools') as string[] : [];
  
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(String(t('join.defaultMessage')));
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const toggleMedium = (medium: string) => {
    setSelectedMediums((prev) =>
      prev.includes(medium) ? prev.filter((m) => m !== medium) : [...prev, medium]
    );
  };

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname || !email || !phone) {
      setStatusMessage('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname,
          email,
          phone,
          mediums: selectedMediums,
          tools: selectedTools,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('✅ Thank you! We\'ll be in touch soon.');
        setNickname('');
        setEmail('');
        setPhone('');
        setSelectedMediums([]);
        setSelectedTools([]);
        setMessage(String(t('join.defaultMessage')));
        setTimeout(() => setStatusMessage(''), 5000);
      } else {
        setStatusMessage(`❌ ${data.error || 'Failed to submit. Please try again.'}`);
      }
    } catch (error) {
      setStatusMessage('❌ An error occurred. Please try again.');
      console.error('Join error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t('join.title')}</h1>
        <p className={styles.subtitle}>{t('join.subtitle')}</p>

        <div className={styles.info}>
          <p className={styles.infoText}>
            {t('join.membershipInfo')}
          </p>
        </div>

        {statusMessage && (
          <div
            className={`${styles.message} ${
              statusMessage.includes('✅') ? styles.messageSuccess : styles.messageError
            }`}
          >
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Contact Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('join.contactInfo')}</h2>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('join.nickname')} *
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('join.email')} *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('join.phone')} *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          {/* Art Mediums */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('join.mediumsInterested')}</h2>
            <div className={styles.checklistGrid}>
              {artMediums.map((medium) => (
                <label key={medium} className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    checked={selectedMediums.includes(medium)}
                    onChange={() => toggleMedium(medium)}
                  />
                  <span className={styles.checkboxLabel}>{medium}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tools Interested In */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('join.toolsInterested')}</h2>
            <div className={styles.checklistGrid}>
              {artTools.map((tool) => (
                <label key={tool} className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    checked={selectedTools.includes(tool)}
                    onChange={() => toggleTool(tool)}
                  />
                  <span className={styles.checkboxLabel}>{tool}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('join.message')}</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.textarea}
              rows={5}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Sending...' : t('join.submitButton')}
          </button>
        </form>
      </div>
    </div>
  );
}
