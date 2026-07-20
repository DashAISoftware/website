'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { getInstitutions, getFunderLogos, getInstitutionRole } from '@/lib/institutions'

export function InstitutionsGrid() {
  const { t, i18n } = useTranslation('about')
  const lang = i18n.language || 'en'
  const institutions = [
    ...getInstitutions().map((inst) => ({
      ...inst,
      role: getInstitutionRole(inst, lang),
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
    <div className="inst-grid">
      {institutions.map((inst) => (
        <a
          key={inst.id}
          className="inst-big"
          href={inst.url}
          target="_blank"
          rel="noopener"
        >
          <div className="logo-slot">
            <img
              src={`/${inst.logo}`}
              alt={inst.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
          <div className="acro">{inst.id.toUpperCase()}</div>
          <div className="full">{inst.fullName || inst.name}</div>
          <div className="role">{inst.role}</div>
        </a>
      ))}
    </div>
  )
}
