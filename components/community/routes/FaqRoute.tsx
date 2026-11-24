'use client'

import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { useActiveSection } from '@/components/community/useActiveSection'

type Category = { id: string; count: number }

// The i18n keys follow `faq.<id>.<n>.q` / `faq.<id>.<n>.a`, one per question.
const CATEGORIES: Category[] = [
  { id: 'general',   count: 5 },
  { id: 'install',   count: 7 },
  { id: 'privacy',   count: 4 },
  { id: 'use',       count: 5 },
  { id: 'extend',    count: 4 },
  { id: 'community', count: 3 },
]

// The "unsigned installer" answer carries step-by-step blocks per OS.
const OS_STEPS_ITEM = 'install.3'
const MAC_STEPS = 5
const WIN_STEPS = 3

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1)
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const stripTags = (s: string) => s.replace(/<[^>]+>/g, ' ')

function Chevron() {
  return (
    <svg className="fq-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function FaqRoute() {
  const { t, i18n } = useTranslation('faq')
  const th = (key: string) => ({ __html: t(key) })
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Set<string>>(new Set())
  const { active, jumpTo } = useActiveSection(CATEGORIES.map((c) => c.id), 'faq-')

  // Searchable text per question: question, answer and its category header,
  // so searching "privacidad" also finds every question in that block.
  const haystack = useMemo(() => {
    const map = new Map<string, string>()
    for (const cat of CATEGORIES) {
      const head = [t(`faq.${cat.id}.nav`), t(`faq.${cat.id}.p`)].join(' ')
      for (const n of range(cat.count)) {
        const id = `${cat.id}.${n}`
        const parts = [t(`faq.${id}.q`), t(`faq.${id}.a`), head]
        if (id === OS_STEPS_ITEM) {
          range(MAC_STEPS).forEach((s) => parts.push(t(`faq.${id}.mac.${s}`)))
          range(WIN_STEPS).forEach((s) => parts.push(t(`faq.${id}.win.${s}`)))
          parts.push(t(`faq.${id}.mac.tip`), t(`faq.${id}.win.tip`), t(`faq.${id}.note`))
        }
        map.set(id, norm(stripTags(parts.join(' '))))
      }
    }
    return map
  }, [t, i18n.language])

  const q = norm(query.trim())
  const visible = useMemo(
    () => new Set([...haystack].filter(([, text]) => !q || text.includes(q)).map(([id]) => id)),
    [haystack, q],
  )
  const shownIn = (cat: Category) => range(cat.count).filter((n) => visible.has(`${cat.id}.${n}`)).length

  function handleSearch(value: string) {
    setQuery(value)
    const nq = norm(value.trim())
    // Matches open up while searching; clearing the search collapses everything.
    setOpen(nq ? new Set([...haystack].filter(([, text]) => text.includes(nq)).map(([id]) => id)) : new Set())
  }

  function handleItemToggle(id: string, isOpen: boolean) {
    setOpen((prev) => {
      if (prev.has(id) === isOpen) return prev
      const next = new Set(prev)
      if (isOpen) next.add(id)
      else next.delete(id)
      return next
    })
  }

  return (
    <main data-route="faq">
      <section className="pg-top" aria-labelledby="fq-title">
        <svg className="hm-hero-mark" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="pg-top-inner">
          <div className="pg-top-copy">
            <h1 id="fq-title">{t('faq.h')}</h1>
            <p>{t('faq.lead')}</p>
          </div>
        </div>
      </section>

      <div className="pg-body">
        <div className="pg-layout">
        <nav className="pg-index" aria-label={t('faq.toc')}>
          <ul>
            {CATEGORIES.map((cat) => {
              const n = shownIn(cat)
              return (
                <li key={cat.id}>
                  <a
                    href={`#faq-${cat.id}`}
                    aria-disabled={n === 0 || undefined}
                    aria-current={active === cat.id ? 'location' : undefined}
                    onClick={(e) => (n === 0 ? e.preventDefault() : jumpTo(e, cat.id))}
                  >
                    {t(`faq.${cat.id}.nav`)}
                    <span className="pg-index-n">{n}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="pg-main">
        <div className="fq-tools">
          <label className="vn-search">
            <span className="sr-only">{t('faq.search.sr')}</span>
            <svg className="vn-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder={t('faq.search.ph')}
              autoComplete="off"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </label>
          <p className="fq-count" aria-live="polite">
            {q ? t('faq.count', { shown: visible.size, total: haystack.size }) : ''}
          </p>
        </div>

        {CATEGORIES.map((cat, i) => (
          <section
            key={cat.id}
            id={`faq-${cat.id}`}
            hidden={shownIn(cat) === 0}
            className={`fq-sec${i === 0 ? ' fq-sec--first' : ''}`}
            aria-labelledby={`faq-${cat.id}-h`}
          >
            <h2 id={`faq-${cat.id}-h`} className="hm-h2">{t(`faq.${cat.id}.nav`)}</h2>
            <p className="fq-sub">{t(`faq.${cat.id}.p`)}</p>
            <div className="fq-list">
              {range(cat.count).map((n) => {
                const id = `${cat.id}.${n}`
                return (
                  <details
                    key={id}
                    className="fq-item"
                    hidden={!visible.has(id)}
                    open={open.has(id)}
                    onToggle={(e) => handleItemToggle(id, e.currentTarget.open)}
                  >
                    <summary>
                      <span>{t(`faq.${id}.q`)}</span>
                      <Chevron />
                    </summary>
                    <div className="fq-a">
                      <div dangerouslySetInnerHTML={th(`faq.${id}.a`)} />
                      {id === OS_STEPS_ITEM && <OsSteps id={id} />}
                    </div>
                  </details>
                )
              })}
            </div>
          </section>
        ))}

        {visible.size === 0 && <p className="fq-empty" dangerouslySetInnerHTML={th('faq.empty')} />}

        </div>
        </div>

        <section className="pg-cta" aria-labelledby="pg-cta-h">
          <h2 id="pg-cta-h">{t('faq.cta.h')}</h2>
          <p>{t('faq.cta.p')}</p>
          <div className="pg-cta-links">
            <a href="https://discord.gg/CQVqMBjeWP" target="_blank" rel="noopener noreferrer">
              <span>Discord</span>
              <span>{t('faq.cta.discord.s')}</span>
            </a>
            <a href="https://docs.dash-ai.com" target="_blank" rel="noopener noreferrer">
              <span>{t('faq.cta.docs.t')}</span>
              <span>{t('faq.cta.docs.s')}</span>
            </a>
            <a href="mailto:contacto@dash-ai.com">
              <span>contacto@dash-ai.com</span>
              <span>{t('faq.cta.mail.s')}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}

function OsSteps({ id }: { id: string }) {
  const { t } = useTranslation('faq')
  const th = (key: string) => ({ __html: t(key) })

  return (
    <>
      <div className="fq-os">
        <h3>
          <svg aria-hidden="true"><use href="#i-apple" /></svg>
          macOS
        </h3>
        <ol>
          {range(MAC_STEPS).map((s) => <li key={s} dangerouslySetInnerHTML={th(`faq.${id}.mac.${s}`)} />)}
        </ol>
        <p dangerouslySetInnerHTML={th(`faq.${id}.mac.tip`)} />
      </div>

      <div className="fq-os">
        <h3>
          <svg aria-hidden="true"><use href="#i-win" /></svg>
          Windows
        </h3>
        <ol>
          {range(WIN_STEPS).map((s) => <li key={s} dangerouslySetInnerHTML={th(`faq.${id}.win.${s}`)} />)}
        </ol>
        <p dangerouslySetInnerHTML={th(`faq.${id}.win.tip`)} />
      </div>

      <p className="fq-note">{t(`faq.${id}.note`)}</p>
    </>
  )
}
