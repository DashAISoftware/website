'use client'

import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { LABS, LAB_TASKS, type Lab, type LabTask } from '@/data/labs'
import { fileHref, filterLabs } from '@/lib/labs'
import { DocCard } from '@/components/community/DocCard'

// Header animation. Placeholder until the recording of a lab being imported exists.
const LAB_GIF = '/images/home/tour-modelos.gif'

const n4 = [1, 2, 3, 4]

// Where a catalog row leads: its page, the lab HTML file, or nowhere yet.
function labHref(lab: Lab): string | null {
  if (lab.status === 'soon') return null
  if (lab.hasDetail) return `#labs/${lab.slug}`
  return fileHref(lab.files.find((f) => f.kind === 'lab'))
}

export function LabsRoute() {
  const { t } = useTranslation('labs')
  const [task, setTask] = useState<'all' | LabTask>('all')

  const shown = useMemo(() => filterLabs(LABS, task, '', () => ''), [task])

  return (
    <main data-route="labs">
      <section className="pg-top" aria-labelledby="lab-title">
        <svg className="hm-hero-mark" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="pg-top-inner">
          <div className="pg-top-copy">
            <h1 id="lab-title">{t('labs.h')}</h1>
            <p>{t('labs.lead')}</p>
          </div>

          <figure className="lab-gif">
            <img src={LAB_GIF} alt={t('labs.gif.alt')} width={960} height={600} />
          </figure>
        </div>
      </section>

      <div className="pg-body">
        <section className="hm-sec hm-sec--first" id="labs-file" aria-labelledby="lab-file">
          <div className="lab-file">
            <div>
              <h2 id="lab-file" className="hm-h2">{t('labs.file.h')}</h2>
              <p className="hm-p hm-muted">{t('labs.file.p1')}</p>
              <p className="hm-p hm-muted">{t('labs.file.p2')}</p>
              <p className="lab-warn">{t('labs.file.warn')}</p>
            </div>
            <ul className="lab-parts">
              {n4.map((i) => (
                <li key={i}>
                  <span>{t(`labs.file.part.${i}.t`)}</span>
                  <span>{t(`labs.file.part.${i}.d`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="hm-sec" aria-labelledby="lab-how">
          <h2 id="lab-how" className="hm-h2">{t('labs.how.h')}</h2>
          <ol className="lab-steps">
            {n4.map((i) => (
              <li key={i}>
                <span className="lab-step-n">{i}</span>
                <h3>{t(`labs.how.step.${i}.t`)}</h3>
                <p>{t(`labs.how.step.${i}.d`)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="hm-sec hm-sec--last" id="labs-catalog" aria-labelledby="lab-cat">
          <div className="lab-cat-head">
            <h2 id="lab-cat" className="hm-h2">{t('labs.cat.h')}</h2>
            <div className="pg-filters" role="group" aria-label={t('labs.cat.filter')}>
              {(['all', ...LAB_TASKS] as const).map((f) => (
                <button key={f} type="button" aria-pressed={task === f} onClick={() => setTask(f)}>
                  {f === 'all' ? t('labs.cat.all') : t(`labs.task.${f}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="hm-docs lab-docs">
            {shown.map((lab) => {
              const href = labHref(lab) ?? undefined
              const p = `labs.item.${lab.slug}`
              return (
                <DocCard
                  key={lab.slug}
                  className={lab.status === 'soon' ? 'lab-doc--soon' : undefined}
                  href={href}
                  external={!lab.hasDetail}
                  icon={
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19.8 18.4 14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z" />
                    </svg>
                  }
                  tag={t(`labs.status.${lab.status}`)}
                  kicker={t(`${p}.code`)}
                  title={t(`${p}.title`)}
                  desc={t(`${p}.summary`)}
                  tags={[t('labs.level', { n: lab.level }), ...lab.tasks.map((k) => t(`labs.task.${k}`))]}
                />
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
