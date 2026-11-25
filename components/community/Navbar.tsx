'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { applyTheme, currentTheme, type Theme } from '@/lib/theme'
import { useStats } from '@/lib/useStats'

type Lang = 'es' | 'en' | 'pt' | 'de' | 'zh'
type MenuKey = 'docs' | 'res' | 'com' | 'lang'
// Section colors from the app: discover, learn, deep dive, build.
type Section = 'discover' | 'learn' | 'deep' | 'build'

type Item = {
  href: string
  title: string
  desc?: string
  section?: Section
  route?: string
  arrow?: boolean
}
type Group = { key: Exclude<MenuKey, 'lang'>; label: string; items: Item[]; footer: Item[]; width: number }

const DOCS = 'https://docs.dash-ai.com'
const REPO = 'https://github.com/DashAISoftware/DashAI'

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh', label: '中文' },
]

const isExternal = (href: string) => href.startsWith('http')
const extProps = (href: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}

function Chevron() {
  return (
    <svg className="snav-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function ArrowOut() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  )
}

function Globe() {
  return (
    <svg className="snav-lang-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
    </svg>
  )
}

function LangList({ lang, onPick, className = '' }: { lang: Lang; onPick: (code: Lang) => void; className?: string }) {
  return (
    <ul className={`snav-langs ${className}`} role="listbox">
      {LANG_OPTIONS.map(({ code, label }) => (
        <li key={code}>
          <button
            type="button"
            role="option"
            lang={code}
            aria-selected={code === lang}
            onClick={() => onPick(code)}
          >
            <span className="snav-lang-code">{code.toUpperCase()}</span>
            <span>{label}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function fmtStars(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

function MenuItem({ item, route, onPick }: { item: Item; route: string; onPick: () => void }) {
  const current = item.route !== undefined && item.route === route
  return (
    <a
      className="snav-item"
      href={item.href}
      aria-current={current ? 'page' : undefined}
      onClick={onPick}
      {...extProps(item.href)}
    >
      {item.section && <span className={`snav-dot snav-dot--${item.section}`} aria-hidden="true" />}
      <span>
        <span className="snav-item-title">{item.title}</span>
        {item.desc && <span className="snav-item-desc">{item.desc}</span>}
      </span>
    </a>
  )
}

function FooterLink({ item, onPick }: { item: Item; onPick: () => void }) {
  return (
    <a className="snav-item snav-item--link" href={item.href} onClick={onPick} {...extProps(item.href)}>
      {item.title}
      {item.arrow && <ArrowOut />}
    </a>
  )
}

// Light/dark switch. Shows the theme it will switch to, like the dashAI app.
function ThemeToggle({ className = 'snav-theme' }: { className?: string }) {
  const { t } = useTranslation('navbar')
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(currentTheme())
  }, [])

  const next: Theme = theme === 'dark' ? 'light' : 'dark'
  const label = t(next === 'dark' ? 'a11y.themeDark' : 'a11y.themeLight')

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      title={label}
      onClick={() => {
        applyTheme(next)
        setTheme(next)
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {theme === 'dark' ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
      {className !== 'snav-theme' && <span>{label}</span>}
    </button>
  )
}

export function Navbar({ route }: { route: string }) {
  const { t, i18n } = useTranslation('navbar')
  const lang = (i18n.language as Lang) || 'es'
  const [open, setOpen] = useState<MenuKey | null>(null)
  const [drawer, setDrawer] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const uid = useId()
  const { stats, isLoading: statsLoading } = useStats()
  const stars = stats?.github.stars ?? null

  const groups: Group[] = [
    {
      key: 'docs',
      label: t('menu.docs'),
      width: 340,
      items: [
        { href: `${DOCS}/discover/overview`, title: t('docs.intro.title'), desc: t('docs.intro.desc'), section: 'discover' },
        { href: `${DOCS}/learn/tutorials/upload-dataset`, title: t('docs.guides.title'), desc: t('docs.guides.desc'), section: 'learn' },
        { href: `${DOCS}/deep-dive/architecture`, title: t('docs.arch.title'), desc: t('docs.arch.desc'), section: 'deep' },
        { href: `${DOCS}/build/dev-setup`, title: t('docs.dev.title'), desc: t('docs.dev.desc'), section: 'build' },
      ],
      footer: [
        { href: `${DOCS}/`, title: t('docs.home'), arrow: true },
      ],
    },
    {
      key: 'res',
      label: t('menu.resources'),
      width: 300,
      items: [
        { href: '#download', title: t('res.download.title'), desc: t('res.download.desc'), route: 'download' },
        { href: '#faq', title: t('res.faq.title'), desc: t('res.faq.desc'), route: 'faq' },
        { href: '#labs', title: t('res.labs.title'), desc: t('res.labs.desc'), route: 'labs' },
        { href: 'https://pypi.org/project/dashai/', title: t('res.pypi.title'), desc: t('res.pypi.desc') },
        { href: `${REPO}/blob/develop/CHANGELOG.rst`, title: t('res.changelog.title'), desc: t('res.changelog.desc') },
      ],
      footer: [
        { href: REPO, title: t('res.github') },
        { href: `${REPO}/issues`, title: t('res.issues') },
      ],
    },
    {
      key: 'com',
      label: t('menu.community'),
      width: 300,
      items: [
        { href: '#contribute', title: t('com.contribute.title'), desc: t('com.contribute.desc'), route: 'contribute' },
        { href: '#about', title: t('com.about.title'), desc: t('com.about.desc'), route: 'about' },
        { href: '#news', title: t('com.news.title'), desc: t('com.news.desc'), route: 'news' },
      ],
      footer: [],
    },
  ]

  // Close menus on outside click, and the drawer whenever the route changes.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  useEffect(() => {
    setOpen(null)
    setDrawer(false)
  }, [route])

  useEffect(() => {
    if (!drawer) return
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') setDrawer(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawer])

  function setLang(code: Lang) {
    i18n.changeLanguage(code)
    try { localStorage.setItem('dashai-lang', code) } catch {}
    setOpen(null)
  }

  // Shared props for one dropdown: opens on hover and click, Escape closes and returns focus.
  function menuProps(key: MenuKey) {
    return {
      onMouseEnter: () => setOpen(key),
      onMouseLeave: () => setOpen((cur) => (cur === key ? null : cur)),
      onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && open === key) {
          setOpen(null)
          e.currentTarget.querySelector('button')?.focus()
        }
      },
    }
  }

  function triggerProps(key: MenuKey) {
    const isOpen = open === key
    return {
      type: 'button' as const,
      'aria-expanded': isOpen,
      'aria-controls': `${uid}-${key}`,
      'data-open': isOpen || undefined,
      onClick: () => setOpen(isOpen ? null : key),
    }
  }

  const close = () => setOpen(null)
  const currentLang = LANG_OPTIONS.find((l) => l.code === lang) ?? LANG_OPTIONS[0]

  return (
    <>
      <header className="snav" ref={headerRef}>
        <div className="snav-inner">
          <button
            className="snav-burger"
            type="button"
            aria-label={t('a11y.menuOpen')}
            aria-expanded={drawer}
            onClick={() => setDrawer(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <a href="#home" className="snav-logo" aria-label={t('a11y.home')}>
            <svg className="snav-mark" viewBox="0 0 218.96 237.04" aria-hidden="true">
              <use href="#dashai-mark" />
            </svg>
            <svg className="snav-lockup" viewBox="0 0 854 237.04" aria-hidden="true">
              <use href="#dashai-lockup" />
            </svg>
          </a>

          <nav className="snav-menus" aria-label={t('a11y.mainNav')}>
            {groups.map((g) => (
              <div className="snav-menu" key={g.key} {...menuProps(g.key)}>
                <button className="snav-trigger" {...triggerProps(g.key)}>
                  {g.label}
                  <Chevron />
                </button>
                {open === g.key && (
                  <div className="snav-pop" id={`${uid}-${g.key}`}>
                    <div className="snav-panel" style={{ width: g.width }}>
                      {g.items.map((it) => (
                        <MenuItem key={it.href} item={it} route={route} onPick={close} />
                      ))}
                      {g.footer.length > 0 && <div className="snav-sep" />}
                      {g.footer.map((it) => (
                        <FooterLink key={it.href} item={it} onPick={close} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="snav-tools">
            <div className="snav-menu snav-lang" onKeyDown={menuProps('lang').onKeyDown}>
              <button
                className="snav-lang-trigger"
                {...triggerProps('lang')}
                aria-haspopup="listbox"
                aria-label={`${t('a11y.language')}: ${currentLang.label}`}
              >
                <Globe />
                <span className="snav-lang-current">{lang.toUpperCase()}</span>
                <Chevron />
              </button>
              {open === 'lang' && (
                <div className="snav-pop snav-pop--right" id={`${uid}-lang`}>
                  <LangList lang={lang} onPick={setLang} className="snav-panel" />
                </div>
              )}
            </div>

            <ThemeToggle />

            <a className="snav-gh" href={REPO} target="_blank" rel="noopener noreferrer" aria-label={t('a11y.github')}>
              <svg width="14" height="14" aria-hidden="true">
                <use href="#i-github" />
              </svg>
              GitHub
              {(statsLoading || stars !== null) && (
                <>
                  <span className="snav-gh-sep" aria-hidden="true" />
                  <span className="snav-gh-stars">
                    {statsLoading
                      ? <span className="stat-skeleton" style={{ width: '1.6em', height: '.9em' }} aria-hidden="true" />
                      : fmtStars(stars ?? 0)}
                  </span>
                </>
              )}
            </a>
          </div>
        </div>
      </header>

      {drawer && (
        <>
          <div className="snav-backdrop" onClick={() => setDrawer(false)} />
          <div className="snav-drawer" role="dialog" aria-modal="true" aria-label={t('a11y.mainNav')}>
            <div className="snav-drawer-head">
              <a href="#home" className="snav-logo" aria-label={t('a11y.home')} onClick={() => setDrawer(false)}>
                <svg className="snav-lockup" viewBox="0 0 854 237.04" aria-hidden="true">
                  <use href="#dashai-lockup" />
                </svg>
              </a>
              <button className="snav-burger" type="button" aria-label={t('a11y.menuClose')} onClick={() => setDrawer(false)} autoFocus>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {groups.map((g) => (
              <section className="snav-drawer-group" key={g.key} aria-label={g.label}>
                <h2>{g.label}</h2>
                {g.items.map((it) => (
                  <MenuItem key={it.href} item={it} route={route} onPick={() => setDrawer(false)} />
                ))}
                {g.footer.map((it) => (
                  <FooterLink key={it.href} item={it} onPick={() => setDrawer(false)} />
                ))}
              </section>
            ))}

            <section className="snav-drawer-group" aria-label={t('a11y.theme')}>
              <ThemeToggle className="snav-item snav-theme-row" />
            </section>
            <section className="snav-drawer-group" aria-label={t('a11y.language')}>
              <h2>{t('a11y.language')}</h2>
              <LangList lang={lang} onPick={setLang} />
            </section>
          </div>
        </>
      )}
    </>
  )
}
