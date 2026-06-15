'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { STATS_PLACEHOLDER, STATS_URL } from '@/lib/stats'

type Lang = 'es' | 'en' | 'pt'
type Route = 'home' | 'models' | 'plugins' | 'contribute' | 'download' | 'community' | 'about'


const NAV_LINKS: { key: Route; i18nKey: string }[] = [
  { key: 'home',       i18nKey: 'nav.home' },
  { key: 'models',     i18nKey: 'nav.models' },
  { key: 'download',   i18nKey: 'nav.download' },
  { key: 'contribute', i18nKey: 'nav.contribute' },
  { key: 'community',  i18nKey: 'nav.community' },
  { key: 'plugins',    i18nKey: 'nav.plugins' },
  { key: 'about',      i18nKey: 'nav.about' },
]

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
]

function fmtStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function Navbar({ route }: { route: string }) {
  const { t, i18n } = useTranslation('navbar')
  const lang = i18n.language as 'es' | 'en' | 'pt'
  const setLang = (l: string) => { i18n.changeLanguage(l); try { localStorage.setItem('dashai-lang', l) } catch {} }

  const [isOpen, setIsOpen] = useState(false)
  const [stars, setStars] = useState<number>(STATS_PLACEHOLDER.github.stars)

  useEffect(() => {
    if (STATS_URL) {
      fetch(STATS_URL)
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data) setStars(data.github.stars) })
        .catch(() => {})
    }
  }, [])
  const switcherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  function handleLangSelect(l: Lang) {
    setLang(l)
    setIsOpen(false)
  }

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#home" className="nav-logo" aria-label="dashAI">
          <svg className="nav-mark" viewBox="0 0 218.96 237.04">
            <use href="#dashai-mark" />
          </svg>
          <svg className="nav-lockup" viewBox="0 0 854 237.04">
            <use href="#dashai-lockup" />
          </svg>
        </a>

        <nav className="nav-links">
          {NAV_LINKS.map(({ key, i18nKey }) => (
            <a
              key={key}
              href={`#${key}`}
              data-link={key}
              className={route === key ? 'is-active' : undefined}
            >
              {t(i18nKey)}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <div className="lang-switcher" ref={switcherRef}>
            <button
              className="lang-trigger"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <svg
                className="lang-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
              </svg>
              <span className="lang-current">{lang.toUpperCase()}</span>
              <svg
                className="lang-caret"
                viewBox="0 0 12 12"
                aria-hidden="true"
              >
                <path
                  d="M2 4l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isOpen && (
              <ul className="lang-list" role="listbox">
                {LANG_OPTIONS.map(({ code, label }) => (
                  <li key={code}>
                    <button
                      type="button"
                      role="option"
                      className={lang === code ? 'is-on' : undefined}
                      onClick={() => handleLangSelect(code)}
                    >
                      <span className="lang-code">{code.toUpperCase()}</span>
                      <span className="lang-name">{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            className="btn btn--ghost btn--sm"
            href="https://docs.dash-ai.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('nav.docs')}
          </a>

          <a
            className="btn btn--sm"
            href="https://github.com/DashAISoftware/dashAI"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg style={{ width: 14, height: 14 }}>
              <use href="#i-github" />
            </svg>
            GitHub
            {stars !== null && <>
              <span style={{ width: 1, height: 12, background: 'var(--line-2)', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 500 }}>{fmtStars(stars)}</span>
            </>}
          </a>
        </div>
      </div>
    </header>
  )
}
