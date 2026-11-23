'use client'

import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import '@/app/i18n'
import { formatBytes, getReleases, installers, type Platform, type Release } from '@/lib/github'

const REPO = 'https://github.com/DashAISoftware/DashAI'
const SOURCEFORGE_URL = 'https://sourceforge.net/projects/dashai/files/latest/download'
const TRACKER_URL = process.env.NEXT_PUBLIC_TRACKER_URL
const PREVIOUS_SHOWN = 5

type Desktop = 'windows' | 'mac_arm' | 'linux'
const DESKTOP: { id: Desktop; icon: string; ext: string }[] = [
  { id: 'windows', icon: 'i-win', ext: '.exe' },
  { id: 'mac_arm', icon: 'i-apple', ext: '.dmg' },
  { id: 'linux', icon: 'i-linux', ext: '.AppImage' },
]

async function trackClick(buttonId: string) {
  if (!TRACKER_URL) return
  try {
    await fetch(`${TRACKER_URL}/click/${buttonId}`, { method: 'POST' })
  } catch {
    // non-blocking
  }
}

// Best guess of the visitor's desktop system, to highlight its installer.
function detectSystem(): Desktop | null {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent.toLowerCase()
  if (/android|iphone|ipad/.test(ua)) return null
  if (ua.includes('win')) return 'windows'
  if (ua.includes('mac')) return 'mac_arm'
  if (ua.includes('linux')) return 'linux'
  return null
}

function hasInstallers(r: Release) {
  return Object.keys(installers(r.assets)).length > 0
}

function downloadsOf(r: Release) {
  return Object.values(installers(r.assets)).reduce((n, a) => n + (a?.download_count ?? 0), 0)
}

