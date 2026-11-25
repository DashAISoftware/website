'use client'

import { useTranslation } from 'react-i18next'
import { InstitutionsGrid } from '../InstitutionsGrid'
import { StudentsGrid } from '../StudentsGrid'
import { TeamGrid } from '../TeamGrid'
import '@/app/i18n'

export function AboutRoute() {
  const { t } = useTranslation('about')

  return (
    <main data-route="about">
      <section className="pg-top" aria-labelledby="abt-title">
        <svg className="hm-hero-mark" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="pg-top-inner pg-top-inner--stack">
          <div className="pg-top-copy">
            <h1 id="abt-title">{t('abt.h')}</h1>
            <p>{t('abt.lead')}</p>
          </div>

          <div className="abt-mv">
            <article>
              <h2>{t('abt.m.h')}</h2>
              <p>{t('abt.m.p')}</p>
            </article>
            <article>
              <h2>{t('abt.v.h2')}</h2>
              <p>{t('abt.v.p2')}</p>
            </article>
          </div>
        </div>
      </section>

      <div className="pg-body">
        <section className="hm-sec hm-sec--first" aria-labelledby="abt-inst">
          <h2 id="abt-inst" className="hm-h2">{t('abt.inst.t')}</h2>
          <p className="hm-p hm-muted abt-p">{t('abt.inst.p')}</p>
          <InstitutionsGrid />
        </section>

        <section className="hm-sec" aria-labelledby="abt-team">
          <h2 id="abt-team" className="hm-h2">{t('abt.team.t')}</h2>
          <p className="hm-p hm-muted abt-p">{t('abt.team.lead')}</p>
          <TeamGrid />
        </section>

        <section className="hm-sec hm-sec--last" aria-labelledby="abt-hist">
          <h2 id="abt-hist" className="hm-h2">{t('abt.hist.t')}</h2>
          <p className="hm-p hm-muted abt-p">{t('abt.hist.lead')}</p>
          <StudentsGrid />
        </section>

        <section className="pg-cta" aria-labelledby="abt-cta-h">
          <h2 id="abt-cta-h">{t('abt.hist.cta.h')}</h2>
          <p>{t('abt.hist.cta.p')}</p>
          <div className="pg-cta-links">
            <a href="https://discord.gg/CQVqMBjeWP" target="_blank" rel="noopener noreferrer">
              <span>Discord</span>
              <span>{t('abt.cta.discord')}</span>
            </a>
            <a href="mailto:contacto@dash-ai.com">
              <span>contacto@dash-ai.com</span>
              <span>{t('abt.cta.mail')}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
