'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { STUDENTS } from '@/data/students'

export function StudentsGrid() {
  const { t } = useTranslation('about')

  return (
    <div className="students-card">
      <div className="students-card-head">
        <h3>{t('abt.hist.alum.h')}</h3>
        <p>{t('abt.hist.alum.p')}</p>
      </div>
      <div className="student-grid">
        {STUDENTS.map((s, i) => (
          <div key={`${s.name}-${i}`} className="student-bubble">
            <div className="student-av">{s.initials}</div>
            <strong className="student-name">{s.name}</strong>
            <span className="student-desc">{s.desc}</span>
            <span className="student-meta">{s.year}</span>
          </div>
        ))}
      </div>
      <div className="student-count">
        <span>{STUDENTS.length} {t('abt.hist.alum.count')}</span>
        <a href="https://github.com/DashAISoftware/dashAI/graphs/contributors" target="_blank" rel="noopener" style={{ color: 'var(--brand-on)', fontWeight: 500 }}>contributors graph →</a>
      </div>
    </div>
  )
}
