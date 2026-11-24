'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { CitationBox } from '../CitationBox'
import { DemoEmbed } from '../DemoEmbed'
import { DocCard } from '../DocCard'
import { TourCarousel } from '../TourCarousel'
import { totalDownloads as sumDownloads } from '@/lib/stats'
import { useStats } from '@/lib/useStats'
import {
  getFunderLogos,
  getInstitutionRole,
  getInstitutions,
} from '@/lib/institutions'

const DOCS = 'https://docs.dash-ai.com'
const REPO = 'https://github.com/DashAISoftware/DashAI'

type Section = 'discover' | 'learn' | 'deep' | 'build'

const DOC_CARDS: { id: string; href: string; section: Section; level: 'start' | 'advanced'; icon: React.ReactNode }[] = [
  {
    id: 'intro', href: `${DOCS}/discover/overview`, section: 'discover', level: 'start',
    icon: <><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 1 2-2h12" /></>,
  },
  {
    id: 'guides', href: `${DOCS}/learn/tutorials/upload-dataset`, section: 'learn', level: 'start',
    icon: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></>,
  },
  {
    id: 'arch', href: `${DOCS}/deep-dive/architecture`, section: 'deep', level: 'advanced',
    icon: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  },
  {
    id: 'dev', href: `${DOCS}/build/dev-setup`, section: 'build', level: 'advanced',
    icon: <><path d="M8 7l-5 5 5 5" /><path d="M16 7l5 5-5 5" /></>,
  },
]

const FEATURES = ['data', 'eda', 'transform', 'train', 'optim', 'xai']

// The three areas of the app, each with its tutorial in the docs.
const AREAS: { id: string; tutorial: string }[] = [
  { id: 'data', tutorial: 'learn/tutorials/notebook/' },
  { id: 'ml', tutorial: 'learn/tutorials/Models/train/' },
  { id: 'gen', tutorial: 'learn/tutorials/generative/' },
]

// Short counts, as on the previous home: 33.5k, 1.2m.
function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

export function HomeRoute({ ghVersion }: { ghVersion: string }) {
  const { t, i18n } = useTranslation('home')
  const lang = i18n.language || 'es'
  const { stats, isLoading: statsLoading } = useStats()

  const downloads = stats ? sumDownloads(stats) : null
  const stars = stats?.github.stars ?? null

  const institutions = [
    ...getInstitutions().map((inst) => ({
      id: inst.id, fullName: inst.fullName || inst.name, url: inst.url, logo: inst.logo,
      role: getInstitutionRole(inst, lang),
    })),
    ...getFunderLogos().map((f) => ({
      id: f.id, fullName: f.fullName, url: f.url, logo: f.logo,
      role: t(`abt.inst.${f.id}.r`, { ns: 'about' }),
    })),
  ]

  const skeleton = <span className="stat-skeleton" style={{ width: '3em', height: '1em' }} aria-hidden="true" />

  return (
    <>
      <section className="hm-hero" aria-labelledby="hm-title">
        <svg className="hm-hero-mark" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="hm-hero-inner">
          <div className="hm-hero-copy">
            <h1 id="hm-title" className="hm-hero-title">
              <svg role="img" aria-label="dashAI" viewBox="0 0 854 237.04">
                <use href="#dashai-lockup" />
              </svg>
            </h1>
            <p className="hm-hero-lead">{t('hero.lead')}</p>
            <div className="hm-hero-actions">
              <a className="hm-btn hm-btn--solid" href="#download">{t('hero.cta.dl')}</a>
              <div className="hm-hero-stats">
                <a href="#download">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                  </svg>
                  <span>
                    {statsLoading ? skeleton : <strong>{formatNum(downloads ?? 0)}<sup aria-hidden="true">*</sup></strong>} {t('hero.stat.dl')}
                  </span>
                </a>
                <a href={`${REPO}/stargazers`} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
                  </svg>
                  <span>
                    {statsLoading ? skeleton : <strong>{formatNum(stars ?? 0)}</strong>} {t('hero.stat.stars')}
                  </span>
                </a>
              </div>
              <span className="hm-hero-footnote">* {t('hero.stat.dl.note')}</span>
            </div>
          </div>
          <div className="hm-hero-media">
            <TourCarousel />
          </div>
        </div>
      </section>

      <div className="hm-col">
        <section className="hm-sec hm-sec--first" aria-labelledby="hm-about">
          <h2 id="hm-about" className="hm-h2">{t('about.h')}</h2>
          <p className="hm-p">{t('about.lead')}</p>

          <ul className="hm-areas">
            {AREAS.map((a) => (
              <li key={a.id} className={`hm-area hm-area--${a.id}`}>
                <h3>{t(`area.${a.id}.h`)}</h3>
                <p>{t(`area.${a.id}.p`)}</p>
                <a href={`${DOCS}/${lang === 'es' ? 'es/' : ''}${a.tutorial}`} target="_blank" rel="noopener noreferrer">
                  {t('area.tutorial')}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <DemoEmbed />
        </section>

        <section className="hm-sec" aria-labelledby="hm-feat">
          <h2 id="hm-feat" className="hm-h2">{t('feat.h')}</h2>
          <div className="hm-feats">
            {FEATURES.map((f) => (
              <div key={f} className="hm-feat">
                <h3>{t(`feat.${f}.h`)}</h3>
                <p>{t(`feat.${f}.p`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hm-sec" aria-labelledby="hm-docs">
          <h2 id="hm-docs" className="hm-h2">{t('docs.h')}</h2>
          <div className="hm-docs">
            {DOC_CARDS.map((c) => (
              <DocCard
                key={c.id}
                className={`hm-doc--${c.section}`}
                href={c.href}
                external
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {c.icon}
                  </svg>
                }
                tag={t(`docs.level.${c.level}`)}
                title={t(`docs.${c.id}.h`)}
                desc={t(`docs.${c.id}.p`)}
                tags={[t(`docs.${c.id}.t1`), t(`docs.${c.id}.t2`)]}
              />
            ))}
          </div>
          <a className="hm-more" href={DOCS} target="_blank" rel="noopener noreferrer">
            {t('docs.cta')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </section>

        <section className="hm-sec" aria-labelledby="hm-cite">
          <h2 id="hm-cite" className="hm-h2">{t('cite.h')}</h2>
          <p className="hm-p hm-muted">{t('cite.p')}</p>
          <CitationBox version={ghVersion} />
        </section>

        <section className="hm-sec hm-sec--last" aria-labelledby="hm-inst">
          <h2 id="hm-inst" className="hm-h2">{t('inst.h')}</h2>
          <p className="hm-p">{t('inst.lead')}</p>
          <div className="hm-insts">
            {institutions.map((inst) => (
              <a key={inst.id} className="hm-inst" href={inst.url} target="_blank" rel="noopener noreferrer">
                <span className="hm-inst-logo">
                  <img src={`/${inst.logo}`} alt="" loading="lazy" />
                </span>
                <span className="hm-inst-name">
                  <strong>{inst.id.toUpperCase()}</strong>
                  <span>{inst.fullName}</span>
                  <span>{inst.role}</span>
                </span>
              </a>
            ))}
          </div>
          <a className="hm-more" href="#about">
            {t('inst.more')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </section>
      </div>
    </>
  )
}
