'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import type { Lab } from '@/data/labs'
import { fileHref } from '@/lib/labs'

// One lab in the catalog. The whole card is the link, with no buttons:
//  - has a page (#labs/<slug>): the card goes there
//  - available without a page: the card opens the lab HTML file in a new tab
//  - soon, or a lab file not uploaded yet: a plain, non-clickable card
// `compact` is the small linked card used under "Otros labs" on a lab page.
export function LabCard({ lab, compact = false }: { lab: Lab; compact?: boolean }) {
  const { t, i18n } = useTranslation('labs')
  const p = `labs.item.${lab.slug}`
  const soon = lab.status === 'soon'

  const head = (
    <div className="lb-card-head">
      <span className="lb-code">{t(`${p}.code`)}</span>
      <span className={`lb-status ${lab.status}`}>{t(`labs.status.${lab.status}`)}</span>
    </div>
  )

  const tags = (
    <div className="lb-tags">
      <span className="tag">{t('labs.level', { n: lab.level })}</span>
      {lab.tasks.map(task => <span key={task} className="tag">{task}</span>)}
      {!compact && lab.minutes && <span className="tag">{t('labs.minutes', { from: lab.minutes[0], to: lab.minutes[1] })}</span>}
    </div>
  )

  if (compact) {
    return (
      <a className="lb-card lb-card--compact" href={lab.hasDetail ? `#labs/${lab.slug}` : '#labs'}>
        {head}
        <h3>{t(`${p}.title`)}</h3>
        {tags}
      </a>
    )
  }

  const href = soon ? undefined : lab.hasDetail ? `#labs/${lab.slug}` : fileHref(lab.files.find(f => f.kind === 'lab'))
  const body = (
    <>
      {head}
      <h3>{t(`${p}.title`)}</h3>
      <p className="lb-sum">{t(`${p}.summary`)}</p>
      {tags}
      <p className="lb-meta" dangerouslySetInnerHTML={{ __html: t('labs.card.concepts', { list: t(`${p}.concepts`) }) }} />
      {i18n.exists(`${p}.includes`, { ns: 'labs' }) && (
        <p className="lb-meta" dangerouslySetInnerHTML={{ __html: t('labs.card.includes', { list: t(`${p}.includes`) }) }} />
      )}
    </>
  )

  if (!href) return <article className={`lb-card${soon ? ' is-soon' : ''}`}>{body}</article>

  return (
    <a
      className="lb-card lb-card--link"
      href={href}
      {...(lab.hasDetail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {body}
    </a>
  )
}
