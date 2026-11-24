'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import type { LabFile } from '@/data/labs'
import { fileHref, formatMetric, formatSize, getLab, otherLabs, sessionFile } from '@/lib/labs'
import { LabCard } from '@/components/community/LabCard'

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

  const fileLabel = (f: LabFile) => (f.kind === 'lab' ? t('labs.detail.dl.lab') : f.name)
  const fileSize = (f: LabFile) => (f.kind === 'lab' ? `HTML, ${formatSize(f.bytes, lang)}` : formatSize(f.bytes, lang))

  return (
    <main data-route="labs" className="lb-detail">
      <section className="lb-detail-head">
        <div className="wrap">
          <nav className="lb-crumb" aria-label="Breadcrumb">
            <a href="#labs">{t('labs.detail.crumb')}</a>
            <span aria-hidden="true">/</span>
            <span>{t(`${p}.code`)}</span>
          </nav>
          <h1>{t(`${p}.title`)}</h1>
          <p className="lead lb-intro">{t(`${p}.intro`)}</p>
          <div className="lb-tags lb-detail-tags">
            <span className="tag lb-level">{t('labs.level', { n: lab.level })}: {t(`labs.levelName.${lab.level}`)}</span>
            {lab.minutes && <span className="tag">{t('labs.minutes', { from: lab.minutes[0], to: lab.minutes[1] })}</span>}
            {lab.tasks.map(task => <span key={task} className="tag">{task}</span>)}
            <span className="tag">{t(`${p}.langs`)}</span>
          </div>
        </div>
      </section>

      <div className="wrap lb-detail-grid">
        <div className="lb-detail-main">
          <section>
            <h2 className="lb-h3">{t('labs.detail.learn.h')}</h2>
            <ul className="lb-learn">
              {range(lab.learnCount).map(i => <li key={i}>{t(`${p}.learn.${i}`)}</li>)}
            </ul>
          </section>

          {lab.models && (
            <section>
              <h2 className="lb-h3">{t('labs.detail.session.h')}</h2>
              <p className="lb-p">{t(`${p}.session`)}</p>
              <div className="lb-table-wrap">
                <table className="lb-table">
                  <thead>
                    <tr>
                      <th scope="col">{t('labs.detail.th.model')}</th>
                      <th scope="col">{t('labs.detail.th.recall')}</th>
                      <th scope="col">{t('labs.detail.th.f1')}</th>
                      <th scope="col">{t('labs.detail.th.auc')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lab.models.map(m => (
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
              <p className="lb-note">{t(`${p}.sessionNote`)}</p>
            </section>
          )}

          <section>
            <h2 className="lb-h3">{t('labs.detail.modules.h', { n: lab.moduleCount })}</h2>
            <ol className="lb-modules">
              {range(lab.moduleCount).map(i => (
                <li key={i}><span className="lb-mod-n">{String(i).padStart(2, '0')}</span>{t(`${p}.module.${i}`)}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="lb-h3">{t('labs.detail.others.h')}</h2>
            <div className="lb-others">
              {otherLabs(slug).map(o => <LabCard key={o.slug} lab={o} />)}
            </div>
          </section>
        </div>

        <aside className="lb-detail-side">
          {lab.files.length > 0 && (
            <div className="lb-panel">
              <h2 className="lb-h4">{t('labs.detail.dl.h')}</h2>
              <ul className="lb-dl">
                {lab.files.map(f => {
                  const href = fileHref(f)
                  const cls = `lb-dl-row${f.kind === 'lab' ? ' is-primary' : ''}`
                  const body = (
                    <>
                      <span className="lb-dl-name">{fileLabel(f)}</span>
                      <span className="lb-dl-size">{href ? fileSize(f) : t('labs.detail.dl.pending')}</span>
                    </>
                  )
                  return (
                    <li key={f.name}>
                      {href ? (
                        f.kind === 'lab'
                          ? <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{body}</a>
                          : <a className={cls} href={href} download>{body}</a>
                      ) : (
                        <span className={`${cls} is-disabled`} aria-disabled="true">{body}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
              <p className="lb-note">{t('labs.detail.dl.synthetic')}</p>
            </div>
          )}

          {session && (
            <div className="lb-panel">
              <h2 className="lb-h4">{t('labs.detail.import.h')}</h2>
              <ol className="lb-import">
                <li>{t('labs.detail.import.step.1', { version })}</li>
                <li>{t('labs.detail.import.step.2')}</li>
                <li dangerouslySetInnerHTML={html('labs.detail.import.step.3', { file: session.name })} />
                <li dangerouslySetInnerHTML={html(`${p}.importOpen`)} />
              </ol>
              <p className="lb-note">{t('labs.detail.import.note')}</p>
              <p className="lb-alert">{t('labs.detail.import.warn')}</p>
            </div>
          )}

          <div className="lb-panel">
            <h2 className="lb-h4">{t('labs.detail.teach.h')}</h2>
            <p className="lb-side-p">{t(`${p}.teach`)}</p>
          </div>

          <div className="lb-panel lb-panel--tint">
            <h2 className="lb-h4">{t('labs.detail.req.h')}</h2>
            <p className="lb-side-p">{t(`${p}.req`)}</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
