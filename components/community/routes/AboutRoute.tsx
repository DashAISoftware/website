'use client'

import { useTranslation } from 'react-i18next'
import { InstitutionsGrid } from '../InstitutionsGrid'
import '@/app/i18n'
export function AboutRoute() {
  const { t, i18n } = useTranslation('about')
  const th = (key: string) => ({ __html: t(key) })

  return (
    <main data-route="about">
      <div className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <svg className="wm wm-tr" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow"><span className="num">[ /about ]</span></div>
          <h2 style={{ margin: '16px 0' }}>{t('abt.h')}</h2>
          <p className="lead">{t('abt.lead')}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr .9fr', gap: '32px', marginTop: '32px' }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-lg)',
              padding: '28px',
            }}>
              <h3 style={{ marginBottom: '14px', color: 'var(--ink)' }}>{t('abt.m.h')}</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.55' }}>{t('abt.m.p')}</p>
              <h3 style={{ margin: '24px 0 14px', color: 'var(--ink)' }}>{t('abt.v.h2')}</h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.55' }}>{t('abt.v.p2')}</p>
            </div>
            <div style={{
              background: 'var(--ink-bg)',
              color: 'var(--ink-text)',
              borderRadius: 'var(--r-lg)',
              padding: '28px',
            }}>
              <h3 style={{ marginBottom: '14px', color: 'var(--ink-text)' }}>{t('abt.v.h')}</h3>
              <p
                style={{ fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--ink-text-2)', lineHeight: '1.7' }}
                dangerouslySetInnerHTML={th('abt.v.p')}
              />
            </div>
          </div>

          {/* Sub-section: Community */}
          <section className="abt-sub" style={{ position: 'relative', overflow: 'hidden' }}>
            <svg className="wm wm-tr wm-sm" viewBox="0 0 218.96 237.04" aria-hidden="true">
              <use href="#dashai-mark" />
            </svg>
            <div className="ey">
              <span className="num">[ /about/community ]</span>
              {' '}&nbsp;{' '}
              <span>{t('abt.com.ey')}</span>
            </div>
            <h2 dangerouslySetInnerHTML={th('abt.com.h')} />
            <p className="lead" dangerouslySetInnerHTML={th('abt.com.lead')} />

            <div className="comm-stats">
              <div className="comm-stat brand">
                <div className="lbl">{t('abt.com.s1.l')}</div>
                <div className="val">{t('abt.com.s1.v')}</div>
              </div>
              <div className="comm-stat">
                <div className="lbl">{t('abt.com.s2.l')}</div>
                <div className="val">{t('abt.com.s2.v')}</div>
              </div>
              <div className="comm-stat">
                <div className="lbl">{t('abt.com.s3.l')}</div>
                <div className="val">{t('abt.com.s3.v')}</div>
              </div>
              <div className="comm-stat">
                <div className="lbl">{t('abt.com.s4.l')}</div>
                <div className="val">{t('abt.com.s4.v')}</div>
              </div>
            </div>
          </section>

          {/* Sub-section: Institutions */}
          <section className="abt-sub">
            <div className="ey">
              <span className="num">[ /about/institutions ]</span>
              {' '}&nbsp;{' '}
              <span>{t('abt.inst.ey')}</span>
            </div>
            <h2 dangerouslySetInnerHTML={th('abt.inst.h')} />
            <p className="lead">{t('abt.inst.lead')}</p>

            <InstitutionsGrid />
          </section>

          {/* Sub-section: History */}
          <section className="abt-sub" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="ey">
              <span className="num">[ /about/history ]</span>
              {' '}&nbsp;{' '}
              <span>{t('abt.hist.ey')}</span>
            </div>
            <h2 dangerouslySetInnerHTML={th('abt.hist.h')} />
            <p className="lead">{t('abt.hist.lead')}</p>

            <div className="team-grid">
              <div className="team-card">
                <h3>{t('abt.hist.alum.h')}</h3>
                <p>{t('abt.hist.alum.p')}</p>
                <a
                  href="https://github.com/DashAISoftware/dashAI/graphs/contributors"
                  target="_blank"
                  rel="noopener"
                  style={{ fontSize: '13px', color: 'var(--brand-on)', fontWeight: 500 }}
                >
                  contributors graph →
                </a>
              </div>

              <div className="team-card">
                <h3>{t('abt.hist.inst.h')}</h3>
                <p>{t('abt.hist.inst.p')}</p>
                <ul>
                  <li>
                    <span className="avatar"><img src="/supported-by/utfsm-logo.png" alt="USM" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} /></span>
                    <div className="meta">
                      <strong>{t('abt.hist.inst.usm.n')}</strong>
                      <span>{t('abt.hist.inst.usm.r')}</span>
                    </div>
                  </li>
                  <li>
                    <span className="avatar"><img src="/supported-by/imfd-logo.png" alt="IMFD" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} /></span>
                    <div className="meta">
                      <strong>{t('abt.hist.inst.imfd.n')}</strong>
                      <span>{t('abt.hist.inst.imfd.r')}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div style={{
              marginTop: '32px',
              background: 'var(--ink-bg)',
              color: 'var(--ink-text)',
              borderRadius: 'var(--r-lg)',
              padding: '28px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '24px',
              alignItems: 'center',
            }}>
              <div>
                <h4 style={{ fontSize: '16px', color: 'var(--ink-text)', marginBottom: '8px' }}>{t('abt.hist.cta.h')}</h4>
                <p style={{ fontSize: '14px', color: 'var(--ink-text-2)', lineHeight: '1.55' }}>{t('abt.hist.cta.p')}</p>
              </div>
              <a className="btn btn--blue" href="mailto:dashai.nocode@gmail.com">
                <span>{t('abt.hist.cta.b')}</span> →
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
