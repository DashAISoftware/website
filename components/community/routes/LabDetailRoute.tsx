'use client'

import type { ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import '@/app/i18n'
import { AppLink } from '@/components/community/AppLink'
import type { LabFile } from '@/data/labs'
import { fileHref, formatMetric, formatSize, getLab, sessionFile } from '@/lib/labs'

// Icon per kind of file in the downloads card.
const FILE_ICONS: Record<LabFile['kind'], ReactNode> = {
  lab: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4" />,
  session: <path d="M10 3v6.5L4.7 18.4A1.7 1.7 0 0 0 6.1 21h11.8a1.7 1.7 0 0 0 1.4-2.6L14 9.5V3M8.5 3h7M7.5 15h9" />,
  dataset: <path d="M4 5h16v14H4zM4 10h16M4 15h16M10 5v14" />,
}

const range = (n = 0) => Array.from({ length: n }, (_, i) => i + 1)

// One template for every lab page (#labs/<slug>): everything comes from
// data/labs.ts and the `labs.item.<slug>.*` texts.
export function LabDetailRoute({ slug }: { slug: string }) {
  const { t, i18n } = useTranslation('labs')
  const lang = i18n.language
  const lab = getLab(slug)
  if (!lab) return null

  const p = `labs.item.${slug}`
  const html = (key: string, opts?: Record<string, unknown>) => ({ __html: t(key, opts) })
  const session = sessionFile(lab)
  const version = lab.minVersion ?? ''
  const labFile = fileHref(lab.files.find((f) => f.kind === 'lab'))
  // The lab HTML opens from the header button; the card lists the files for dashAI.
  const downloads = lab.files.filter((f) => f.kind !== 'lab')

  // A file can have its own name (`labs.item.<slug>.file.<base name>`); otherwise its kind.
  const fileLabel = (f: LabFile) => {
    const key = `${p}.file.${f.name.replace(/\.[^.]+$/, '')}`
    return i18n.exists(key, { ns: 'labs' }) ? t(key) : t(`labs.detail.dl.kind.${f.kind}`)
  }

  return (
    <main data-route="labs">
      <section className="pg-top" aria-labelledby="lab-title">
        <svg className="hm-hero-mark" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="pg-top-inner">
          <div className="pg-top-copy">
            <nav className="lab-crumb" aria-label={t('labs.detail.crumbLabel')}>
              <AppLink href="/labs">{t('labs.detail.crumb')}</AppLink> / {t(`${p}.code`)}
            </nav>
            <h1 id="lab-title">
              {t(`${p}.title`)}
            </h1>
            <p>{t(`${p}.intro`)}</p>
            {lab.minutes && (
              <p className="lab-meta">{t('labs.minutes', { from: lab.minutes[0], to: lab.minutes[1] })}</p>
            )}
            {labFile && (
              <a className="hm-btn hm-btn--solid lab-open" href={labFile} target="_blank" rel="noopener noreferrer">
                {t('labs.detail.learn.open')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            )}
          </div>

          {downloads.length > 0 && (
            <aside className="dl-card2 lab-dl" aria-labelledby="lab-dl-h">
              <h2 id="lab-dl-h">{t('labs.detail.dl.h')}</h2>
              <p>{t('labs.detail.dl.p')}</p>
              <div className="dl-os-list">
                {downloads.map((f) => {
                  const href = fileHref(f)
                  const ext = f.name.slice(f.name.lastIndexOf('.'))
                  const body = (
                    <>
                      <svg className="dl-os-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {FILE_ICONS[f.kind]}
                      </svg>
                      <span className="dl-os-name">{fileLabel(f)}</span>
                      <span className="dl-os-meta">
                        {href ? <>{ext} {formatSize(f.bytes, lang)}</> : t('labs.detail.dl.pending')}
                        {href && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                          </svg>
                        )}
                      </span>
                    </>
                  )
                  const cls = `dl-os${f.kind === 'session' ? ' dl-os--primary' : ''}`
                  if (!href) return <span key={f.name} className={`${cls} is-disabled`} aria-disabled="true">{body}</span>
                  return <a key={f.name} className={cls} href={href} download>{body}</a>
                })}
              </div>
            </aside>
          )}
        </div>
      </section>

      <div className="pg-body">
        <section className="hm-sec hm-sec--first" aria-labelledby="lab-learn">
          <h2 id="lab-learn" className="hm-h2">{t('labs.detail.learn.h')}</h2>
          <p className="hm-p">{t('labs.detail.learn.p')}</p>
          <ul className="lab-learn">
            {range(lab.learnCount).map((i) => <li key={i}>{t(`${p}.learn.${i}`)}</li>)}
          </ul>
        </section>

        {session && (
          <section className="hm-sec" aria-labelledby="lab-import">
            <h2 id="lab-import" className="hm-h2">{t('labs.detail.import.h')}</h2>
            <ol className="lab-steps">
              <li><span className="lab-step-n">1</span><p>{t('labs.detail.import.step.1', { version })}</p></li>
              <li>
                <span className="lab-step-n">2</span>
                <p>
                  <Trans
                    t={t}
                    i18nKey="labs.detail.import.step.2"
                    components={{
                      icon: (
                        <svg className="lab-app-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                          <path d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z" />
                        </svg>
                      ),
                    }}
                  />
                </p>
              </li>
              <li><span className="lab-step-n">3</span><p dangerouslySetInnerHTML={html('labs.detail.import.step.3', { file: session.name })} /></li>
              <li><span className="lab-step-n">4</span><p dangerouslySetInnerHTML={html(`${p}.importOpen`)} /></li>
            </ol>
          </section>
        )}

        {lab.models && (
          <section className="hm-sec hm-sec--last" aria-labelledby="lab-session">
            <h2 id="lab-session" className="hm-h2">{t('labs.detail.session.h')}</h2>
            <p className="hm-p hm-muted">{t(`${p}.session`)}</p>
            <div className="dl-table-wrap">
              <table className="lab-table">
                <thead>
                  <tr>
                    <th scope="col">{t('labs.detail.th.model')}</th>
                    <th scope="col">{t('labs.detail.th.recall')}</th>
                    <th scope="col">{t('labs.detail.th.f1')}</th>
                    <th scope="col">{t('labs.detail.th.auc')}</th>
                  </tr>
                </thead>
                <tbody>
                  {lab.models.map((m) => (
                    <tr key={m.key} className={m.highlight ? 'is-best' : undefined}>
                      <th scope="row">{t(`${p}.model.${m.key}`)}</th>
                      <td>{formatMetric(m.recall, lang)}</td>
                      <td>{formatMetric(m.f1, lang)}</td>
                      <td>{formatMetric(m.auc, lang)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="lab-note">{t(`${p}.sessionNote`)}</p>
          </section>
        )}
      </div>
    </main>
  )
}
