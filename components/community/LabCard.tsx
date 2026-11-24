'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import type { Lab } from '@/data/labs'

// Small linked card used under "Otros labs" on a lab page.
export function LabCard({ lab }: { lab: Lab }) {
  const { t } = useTranslation('labs')
  const p = `labs.item.${lab.slug}`

  return (
    <a className="lb-card lb-card--compact" href={lab.hasDetail ? `#labs/${lab.slug}` : '#labs'}>
      <div className="lb-card-head">
        <span className="lb-code">{t(`${p}.code`)}</span>
        <span className={`lb-status ${lab.status}`}>{t(`labs.status.${lab.status}`)}</span>
      </div>
      <h3>{t(`${p}.title`)}</h3>
      <div className="lb-tags">
        <span className="tag">{t('labs.level', { n: lab.level })}</span>
        {lab.tasks.map(task => <span key={task} className="tag">{task}</span>)}
      </div>
    </a>
  )
}
