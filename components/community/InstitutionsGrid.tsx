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

export function InstitutionsGrid() {
  const { t, i18n } = useTranslation('about')
  const lang = i18n.language || 'en'
  const institutions = [
    ...getInstitutions().filter((inst) => !EARLY_IDS.includes(inst.id) && !MERGED_IDS.includes(inst.id)).map((inst) => ({
      ...inst,
      ...(inst.id === 'uchile' && { fullName: t('abt.inst.uchile.t') }),
      role: inst.id === 'uchile' ? t('abt.inst.uchile.role') : getInstitutionRole(inst, lang),
    })),
    ...getFunderLogos().map((f) => ({
      id: f.id,
      name: f.name,
      fullName: f.fullName,
      url: f.url,
      logo: f.logo,
      role: t(`abt.inst.${f.id}.r`),
    })),
  ]

  return (
    <>
    <div className="abt-insts">
      {institutions.map((inst) => (
        <a key={inst.id} className="abt-inst" href={inst.url} target="_blank" rel="noopener noreferrer">
          <span className="abt-inst-logo">
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
  )
}
