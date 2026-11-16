'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import type { Lab } from '@/data/labs'
import { fileHref, formatSize, sessionFile } from '@/lib/labs'

// One lab in the catalog. Three variants come from the data:
//  - has a page (#labs/<slug>): "Abrir lab" goes there
//  - available without a page: "Abrir lab" opens the lab HTML file, disabled until it's uploaded
//  - soon: no footer at all (no actions, no note, no divider)
// `compact` is the small linked card used under "Otros labs" on a lab page.
export function LabCard({ lab, compact = false }: { lab: Lab; compact?: boolean }) {
  const { t, i18n } = useTranslation('labs')
  const lang = i18n.language
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

  const labHref = lab.hasDetail ? `#labs/${lab.slug}` : fileHref(lab.files.find(f => f.kind === 'lab'))
  const session = sessionFile(lab)
  const sessionHref = fileHref(session)

  return (
    <article className={`lb-card${soon ? ' is-soon' : ''}`}>
      {head}
      <h3>{t(`${p}.title`)}</h3>
      <p className="lb-sum">{t(`${p}.summary`)}</p>
      {tags}
      <p className="lb-meta" dangerouslySetInnerHTML={{ __html: t('labs.card.concepts', { list: t(`${p}.concepts`) }) }} />
      {i18n.exists(`${p}.includes`, { ns: 'labs' }) && (
        <p className="lb-meta" dangerouslySetInnerHTML={{ __html: t('labs.card.includes', { list: t(`${p}.includes`) }) }} />
      )}

      {!soon && (
        <div className="lb-card-foot">
          {labHref ? (
            <a className="btn btn--blue btn--sm" href={labHref} {...(lab.hasDetail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
              {t('labs.card.open')}
            </a>
          ) : (
            <span className="btn btn--blue btn--sm is-disabled" aria-disabled="true">{t('labs.card.open')}</span>
          )}
          {sessionHref && session ? (
            <a className="btn btn--sm" href={sessionHref} download>
              {t('labs.card.session', { size: formatSize(session.bytes, lang) })}
            </a>
          ) : (
            <span className="lb-pending">{t('labs.card.sessionSoon')}</span>
          )}
        </div>
      )}
    </article>
  )
}
