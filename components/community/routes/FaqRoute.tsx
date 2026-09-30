'use client'

import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'

type Category = { id: string; cls: string; count: number }

// The i18n keys follow `faq.<id>.<n>.q` / `faq.<id>.<n>.a`, one per question.
const CATEGORIES: Category[] = [
  { id: 'general',   cls: 'c-general',   count: 5 },
  { id: 'install',   cls: 'c-install',   count: 7 },
  { id: 'privacy',   cls: 'c-privacy',   count: 4 },
  { id: 'use',       cls: 'c-use',       count: 5 },
  { id: 'extend',    cls: 'c-extend',    count: 4 },
  { id: 'community', cls: 'c-community', count: 3 },
]

// The "unsigned installer" answer carries step-by-step blocks per OS.
const OS_STEPS_ITEM = 'install.3'
const MAC_STEPS = 5
const WIN_STEPS = 3

const pad = (n: number) => String(n).padStart(2, '0')
const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1)
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const stripTags = (s: string) => s.replace(/<[^>]+>/g, ' ')

function PlusSign() {
  return (
    <span className="faq-sign">
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M6 1v10M1 6h10" />
      </svg>
    </span>
  )
}

export function FaqRoute() {
  const { t, i18n } = useTranslation('faq')
  const th = (key: string) => ({ __html: t(key) })

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Set<string>>(new Set())
  const [allOpen, setAllOpen] = useState(false)
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id)

  // Searchable text per question: question + answer + its category header,
  // so searching "privacidad" also finds every question in that block.
  const haystack = useMemo(() => {
    const map = new Map<string, string>()
    for (const cat of CATEGORIES) {
      const head = [t(`faq.${cat.id}.ey`), t(`faq.${cat.id}.h`), t(`faq.${cat.id}.p`)].join(' ')
      for (const n of range(cat.count)) {
        const id = `${cat.id}.${n}`
        const parts = [t(`faq.${id}.q`), t(`faq.${id}.a`), head]
        if (id === OS_STEPS_ITEM) {
          range(MAC_STEPS).forEach(s => parts.push(t(`faq.${id}.mac.${s}`)))
          range(WIN_STEPS).forEach(s => parts.push(t(`faq.${id}.win.${s}`)))
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
  const total = haystack.size

  function handleSearch(value: string) {
    setQuery(value)
    const nq = norm(value.trim())
    // Matches open up while searching; clearing the search collapses everything.
    setOpen(nq ? new Set([...haystack].filter(([, text]) => text.includes(nq)).map(([id]) => id)) : new Set())
    setAllOpen(false)
  }

  function handleToggleAll() {
    const next = !allOpen
    setAllOpen(next)
    setOpen(next ? new Set(visible) : new Set())
  }

  function handleItemToggle(id: string, isOpen: boolean) {
    setOpen(prev => {
      if (prev.has(id) === isOpen) return prev
      const next = new Set(prev)
      if (isOpen) next.add(id)
      else next.delete(id)
      return next
    })
  }

  // Scroll in place instead of going through the hash router; pushState keeps
  // the URL shareable without firing a hashchange.
  function handleCategoryClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(`faq-${id}`)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.pushState(null, '', `#faq-${id}`)
    setActiveCat(id)
  }

  // Highlight the category currently in view in the sidebar
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) setActiveCat(en.target.id.replace(/^faq-/, ''))
      })
    }, { rootMargin: '-80px 0px -70% 0px' })
    CATEGORIES.forEach(c => {
      const el = document.getElementById(`faq-${c.id}`)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <main data-route="faq">

      <section className="vn-hero">
        <svg className="wm wm-cr wm-lg" style={{ top: '12%' }} viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap">
          <div className="eyebrow"><span className="num">[ FAQ ]</span> <span>{t('faq.ey')}</span></div>
          <h1 dangerouslySetInnerHTML={th('faq.h')} />
          <p className="lead">{t('faq.lead')}</p>
          <div className="vn-tools">
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
                onChange={e => handleSearch(e.target.value)}
              />
            </label>
            <button
              className={`vn-chip${allOpen ? ' is-on' : ''}`}
              type="button"
              aria-expanded={allOpen}
              onClick={handleToggleAll}
            >
              {allOpen ? t('faq.close_all') : t('faq.open_all')}
            </button>
            <span className="vn-count">{t('faq.count', { shown: visible.size, total })}</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '64px' }}>
        <div className="wrap">
          <div className="faq-layout">

            <aside className="faq-side">
              <h5>{t('faq.side.h')}</h5>
              <nav>
                {CATEGORIES.map(cat => (
                  <a
                    key={cat.id}
                    href={`#faq-${cat.id}`}
                    className={activeCat === cat.id ? 'is-active' : undefined}
                    onClick={e => handleCategoryClick(e, cat.id)}
                  >
                    {t(`faq.${cat.id}.nav`)} <b>{pad(cat.count)}</b>
                  </a>
                ))}
              </nav>
              <div className="faq-side-foot" dangerouslySetInnerHTML={th('faq.side.foot')} />
            </aside>

            <div>
              {CATEGORIES.map((cat, ci) => {
                const items = range(cat.count).map(n => `${cat.id}.${n}`)
                const anyVisible = items.some(id => visible.has(id))
                return (
                  <div key={cat.id} className={`faq-block ${cat.cls}`} id={`faq-${cat.id}`} hidden={!anyVisible}>
                    <div className="faq-block-head">
                      <div className="ey">// {pad(ci + 1)} {t(`faq.${cat.id}.ey`)}</div>
                      <h3>{t(`faq.${cat.id}.h`)}</h3>
                      <p>{t(`faq.${cat.id}.p`)}</p>
                    </div>

                    {items.map(id => (
                      <details
                        key={id}
                        className="faq-item"
                        hidden={!visible.has(id)}
                        open={open.has(id)}
                        onToggle={e => handleItemToggle(id, e.currentTarget.open)}
                      >
                        <summary>
                          <PlusSign />
                          <span className="faq-q">{t(`faq.${id}.q`)}</span>
                        </summary>
                        <div className="faq-answer">
                          <div dangerouslySetInnerHTML={th(`faq.${id}.a`)} />
                          {id === OS_STEPS_ITEM && <OsSteps id={id} />}
                        </div>
                      </details>
                    ))}
                  </div>
                )
              })}

              <div className="vn-empty" hidden={visible.size !== 0} dangerouslySetInnerHTML={th('faq.empty')} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="wrap">
          <div className="faq-cta">
            <div>
              <h2 dangerouslySetInnerHTML={th('faq.cta.h')} />
              <p>{t('faq.cta.p')}</p>
            </div>
            <div className="faq-cta-links">
              <a className="faq-cta-link" href="https://discord.gg/CQVqMBjeWP" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.3A8.4 8.4 0 1 1 21 11.5z" />
                </svg>
                <span className="t">Discord<span>{t('faq.cta.discord.s')}</span></span>
              </a>
              <a className="faq-cta-link" href="https://docs.dash-ai.com" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 5a2 2 0 0 1 2-2h11v18H6a2 2 0 0 1-2-2z" />
                  <path d="M8 7h6M8 11h6" />
                </svg>
                <span className="t">{t('faq.cta.docs.t')}<span>{t('faq.cta.docs.s')}</span></span>
              </a>
              <a className="faq-cta-link" href="mailto:contacto@dash-ai.com">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <span className="t">contacto@dash-ai.com<span>{t('faq.cta.mail.s')}</span></span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

function OsSteps({ id }: { id: string }) {
  const { t } = useTranslation('faq')
  const th = (key: string) => ({ __html: t(key) })

  return (
    <>
      <div className="faq-os">
        <div className="faq-os-head"><svg><use href="#i-apple" /></svg>MACOS</div>
        <ol>
          {range(MAC_STEPS).map(s => <li key={s} dangerouslySetInnerHTML={th(`faq.${id}.mac.${s}`)} />)}
        </ol>
      </div>
      <p style={{ marginTop: '10px', fontSize: '13.5px' }} dangerouslySetInnerHTML={th(`faq.${id}.mac.tip`)} />

      <div className="faq-os">
        <div className="faq-os-head"><svg><use href="#i-win" /></svg>WINDOWS</div>
        <ol>
          {range(WIN_STEPS).map(s => <li key={s} dangerouslySetInnerHTML={th(`faq.${id}.win.${s}`)} />)}
        </ol>
      </div>
      <p style={{ marginTop: '10px', fontSize: '13.5px' }} dangerouslySetInnerHTML={th(`faq.${id}.win.tip`)} />

      <div className="faq-note">{t(`faq.${id}.note`)}</div>
    </>
  )
}
