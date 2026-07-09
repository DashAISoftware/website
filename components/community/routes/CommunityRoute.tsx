'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
export function CommunityRoute() {
  const { t, i18n } = useTranslation('community')
  const th = (key: string) => ({ __html: t(key) })

  return (
    <main data-route="community">
      <section className="dl-hero">
        <svg className="wm wm-cr" style={{ top: '15%', width: '220px', right: '-40px' }} viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap">
          <div className="eyebrow"><span className="num">[ /community ]</span></div>
          <h2 style={{ margin: '16px 0' }}>{t('com.h')}</h2>
          <p className="lead">{t('com.lead')}</p>

          <div className="community-grid">
            <div style={{
              background: 'var(--bg)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-lg)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div className="mono" style={{ display: 'inline-block', fontSize: '11px', color: 'var(--ink-3)' }}>DISCORD</div>
              <h3 style={{ margin: '14px 0 10px', color: 'var(--ink)' }}>{t('com.d.h')}</h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.5' }}>{t('com.d.p')}</p>
              <div style={{ flex: 1 }} />
              <a className="btn btn--sm" style={{ marginTop: '18px', alignSelf: 'flex-start' }} href="https://discord.gg/CQVqMBjeWP" target="_blank" rel="noopener">
                <span>{t('com.d.cta')}</span> →
              </a>
            </div>

            <div style={{
              background: 'var(--bg)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-lg)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div className="mono" style={{ display: 'inline-block', fontSize: '11px', color: 'var(--ink-3)' }}>GOOGLE GROUP</div>
              <h3 style={{ margin: '14px 0 10px', color: 'var(--ink)' }}>{t('com.n.h')}</h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.5' }}>{t('com.n.p')}</p>
              <div style={{ flex: 1 }} />
              <a className="btn btn--sm" style={{ marginTop: '18px', alignSelf: 'flex-start' }} href="https://groups.google.com/g/dashai-updates" target="_blank" rel="noopener">
                <span>{t('com.n.cta')}</span> →
              </a>
            </div>

            <div style={{
              background: 'var(--bg)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-lg)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div className="mono" style={{ display: 'inline-block', fontSize: '11px', color: 'var(--ink-3)' }}>EMAIL</div>
              <h3 style={{ margin: '14px 0 10px', color: 'var(--ink)' }}>{t('com.e.h')}</h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.5' }}>{t('com.e.p')}</p>
              <a className="mono" style={{ display: 'block', marginTop: '14px', fontSize: '13px', color: 'var(--brand-on)' }} href="mailto:contacto@dash-ai.com">
                contacto@dash-ai.com
              </a>
              <div style={{ flex: 1 }} />
              <a className="btn btn--sm" style={{ marginTop: '18px', alignSelf: 'flex-start' }} href="mailto:contacto@dash-ai.com">
                <span>{t('com.e.cta')}</span> →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
