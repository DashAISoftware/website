'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
export function Footer() {
  const { t, i18n } = useTranslation('footer')

  return (
    <footer className="foot" style={{ position: 'relative', overflow: 'hidden' }}>
      <svg className="wm wm-cr" viewBox="0 0 218.96 237.04" aria-hidden="true">
        <use href="#dashai-mark" />
      </svg>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="foot-grid">

          {/* Brand block */}
          <div className="brand-block">
            <svg
              viewBox="0 0 854 237.04"
              style={{ height: 26, width: 'auto', color: 'var(--ink-text)', marginBottom: 14 }}
            >
              <use href="#dashai-lockup" />
            </svg>
            <p>{t('ft.brand')}</p>
          </div>

          {/* Column 1: PROJECT */}
          <div>
            <h5>{t('ft.c1.h')}</h5>
            <ul>
              <li>
                <a href="https://github.com/DashAISoftware/DashAI" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://docs.dash-ai.com" target="_blank" rel="noopener noreferrer">
                  {t('ft.docs')}
                </a>
              </li>
              <li>
                <a href="https://pypi.org/project/dashai/" target="_blank" rel="noopener noreferrer">
                  PyPI
                </a>
              </li>
              <li>
                <a href="#about">{t('ft.about')}</a>
              </li>
            </ul>
          </div>

          {/* Column 2: RESOURCES */}
          <div>
            <h5>{t('ft.c2.h')}</h5>
            <ul>
              <li>
                <a href="#models">{t('ft.models')}</a>
              </li>
              <li>
                <a href="#download">{t('ft.dl')}</a>
              </li>
              <li>
                <a href="#contribute">{t('ft.cont')}</a>
              </li>
              <li>
                <a
                  href="https://github.com/DashAISoftware/DashAI/blob/production/CHANGELOG.rst"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('ft.rn')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: COMMUNITY */}
          <div>
            <h5>{t('ft.c3.h')}</h5>
            <ul>
              <li>
                <a href="https://discord.gg/dashai" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://groups.google.com/g/dashai-updates" target="_blank" rel="noopener noreferrer">
                  {t('ft.ml')}
                </a>
              </li>
              <li>
                <a href="mailto:dashai.nocode@gmail.com">{t('ft.em')}</a>
              </li>
              <li>
                <a href="https://github.com/DashAISoftware/DashAI/issues" target="_blank" rel="noopener noreferrer">
                  Issues
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="foot-bottom">
          <div>{t('ft.copy')}</div>
          <div>{t('ft.proto')}</div>
        </div>
      </div>
    </footer>
  )
}
