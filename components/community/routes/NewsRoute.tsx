'use client'

import { useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import '@/app/i18n'
import { PRESS, FEATURED_PRESS_ID, type PressItem, type PressType } from '@/data/press'

const TYPES: PressType[] = ['prensa', 'tv', 'radio', 'institucional']

const FEATURED = PRESS.find((p) => p.id === FEATURED_PRESS_ID) as PressItem

// "2026-08-23" -> "23 ago 2026"; "2026-08" (no day) -> "ago 2026"
function formatDate(date: string, lang: string, month: 'short' | 'long' = 'short') {
  const [y, m, d] = date.split('-').map(Number)
  const opts: Intl.DateTimeFormatOptions = { month, year: 'numeric', timeZone: 'UTC' }
  if (d && month === 'short') opts.day = 'numeric'
  return new Intl.DateTimeFormat(lang, opts).format(new Date(Date.UTC(y, m - 1, d || 1))).replace('.', '')
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  )
}

export function NewsRoute() {
  const { t, i18n } = useTranslation('news')
  const lang = i18n.language
  const [filter, setFilter] = useState<'all' | PressType>('all')

  const shown = useMemo(() => PRESS.filter((p) => filter === 'all' || p.type === filter), [filter])
  const countOf = (f: 'all' | PressType) => (f === 'all' ? PRESS.length : PRESS.filter((p) => p.type === f).length)

  // PRESS is newest first.
  const from = formatDate(PRESS[PRESS.length - 1].date.slice(0, 7), lang, 'long')
  const to = formatDate(PRESS[0].date.slice(0, 7), lang, 'long')

  // Headlines are translated, but the linked articles aren't: flag the
  // article's language when it differs from the one the site is shown in.
  const langNote = (item: PressItem) => {
    const articleLang = item.lang ?? 'es'
    return lang.startsWith(articleLang) ? null : <span className="md-lang">{t(`news.lang.${articleLang}`)}</span>
  }

  return (
    <main data-route="news">
      <section className="pg-top" aria-labelledby="md-title">
        <svg className="hm-hero-mark" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="pg-top-inner">
          <div className="pg-top-copy">
            <h1 id="md-title">{t('news.h')}</h1>
            <p>
              {t('news.lead')} {t('news.range', { count: PRESS.length, from, to })}
            </p>
          </div>

          <figure className="md-quote">
            <blockquote>{t('news.feat.quote')}</blockquote>
            <figcaption>
              <strong>Susana Mondschein</strong>
              {t('news.feat.quote.role')}
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="pg-body">
        <section className="hm-sec hm-sec--first" aria-labelledby="md-feat">
          <h2 id="md-feat" className="hm-h2">{t('news.feat.h')}</h2>
          <p className="hm-p hm-muted">{t('news.feat.lead')}</p>
          <article className="md-feature">
            <figure className="md-feature-img">
              <img src="/images/media/lanzamiento-equipo.jpg" alt={t('news.feat.img.alt')} width={1400} height={700} loading="lazy" />
              <figcaption>{t('news.feat.img.credit')}</figcaption>
            </figure>
            <div className="md-feature-copy">
              <p className="md-feature-meta">
                {FEATURED.outlet}, {formatDate(FEATURED.date, lang)}
                {langNote(FEATURED)}
              </p>
              <h3>{t(`news.item.${FEATURED.id}.headline`)}</h3>
              <p>{t('news.feat.card.p')}</p>
              <a className="hm-btn hm-btn--solid" href={FEATURED.url} target="_blank" rel="noopener noreferrer">
                {t('news.feat.card.cta')}
                <Arrow />
              </a>
            </div>
          </article>
        </section>

        <section className="hm-sec hm-sec--last" aria-labelledby="md-list">
          <div className="lab-cat-head">
            <h2 id="md-list" className="hm-h2">{t('news.list.h')}</h2>
            <div className="pg-filters" role="group" aria-label={t('news.filter')}>
              {(['all', ...TYPES] as const).map((f) => (
                <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {t(`news.type.${f}`)} ({countOf(f)})
                </button>
              ))}
            </div>
          </div>

          <ul className="md-list">
            {shown.map((p) => (
              <li key={p.id}>
                <div className="md-src">
                  <span className="md-outlet">{p.outlet}</span>
                  <span className="md-date">{formatDate(p.date, lang)}</span>
                  <span className={`hm-tag md-tag md-tag--${p.type}`}>{t(`news.type.${p.type}`)}</span>
                </div>
                <div className="md-body">
                  <h3>
                    <a href={p.url} target="_blank" rel="noopener noreferrer">{t(`news.item.${p.id}.headline`)}</a>
                  </h3>
                  <p>{t(`news.item.${p.id}.desc`)}</p>
                  <a className="hm-more md-action" href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                    {t(`news.action.${p.action}`)}
                    <Arrow />
                  </a>
                  {langNote(p)}
                </div>
              </li>
            ))}
          </ul>

          <p className="md-contact">
            <Trans t={t} i18nKey="news.contact" components={{ anchor: <a className="dl-inline" href="mailto:contacto@dash-ai.com" /> }} />
          </p>
        </section>
      </div>
    </main>
  )
}
