'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'

const INSTITUTIONS = [
  {
    href: 'https://dcc.uchile.cl/',
    logo: '/supported-by/dcc-logo.png',
    alt: 'DCC UChile',
    acro: 'UCHILE',
    nameKey: 'abt.inst.uchile.n',
    roleKey: 'abt.inst.uchile.r',
    primary: false,
  },
  {
    href: 'https://www.cenia.cl/',
    logo: '/supported-by/cenia-logo.png',
    alt: 'CENIA',
    acro: 'CENIA',
    nameKey: 'abt.inst.cenia.n',
    roleKey: 'abt.inst.cenia.r',
    primary: false,
  },
  {
    href: 'https://unholster.com/',
    logo: '/supported-by/unholster_logo.png',
    alt: 'Unholster',
    acro: 'Unholster',
    nameKey: 'abt.inst.unh.n',
    roleKey: 'abt.inst.unh.r',
    primary: false,
  },
  {
    href: 'https://anid.cl/',
    logo: '/supported-by/anid-logo.png',
    alt: 'ANID',
    acro: 'ANID',
    nameKey: 'abt.inst.anid.n',
    roleKey: 'abt.inst.anid.r',
    primary: false,
  },
]

export function InstitutionsGrid() {
  const { t } = useTranslation('about')

  return (
    <div className="inst-grid">
      {INSTITUTIONS.map((inst) => (
        <a
          key={inst.acro}
          className={`inst-big${inst.primary ? ' is-primary' : ''}`}
          href={inst.href}
          target="_blank"
          rel="noopener"
        >
          <div className="logo-slot">
            <img
              src={inst.logo}
              alt={inst.alt}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
            />
          </div>
          <div className="acro">{inst.acro}</div>
          <div className="full">{t(inst.nameKey)}</div>
          <div className="role">{t(inst.roleKey)}</div>
        </a>
      ))}
    </div>
  )
}
