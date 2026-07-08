'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InstitutionsGrid } from '../InstitutionsGrid'
import { StudentsGrid } from '../StudentsGrid'
import { TeamGrid } from '../TeamGrid'
import { getAcknowledgmentsText } from '@/lib/institutions'
import { getLatestRelease } from '@/lib/github'
import '@/app/i18n'
export function AboutRoute() {
  const { t, i18n } = useTranslation('about')
  const th = (key: string, options?: Record<string, string>) => ({ __html: t(key, options) })
  const lang = i18n.language?.startsWith('es')
    ? 'es'
    : i18n.language?.startsWith('pt')
      ? 'pt'
      : 'en'
  const acknowledgment = getAcknowledgmentsText(lang)

  const [version, setVersion] = useState('0.9.6')

  useEffect(() => {
    getLatestRelease().then((release) => {
      if (!release) return
      setVersion(release.tag_name.replace(/^v/, ''))
    })
  }, [])

  return (
    <main data-route="about">
      <div className="abt-hero">
        <svg className="wm wm-tr" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow"><span className="num">[ /about ]</span></div>
          <h2 style={{ margin: '16px 0' }}>{t('abt.h')}</h2>
          <p className="lead">{t('abt.lead')}</p>

          <div className="abt-mission-grid">
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
                dangerouslySetInnerHTML={th('abt.v.p', { version })}
              />
            </div>
          </div>

          {/* Sub-section: Community */}
          <section className="abt-sub" style={{ position: 'relative', overflow: 'hidden' }}>
            <svg className="wm wm-tr wm-sm" viewBox="0 0 218.96 237.04" aria-hidden="true">
              <use href="#dashai-mark" />
            </svg>
            <div className="ey">
              <span className="num">[ /about/institutions ]</span>
              {' '}&nbsp;{' '}
              <span>{t('abt.inst.ey')}</span>
            </div>
            <h2 dangerouslySetInnerHTML={th('abt.inst.h')} />
            <p className="lead">{acknowledgment}</p>

            <InstitutionsGrid />
          </section>

          {/* Sub-section: Team */}
          <section className="abt-sub" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="ey">
              <span className="num">[ /about/team ]</span>
              {' '}&nbsp;{' '}
              <span>{t('abt.team.ey')}</span>
            </div>
            <h2 dangerouslySetInnerHTML={th('abt.team.h')} />
            <p className="lead">{t('abt.team.lead')}</p>

            <TeamGrid />
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

            <StudentsGrid />

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
              <a className="btn btn--blue" href="mailto:contacto@dash-ai.com">
                <span>{t('abt.hist.cta.b')}</span> →
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
