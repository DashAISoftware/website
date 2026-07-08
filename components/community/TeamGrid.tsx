'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { TEAM } from '@/data/team'

export function TeamGrid() {
  const { t } = useTranslation('about')

  return (
    <div className="devteam-card">
      <div className="devteam-grid">
        {TEAM.map((m, i) => (
          <div key={`${m.name}-${i}`} className="devteam-bubble">
            <div className="devteam-av">
              {m.avatar
                ? <img src={m.avatar} alt={m.name} style={m.imgStyle} />
                : m.initials}
            </div>
            <strong className="devteam-name">{m.name}</strong>
            <span className="devteam-role">{t(m.roleKey)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
