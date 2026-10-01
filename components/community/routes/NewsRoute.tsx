'use client'

import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { PRESS, FEATURED_PRESS_ID, type PressItem, type PressType } from '@/data/press'

const FILTERS: ('all' | PressType)[] = ['all', 'prensa', 'tv', 'radio', 'institucional']

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

// "2026-08-23" -> "23 AGO 2026"; "2026-08" (no day) -> "AGO 2026"
function formatDate(date: string, lang: string) {
  const [y, m, d] = date.split('-').map(Number)
  const opts: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric', timeZone: 'UTC' }
  if (d) opts.day = 'numeric'
  return new Intl.DateTimeFormat(lang, opts)
    .format(new Date(Date.UTC(y, m - 1, d || 1)))
    .replace('.', '')
    .toUpperCase()
}

const FEATURED = PRESS.find(p => p.id === FEATURED_PRESS_ID) as PressItem

// Headlines are translated, but the linked articles aren't: flag the article's
// language when it differs from the one the site is shown in.
function LangTag({ item, lang }: { item: PressItem; lang: string }) {
  const { t } = useTranslation('news')
  const articleLang = item.lang ?? 'es'
  if (lang.startsWith(articleLang)) return null
  return <span className="tag">{t(`news.lang.${articleLang}`)}</span>
}

export function NewsRoute() {
  const { t, i18n } = useTranslation('news')
  const th = (key: string) => ({ __html: t(key) })
  const lang = i18n.language

  const [filter, setFilter] = useState<'all' | PressType>('all')
  const [query, setQuery] = useState('')

  const q = norm(query.trim())
  const shown = useMemo(() => PRESS.filter(p =>
    (filter === 'all' || p.type === filter) &&
    (!q || norm([p.outlet, t(`news.item.${p.id}.headline`), t(`news.item.${p.id}.desc`)].join(' ')).includes(q)),
  ), [filter, q, t])

  return (
    <main data-route="news">

      <section className="vn-hero">
        <svg className="wm wm-cr wm-lg" style={{ top: '12%' }} viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap">
          <div className="eyebrow"><span className="num">[ {t('news.bracket')} ]</span> <span>{t('news.ey')}</span></div>
          <h1 dangerouslySetInnerHTML={th('news.h')} />
          <p className="lead">{t('news.lead')}</p>
        </div>
      </section>

      <section className="section" style={{ padding: '64px 0 48px' }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow"><span className="num">[ 01 ]</span> <span>{t('news.feat.ey')}</span></div>
              <h2 dangerouslySetInnerHTML={th('news.feat.h')} />
              <p className="lead">{t('news.feat.lead')}</p>
            </div>
          </div>

          <div className="press-feature">
            <div className="press-feature-copy">
              <div className="ey">{t('news.feat.card.ey')}</div>
              <h3>{t(`news.item.${FEATURED.id}.headline`)}</h3>
              <p>{t('news.feat.card.p')}</p>
              <div className="press-feature-meta">
                <span className={`tag ${FEATURED.type}`}>{t(`news.type.${FEATURED.type}`)}</span>
                <LangTag item={FEATURED} lang={lang} />
                <span className="press-outlet-date">{formatDate(FEATURED.date, lang)}</span>
                <a className="btn btn--sm" href={FEATURED.url} target="_blank" rel="noopener noreferrer">
                  {t('news.feat.card.cta')} <svg style={{ width: 13, height: 13 }}><use href="#i-arrow" /></svg>
                </a>
              </div>
            </div>
            <div className="press-quote">
              <blockquote>{t('news.feat.quote')}</blockquote>
              <cite><b>Susana Mondschein</b>{t('news.feat.quote.role')}</cite>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: '56px 0 72px' }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow"><span className="num">[ 02 ]</span> <span>{t('news.list.ey')}</span></div>
              <h2 dangerouslySetInnerHTML={th('news.list.h')} />
              <p className="lead">{t('news.list.lead')}</p>
            </div>
          </div>

          <div className="vn-tools" style={{ marginTop: 0, marginBottom: '28px' }}>
            <label className="vn-search">
              <span className="sr-only">{t('news.search.sr')}</span>
              <svg className="vn-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                type="search"
                placeholder={t('news.search.ph')}
                autoComplete="off"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </label>
            <div className="vn-chips">
              {FILTERS.map(f => (
                <button
                  key={f}
                  className={`vn-chip${filter === f ? ' is-on' : ''}`}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? t('news.filter.all') : t(`news.type.${f}`)}
                </button>
              ))}
            </div>
            <span className="vn-count">{t('news.count', { shown: shown.length, total: PRESS.length })}</span>
          </div>

          <div className="press-grid">
            {shown.map(p => (
              <a key={p.id} className="press-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <div className="press-outlet">
                  <span className={`press-mark ${p.type}`}>{p.mark}</span>
                  <span>
                    <span className="press-outlet-name">{p.outlet}</span>
                    <span className="press-outlet-date">{formatDate(p.date, lang)}</span>
                  </span>
                </div>
                <h3>{t(`news.item.${p.id}.headline`)}</h3>
                <p>{t(`news.item.${p.id}.desc`)}</p>
                <div className="press-card-foot">
                  <span className="press-tags">
                    <span className={`tag ${p.type}`}>{t(`news.type.${p.type}`)}</span>
                    <LangTag item={p} lang={lang} />
                  </span>
                  <span className="press-link">{t(`news.action.${p.action}`)} <svg><use href="#i-arrow" /></svg></span>
                </div>
              </a>
            ))}
          </div>

          <div className="vn-empty" hidden={shown.length !== 0}>{t('news.empty')}</div>
        </div>
      </section>

    </main>
  )
}
