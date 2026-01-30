'use client';

import { useTranslation } from '@/hooks/useTranslation';
import styles from './tools.module.css';

export default function ToolsPage() {
  const { t } = useTranslation();
  
  // Get tools list from translations
  const artTools = t('tools.toolList') as string[];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔧</div>
          <h1 className={styles.title} style={{ marginBottom: '1rem' }}>
            {t('tools.coming_soon')}
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
            {t('tools.acquiring_tools')}
          </p>
          <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
            {t('tools.membership_access')}
          </p>
          
          {/* Tools List */}
          <div style={{ marginBottom: '2rem', textAlign: 'left', maxWidth: '600px', margin: '0 auto 2rem' }}>
            <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#333', marginBottom: '1rem' }}>
              {t('tools.tools_we_seek')}
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {artTools.map((tool) => (
                <li key={tool} style={{ fontSize: '1rem', color: '#666', padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0 }}>•</span>
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <p style={{ fontSize: '1rem', color: '#999' }}>
            {t('tools.join_community')} <a href="/join" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 600 }}>{t('tools.joinLink')}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

