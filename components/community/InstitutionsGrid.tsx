'use client'

import type { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { getInstitutions, getFunderLogos, getInstitutionRole } from '@/lib/institutions'

// Institutions that took part in early phases and no longer collaborate actively.
const EARLY_IDS = ['imfd']
// Logos with a dark-theme copy in public/institutions/dark/ (black turned white,
// colours kept). The others (ANID, CENIA, IDIA) stay as they are.
const DARK_LOGOS = ['dcc-logo.png', 'unholster-logo.png', 'imfd-logo.png', 'usm-logo.png', 'fcfm-logo.png']
// The University of Chile units, shown together in one card, each logo linking
// to its own site. They are left out of the shared data file's list (dashAI
// PR #1051 adds IDIA there), so they never show twice.
const UCHILE = [
  { id: 'fcfm', name: 'FCFM', url: 'https://www.fcfm.uchile.cl/', logo: 'institutions/fcfm-logo.png' },
  { id: 'dcc', name: 'DCC', url: 'https://dcc.uchile.cl/', logo: 'institutions/dcc-logo.png' },
  { id: 'idia', name: 'IDIA', url: 'https://idia.uchile.cl/', logo: 'institutions/idia-logo.png' },
]
const UCHILE_IDS = ['uchile', 'fcfm', 'idia']

// The logo, plus its dark-theme copy when there is one; CSS shows one or the other.
function Logo({ src, onError }: { src: string; onError?: (e: SyntheticEvent<HTMLImageElement>) => void }) {
  const file = src.slice(src.lastIndexOf('/') + 1)
  if (!DARK_LOGOS.includes(file)) return <img src={`/${src}`} alt="" loading="lazy" onError={onError} />
  return (
    <>
      <img className="logo-light" src={`/${src}`} alt="" loading="lazy" onError={onError} />
      <img className="logo-dark" src={`/institutions/dark/${file}`} alt="" loading="lazy" onError={onError} />
    </>
  )
}

const EARLY = [
  { id: 'imfd', url: 'https://imfd.cl/', logo: 'institutions/imfd-logo.png' },
  { id: 'usm', url: 'https://usm.cl/', logo: 'institutions/usm-logo.png' },
]

// `early` adds the row of institutions that collaborated in early phases.
export function InstitutionsGrid({ early = true }: { early?: boolean }) {
  const { t, i18n } = useTranslation('about')
  const lang = i18n.language || 'en'
  // Site texts (`abt.inst.<id>.t` / `.role`) override the shared data file,
  // which is partly in English.
  const name = (id: string, fallback: string) => {
    const key = `abt.inst.${id}.t`
    return i18n.exists(key, { ns: 'about' }) ? t(key) : fallback
  }
  const role = (id: string, fallback: string) => {
    const key = `abt.inst.${id}.role`
    return i18n.exists(key, { ns: 'about' }) ? t(key) : fallback
  }
  const institutions = [
    ...getInstitutions()
      .filter((inst) => !EARLY_IDS.includes(inst.id) && !UCHILE_IDS.includes(inst.id))
      .map((inst) => ({
        ...inst,
        fullName: name(inst.id, inst.fullName || inst.name),
        role: role(inst.id, getInstitutionRole(inst, lang)),
      })),
    ...getFunderLogos().map((f) => ({
      id: f.id,
      name: f.name,
      fullName: name(f.id, f.fullName),
      url: f.url,
      logo: f.logo,
      role: role(f.id, f.id),
    })),
  ]

  return (
    <>
    <div className="abt-insts">
      <div className="abt-inst abt-inst--group">
        <span className="abt-inst-logo">
          {UCHILE.map((u) => (
            <a key={u.id} className={`abt-inst-unit abt-inst-logo--${u.id}`} href={u.url} target="_blank" rel="noopener noreferrer" aria-label={u.name}>
              <Logo src={u.logo} />
            </a>
          ))}
        </span>
        <span className="abt-inst-name">
          <strong>{t('abt.inst.uchile.t')}</strong>
          <span>{t('abt.inst.uchile.role')}</span>
        </span>
      </div>
      {institutions.map((inst) => (
        <a key={inst.id} className="abt-inst" href={inst.url} target="_blank" rel="noopener noreferrer">
          <span className={`abt-inst-logo abt-inst-logo--${inst.id}`}>
            <Logo
              src={inst.logo}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </span>
          <span className="abt-inst-name">
            <strong>{inst.fullName || inst.name}</strong>
            <span>{inst.role}</span>
          </span>
        </a>
      ))}
    </div>

    {early && (
    <>
    <h3 className="abt-early-h">{t('abt.early.h')}</h3>
    <ul className="abt-early">
      {EARLY.map((inst) => (
        <li key={inst.id}>
          <a href={inst.url} target="_blank" rel="noopener noreferrer">
            <Logo src={inst.logo} />
            <span className="abt-inst-name">
              <strong>{t(`abt.early.${inst.id}.n`)}</strong>
              <span>{t(`abt.early.${inst.id}.r`)}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
    </>
    )}
    </>
  )
}
