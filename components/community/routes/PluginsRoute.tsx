'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
export function PluginsRoute() {
  const { t, i18n } = useTranslation('plugins')
  const th = (key: string) => ({ __html: t(key) })

  return (
    <main data-route="plugins">
      <section className="dl-hero">
        <svg className="wm wm-cr" style={{ top: '15%', width: '220px', right: '-40px' }} viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap">
          <div className="eyebrow"><span className="num">[ /plugins ]</span></div>
          <h2 style={{ margin: '16px 0' }}>{t('plg.h')}</h2>
          <p className="lead">{t('plg.lead')}</p>

          <div className="coming-soon">
            <div className="cs-badge">
              <span className="cs-dot" />
              <span>{t('plg.cs.badge')}</span>
            </div>
            <h2>{t('plg.cs.h')}</h2>
            <p className="cs-lead">{t('plg.cs.lead')}</p>

            <div className="cs-meta">
              <div className="cs-meta-item">
                <div className="cs-lbl">{t('plg.cs.m1.l')}</div>
                <div className="cs-val">{t('plg.cs.m1.v')}</div>
              </div>
              <div className="cs-meta-item">
                <div className="cs-lbl">{t('plg.cs.m2.l')}</div>
                <div className="cs-val">{t('plg.cs.m2.v')}</div>
              </div>
              <div className="cs-meta-item">
                <div className="cs-lbl">{t('plg.cs.m3.l')}</div>
                <div className="cs-val">{t('plg.cs.m3.v')}</div>
              </div>
            </div>

            <div className="cs-cta">
              <p dangerouslySetInnerHTML={th('plg.cs.cta.p')} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
