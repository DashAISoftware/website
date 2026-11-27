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
// Links that differ from the shared data file: the University of Chile card is
// the DCC's, so it opens the department's site.
const URLS: Record<string, string> = { uchile: 'https://dcc.uchile.cl/' }
// Shown before the rest, in this order; the others keep the data file's order.
const FIRST = ['fcfm', 'uchile']
const rank = (id: string) => (FIRST.includes(id) ? FIRST.indexOf(id) : FIRST.length)
// Institutions shown here but not in the shared data file, each placed right
// after the institution named in `after`. Name and role come from the site texts.
const LOCAL = [
  { after: 'uchile', id: 'idia', name: 'IDIA', url: 'https://idia.uchile.cl/', logo: 'institutions/idia-logo.png' },
]

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
      .filter((inst) => !EARLY_IDS.includes(inst.id))
      .sort((a, b) => rank(a.id) - rank(b.id))
      .flatMap((inst) => [
        {
          ...inst,
          url: URLS[inst.id] ?? inst.url,
          fullName: name(inst.id, inst.fullName || inst.name),
          role: role(inst.id, getInstitutionRole(inst, lang)),
        },
        ...LOCAL.filter((l) => l.after === inst.id).map((l) => ({
          id: l.id,
          name: l.name,
          fullName: name(l.id, l.name),
          url: l.url,
          logo: l.logo,
          role: role(l.id, ''),
        })),
      ]),
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