export function DownloadRoute() {
  const { t, i18n } = useTranslation('download')
  const lang = i18n.language || 'es'
  const [releases, setReleases] = useState<Release[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [system, setSystem] = useState<Desktop | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setSystem(detectSystem())
    getReleases().then((list) => {
      const withInstallers = list.filter(hasInstallers)
      setReleases(withInstallers)
      setFailed(withInstallers.length === 0)
    })
  }, [])

  const latest = releases?.[0] ?? null
  const latestAssets = latest ? installers(latest.assets) : {}
  const previous = releases?.slice(1) ?? []
  const shown = showAll ? previous : previous.slice(0, PREVIOUS_SHOWN)

  const fmtDate = (iso: string, month: 'long' | 'short') =>
    new Intl.DateTimeFormat(lang, { day: 'numeric', month, year: 'numeric' }).format(new Date(iso))
  const fmtNum = (n: number) => new Intl.NumberFormat(lang).format(n)
  const version = (tag: string) => tag.replace(/^v/, '')

  const assetLink = (href: string | undefined, label: string, id: string) =>
    href ? (
      <a href={href} onClick={() => trackClick(id)}>{label}</a>
    ) : (
      <span className="dl-na">{t('dl.old.na')}</span>
    )

  return (
    <main data-route="download">
      <section className="dl-top" aria-labelledby="dl-title">
        <svg className="hm-hero-mark" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="dl-top-inner">
          <div className="dl-top-copy">
            <h1 id="dl-title">{t('dl.h')}</h1>
            <p>
              {t('dl.lead')}{' '}
              {latest && t('dl.version', { version: version(latest.tag_name), date: fmtDate(latest.published_at, 'long') })}
            </p>
          </div>

          <article className="dl-card2" aria-labelledby="dl-card-title">
            <h2 id="dl-card-title">{t('dl.card.h')}</h2>
            <p>{t('dl.card.p')}</p>
            <div className="dl-os-list">
              {DESKTOP.map(({ id, icon, ext }) => {
                const asset = latestAssets[id as Platform]
                const primary = system ? system === id : id !== 'linux'
                return (
                  <a
                    key={id}
                    className={`dl-os${primary ? ' dl-os--primary' : ''}`}
                    href={asset?.browser_download_url ?? SOURCEFORGE_URL}
                    onClick={() => trackClick(id)}
                  >
                    <svg className="dl-os-icon" aria-hidden="true">
                      <use href={`#${icon}`} />
                    </svg>
                    <span className="dl-os-name">
                      {t(`dl.os.${id}`)}
                      {system === id && <span className="dl-os-chip">{t('dl.detected')}</span>}
                    </span>
                    <span className="dl-os-meta">
                      {ext}
                      {asset && <> {formatBytes(asset.size)}</>}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                      </svg>
                    </span>
                  </a>
                )
              })}
            </div>
            <a className="hm-more" href={`${REPO}/releases`} target="_blank" rel="noopener noreferrer">
              {t('dl.card.all')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </article>
        </div>
      </section>

      <div className="hm-col dl-col">
        <section className="hm-sec hm-sec--first" aria-labelledby="dl-req">
          <h2 id="dl-req" className="hm-h2">{t('dl.req.h')}</h2>
          <div className="dl-table-wrap">
            <table className="dl-req">
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">{t('dl.req.col.item')}</span></th>
                  <th scope="col">{t('dl.req.col.app')}</th>
                  <th scope="col">{t('dl.req.col.pip')}</th>
                </tr>
              </thead>
              <tbody>
                {['os', 'cpu', 'py', 'gpu'].map((k) => (
                  <tr key={k}>
                    <th scope="row">{t(`dl.req.${k}`)}</th>
                    <td>{t(`dl.req.${k}.app`)}</td>
                    <td>{t(`dl.req.${k}.pip`)}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">{t('dl.req.ram')}</th>
                  <td colSpan={2}>{t('dl.req.ram.v')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="hm-sec" aria-labelledby="dl-pip">
          <h2 id="dl-pip" className="hm-h2">{t('dl.pip.h')}</h2>
          <p className="hm-p">{t('dl.pip.p')}</p>
          <pre className="dl-code">{'pip install dashai\ndashai'}</pre>
          <p className="hm-p hm-muted">
            <Trans
              t={t}
              i18nKey="dl.pip.after"
              components={{ link: <a className="dl-inline" href={`${REPO}#installation-pypi`} target="_blank" rel="noopener noreferrer" /> }}
            />
          </p>
          <a className="hm-more" href="https://pypi.org/project/dashai/" target="_blank" rel="noopener noreferrer">
            {t('dl.pip.pypi')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </section>

        <section className="hm-sec" aria-labelledby="dl-help">
          <div className="dl-help">
            <h2 id="dl-help">{t('dl.help.h')}</h2>
            <p>{t('dl.help.p')}</p>
            <div className="dl-help-links">
              <a className="hm-more" href="#faq">{t('dl.help.faq')}</a>
              <a className="hm-more" href="https://docs.dash-ai.com" target="_blank" rel="noopener noreferrer">{t('dl.help.docs')}</a>
              <a className="hm-more" href="https://discord.gg/CQVqMBjeWP" target="_blank" rel="noopener noreferrer">{t('dl.help.discord')}</a>
            </div>
          </div>
        </section>

        <section className="hm-sec hm-sec--last" aria-labelledby="dl-old">
          <h2 id="dl-old" className="hm-h2">{t('dl.old.h')}</h2>
          <p className="hm-p">{t('dl.old.p')}</p>

          {releases === null && <p className="hm-p hm-muted">{t('dl.old.loading')}</p>}
          {failed && (
            <p className="hm-p hm-muted">
              <a className="dl-inline" href={`${REPO}/releases`} target="_blank" rel="noopener noreferrer">{t('dl.old.error')}</a>
            </p>
          )}

          {previous.length > 0 && (
            <>
              <div className="dl-table-wrap">
                <table className="dl-old">
                  <thead>
                    <tr>
                      <th scope="col">{t('dl.old.col.version')}</th>
                      <th scope="col">{t('dl.old.col.date')}</th>
                      <th scope="col">{t('dl.old.col.windows')}</th>
                      <th scope="col">{t('dl.old.col.mac')}</th>
                      <th scope="col">{t('dl.old.col.linux')}</th>
                      <th scope="col" className="dl-num">{t('dl.old.col.downloads')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map((r) => {
                      const a = installers(r.assets)
                      const v = version(r.tag_name)
                      return (
                        <tr key={r.tag_name}>
                          <th scope="row">
                            <a href={r.html_url} target="_blank" rel="noopener noreferrer">{v}</a>
                          </th>
                          <td>{fmtDate(r.published_at, 'short')}</td>
                          <td>{assetLink(a.windows?.browser_download_url, '.exe', `windows-${v}`)}</td>
                          <td>
                            {a.mac_arm || a.mac_intel ? (
                              <span className="dl-cell-links">
                                {a.mac_arm && <a href={a.mac_arm.browser_download_url} onClick={() => trackClick(`mac_arm-${v}`)}>{t('dl.old.arm')}</a>}
                                {a.mac_intel && <a href={a.mac_intel.browser_download_url} onClick={() => trackClick(`mac_intel-${v}`)}>{t('dl.old.intel')}</a>}
                              </span>
                            ) : (
                              <span className="dl-na">{t('dl.old.na')}</span>
                            )}
                          </td>
                          <td>{assetLink(a.linux?.browser_download_url, 'AppImage', `linux-${v}`)}</td>
                          <td className="dl-num">{fmtNum(downloadsOf(r))}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="dl-old-foot">
                <p>{t('dl.old.note')}</p>
                {previous.length > PREVIOUS_SHOWN && (
                  <button type="button" className="dl-toggle" aria-expanded={showAll} onClick={() => setShowAll((v) => !v)}>
                    {showAll ? t('dl.old.less') : t('dl.old.more')}
                  </button>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  )
}
