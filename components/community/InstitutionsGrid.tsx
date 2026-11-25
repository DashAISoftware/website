'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { getInstitutions, getFunderLogos, getInstitutionRole } from '@/lib/institutions'

// Institutions that took part in early phases and no longer collaborate actively.
const EARLY_IDS = ['imfd']
// FCFM is shown together with the University of Chile and the DCC, in one card.
const MERGED_IDS = ['fcfm']
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
      .filter((inst) => !EARLY_IDS.includes(inst.id) && !MERGED_IDS.includes(inst.id))
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
      {institutions.map((inst) => (
        <a key={inst.id} className="abt-inst" href={inst.url} target="_blank" rel="noopener noreferrer">
          <span className={`abt-inst-logo abt-inst-logo--${inst.id}`}>
            <img
              src={`/${inst.logo}`}
              alt=""
              loading="lazy"
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
            <img src={`/${inst.logo}`} alt="" loading="lazy" />
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
