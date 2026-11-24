'use client'

import { Trans, useTranslation } from 'react-i18next'
import '@/app/i18n'

const REPO = 'https://github.com/DashAISoftware/DashAI'

// Community channels: the footer is the only place on the site that links them.
const CHANNELS = [
  { key: 'discord', href: 'https://discord.gg/CQVqMBjeWP' },
  { key: 'email', href: 'mailto:contacto@dash-ai.com' },
  { key: 'list', href: 'https://groups.google.com/g/dashai-updates' },
]

export function Footer() {
  const { t } = useTranslation('footer')

  return (
    <footer className="sfoot">
      <svg className="sfoot-mark" viewBox="0 0 218.96 237.04" aria-hidden="true">
        <use href="#dashai-mark" />
      </svg>
      <div className="sfoot-inner">
        <p className="sfoot-text">
          <a className="sfoot-logo" href="#home" aria-label="dashAI">
            <svg viewBox="0 0 854 237.04" aria-hidden="true">
              <use href="#dashai-lockup" />
            </svg>
          </a>
          <span>
            <Trans
              t={t}
              i18nKey="ft.brand"
              components={{ anchor: <a href={`${REPO}/blob/develop/LICENSE`} target="_blank" rel="noopener noreferrer" /> }}
            />
          </span>
        </p>

        <ul className="sfoot-channels" aria-label={t('ft.channels')}>
          {CHANNELS.map((c) => (
            <li key={c.key}>
              <a
                href={c.href}
                {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {t(`ft.${c.key}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
