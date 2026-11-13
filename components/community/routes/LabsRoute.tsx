'use client'

import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { LABS, LAB_TASKS, type LabTask } from '@/data/labs'
import { filterLabs, formatSize, getLab, sessionFile } from '@/lib/labs'
import { LabCard } from '@/components/community/LabCard'

// The hero panel shows what's inside the reference session (the talk lab).
const SHOWCASE = getLab('tutorias')
const SHOWCASE_FILE = SHOWCASE && sessionFile(SHOWCASE)

const n4 = [1, 2, 3, 4]

// Section anchors can't use href="#..." (the hash is the page route), so scroll by id.
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function LabsRoute() {
  const { t, i18n } = useTranslation('labs')
  const th = (key: string) => ({ __html: t(key) })
  const lang = i18n.language

  const [task, setTask] = useState<'all' | LabTask>('all')
  const [query, setQuery] = useState('')

  const shown = useMemo(() => filterLabs(LABS, task, query, lab => {
    const p = `labs.item.${lab.slug}`
    return [t(`${p}.title`), t(`${p}.concepts`), t(`${p}.summary`)].join(' ')
  }), [task, query, t])

  const reset = () => { setTask('all'); setQuery('') }

  return (
    <main data-route="labs">

      <section className="vn-hero lb-hero">
        <svg className="wm wm-cr wm-lg" style={{ top: '12%' }} viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap lb-hero-grid">
          <div>
            <div className="eyebrow"><span className="num">[ {t('labs.bracket')} ]</span> <span>{t('labs.ey')}</span></div>
            <h1 dangerouslySetInnerHTML={th('labs.h')} />
            <p className="lead">{t('labs.lead')}</p>
            <div className="lb-hero-cta">
              <button type="button" className="btn btn--blue" onClick={() => scrollToId('labs-catalog')}>{t('labs.cta.view')}</button>
              <button type="button" className="btn" onClick={() => scrollToId('labs-file')}>{t('labs.cta.what')}</button>
            </div>
          </div>

          {SHOWCASE_FILE && (
            <aside className="lb-box">
              <p className="lb-box-h">{t('labs.box.h', { file: SHOWCASE_FILE.name, size: formatSize(SHOWCASE_FILE.bytes, lang) })}</p>
              <dl>
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="lb-box-row">
                    <dt>{t(`labs.box.row.${i}.k`)}</dt>
                    <dd>{t(`labs.box.row.${i}.v`)}</dd>
                  </div>
                ))}
              </dl>
              <p className="lb-box-note">{t('labs.box.note')}</p>
            </aside>
          )}
        </div>
      </section>

      <section className="section lb-section">
        <div className="wrap">
          <div className="eyebrow">{t('labs.how.ey')}</div>
          <h2 className="lb-h2">{t('labs.how.h')}</h2>
          <ol className="lb-steps">
            {n4.map(i => (
              <li key={i}>
                <span className="lb-step-n">{i}</span>
                <h3>{t(`labs.how.step.${i}.t`)}</h3>
                <p>{t(`labs.how.step.${i}.d`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section lb-section" id="labs-catalog">
        <div className="wrap">
          <div className="lb-cat-head">
            <div>
              <div className="eyebrow">{t('labs.cat.ey')}</div>
              <h2 className="lb-h2">{t('labs.cat.h')}</h2>
              <p className="lb-count" aria-live="polite">{t('labs.cat.count', { count: shown.length })}</p>
            </div>
            <div className="lb-cat-tools">
              <label className="vn-search">
                <span className="sr-only">{t('labs.cat.search')}</span>
                <svg className="vn-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                  type="search"
                  placeholder={t('labs.cat.search')}
                  autoComplete="off"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </label>
              <div className="vn-chips">
                {(['all', ...LAB_TASKS] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    className={`vn-chip${task === f ? ' is-on' : ''}`}
                    aria-pressed={task === f}
                    onClick={() => setTask(f)}
                  >
                    {f === 'all' ? t('labs.cat.all') : f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {shown.length > 0 ? (
            <div className="lb-grid">
              {shown.map(lab => <LabCard key={lab.slug} lab={lab} />)}
            </div>
          ) : (
            <div className="vn-empty lb-empty">
              <p className="lb-empty-t">{t('labs.cat.empty.t')}</p>
              <p>{t('labs.cat.empty.d')}</p>
              <button type="button" className="btn btn--sm" onClick={reset}>{t('labs.cat.empty.reset')}</button>
            </div>
          )}
        </div>
      </section>

      <section className="section lb-section lb-section--tint" id="labs-file">
        <div className="wrap lb-file-grid">
          <div>
            <div className="eyebrow">{t('labs.file.ey')}</div>
            <h2 className="lb-h2">{t('labs.file.h')}</h2>
            <p className="lb-p">{t('labs.file.p1')}</p>
            <p className="lb-p">{t('labs.file.p2')}</p>
            <p className="lb-warn">{t('labs.file.warn')}</p>
          </div>
          <div className="lb-parts">
            {n4.map(i => (
              <div key={i} className="lb-part">
                <h3>{t(`labs.file.part.${i}.t`)}</h3>
                <p>{t(`labs.file.part.${i}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section lb-section">
        <div className="wrap">
          <div className="eyebrow">{t('labs.teach.ey')}</div>
          <h2 className="lb-h2">{t('labs.teach.h')}</h2>
          <p className="lead lb-lead">{t('labs.teach.lead')}</p>
          <div className="lb-teach">
            {[1, 2, 3].map(i => (
              <div key={i} className="lb-part">
                <h3>{t(`labs.teach.item.${i}.t`)}</h3>
                <p>{t(`labs.teach.item.${i}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
