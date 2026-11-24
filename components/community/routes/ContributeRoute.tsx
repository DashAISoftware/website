'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { CitationBox } from '@/components/community/CitationBox'
import { useActiveSection } from '@/components/community/useActiveSection'

const REPO = 'https://github.com/DashAISoftware/dashAI'
const DISCORD = 'https://discord.gg/CQVqMBjeWP'
const EMAIL = 'mailto:contacto@dash-ai.com'

type Link = { key: string; href: string }

// Page sections, in reading order. The first three are the ways to contribute
// and carry the colour of the matching docs part.
const SECTIONS: { id: string; dot?: string }[] = [
  { id: 'extension', dot: 'learn' },
  { id: 'core', dot: 'discover' },
  { id: 'nocode', dot: 'build' },
  { id: 'setup' },
]

const EXT_STEPS = 4
const CORE_STEPS = 5

const CHANGES: { key: string; links: Link[] }[] = [
  { key: 'bug', links: [{ key: 'bug', href: `${REPO}/issues?q=is%3Aissue+is%3Aopen` }] },
  { key: 'infra', links: [{ key: 'infra', href: `${REPO}/issues/new` }] },
  { key: 'lang', links: [{ key: 'lang', href: `${REPO}/tree/develop/DashAI/front/src/utils/i18n/locales` }] },
]

const NOCODE: { key: string; links: Link[] }[] = [
  { key: 'case', links: [{ key: 'discord', href: DISCORD }, { key: 'email', href: EMAIL }] },
  { key: 'report', links: [{ key: 'issue', href: `${REPO}/issues/new` }] },
  { key: 'cite', links: [] },
]

const SETUP_BACK = `git clone https://github.com/DashAISoftware/DashAI.git
cd DashAI
git checkout develop
uv sync
uv run pre-commit install
uv run python -m DashAI --no-browser`

const SETUP_FRONT = `cd DashAI/front
yarn install
yarn start`

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1)
const external = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  )
}

export function ContributeRoute({ ghVersion }: { ghVersion: string }) {
  const { t, i18n } = useTranslation('contribute')
  // The docs are in Spanish and English only.
  const docsBase = i18n.language === 'es' ? 'https://docs.dash-ai.com/es' : 'https://docs.dash-ai.com'
  const pluginGuide = `${docsBase}/build/plugin-development/overview/`
  const th = (key: string) => ({ __html: t(key) })
  const { active, jumpTo } = useActiveSection(SECTIONS.map((s) => s.id), 'contrib-')

  const Steps = ({ id, count }: { id: string; count: number }) => (
    <ol className="ct-steps">
      {range(count).map((n) => (
        <li key={n}>
          <span className="ct-step-t">{t(`ct.${id}.s${n}.t`)}</span>
          <span className="ct-step-s" dangerouslySetInnerHTML={th(`ct.${id}.s${n}.s`)} />
        </li>
      ))}
    </ol>
  )

  const Via = ({ id, dot }: { id: string; dot: string }) => (
    <p className="ct-via">
      <span className={`ct-dot ct-dot--${dot}`} aria-hidden="true" />
      {t(`ct.${id}.via`)}
    </p>
  )

  const ItemLinks = ({ links }: { links: Link[] }) => (
    <span className="ct-links">
      {links.map((l) => (
        <a key={l.key} className="hm-more" href={l.href} {...external(l.href)}>
          {t(`ct.link.${l.key}`)}
          {l.href.startsWith('http') && <Arrow />}
        </a>
      ))}
    </span>
  )

  return (
    <main data-route="contribute">
      <section className="pg-top" aria-labelledby="ct-title">
        <svg className="hm-hero-mark" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="pg-top-inner">
          <div className="pg-top-copy">
            <h1 id="ct-title">{t('ct.h')}</h1>
            <p>{t('ct.lead')}</p>
          </div>
        </div>
      </section>

      <div className="pg-body">
        <div className="pg-layout">
          <nav className="pg-index" aria-label={t('ct.toc')}>
            <ul>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#contrib-${s.id}`}
                    aria-current={active === s.id ? 'location' : undefined}
                    onClick={(e) => jumpTo(e, s.id)}
                  >
                    <span className="pg-index-label">
                      {s.dot && <span className={`ct-dot ct-dot--${s.dot}`} aria-hidden="true" />}
                      {t(`ct.${s.id}.h`)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pg-main">
            <section id="contrib-extension" className="hm-sec hm-sec--first" aria-labelledby="ct-extension-h">
              <h2 id="ct-extension-h" className="hm-h2">{t('ct.extension.h')}</h2>
              <Via id="extension" dot="learn" />
              <p className="hm-p">{t('ct.extension.p')}</p>
              <Steps id="extension" count={EXT_STEPS} />

              <p className="hm-p">{t('ct.extension.more')}</p>
              <a className="hm-more pg-guide" href={pluginGuide} target="_blank" rel="noopener noreferrer">
                {t('ct.extension.guide')}
                <Arrow />
              </a>
            </section>

            <section id="contrib-core" className="hm-sec" aria-labelledby="ct-core-h">
              <h2 id="ct-core-h" className="hm-h2">{t('ct.core.h')}</h2>
              <Via id="core" dot="discover" />
              <p className="hm-p">{t('ct.core.p')}</p>
              <Steps id="core" count={CORE_STEPS} />

              <h3 className="ct-h3">{t('ct.core.kinds')}</h3>
              <ul className="ct-list ct-list--stack">
                {CHANGES.map((c) => (
                  <li key={c.key}>
                    <p className="ct-item-t">{t(`ct.change.${c.key}.t`)}</p>
                    <p className="ct-item-p" dangerouslySetInnerHTML={th(`ct.change.${c.key}.p`)} />
                    <ItemLinks links={c.links} />
                  </li>
                ))}
              </ul>
            </section>

            <section id="contrib-nocode" className="hm-sec" aria-labelledby="ct-nocode-h">
              <h2 id="ct-nocode-h" className="hm-h2">{t('ct.nocode.h')}</h2>
              <Via id="nocode" dot="build" />
              <p className="hm-p">{t('ct.nocode.p')}</p>
              <ul className="ct-list ct-list--stack">
                {NOCODE.map((c) => (
                  <li key={c.key}>
                    <p className="ct-item-t">{t(`ct.free.${c.key}.t`)}</p>
                    <p className="ct-item-p">{t(`ct.free.${c.key}.p`)}</p>
                    {c.key === 'cite' ? <CitationBox version={ghVersion} /> : <ItemLinks links={c.links} />}
                  </li>
                ))}
              </ul>
            </section>

            <section id="contrib-setup" className="hm-sec hm-sec--last" aria-labelledby="ct-setup-h">
              <h2 id="ct-setup-h" className="hm-h2">{t('ct.setup.h')}</h2>
              <p className="hm-p">{t('ct.setup.p')}</p>
              <pre className="dl-code">{SETUP_BACK}</pre>
              <p className="hm-p">{t('ct.setup.front')}</p>
              <pre className="dl-code">{SETUP_FRONT}</pre>
              <p className="hm-p hm-muted" dangerouslySetInnerHTML={th('ct.setup.cpu')} />
              <p className="hm-p hm-muted">{t('ct.setup.more')}</p>
              <a className="hm-more pg-guide" href={`${docsBase}/build/dev-setup/`} target="_blank" rel="noopener noreferrer">
                {t('ct.setup.guide')}
                <Arrow />
              </a>
            </section>

          </div>
        </div>

        <section className="pg-cta" aria-labelledby="ct-cta-h">
          <h2 id="ct-cta-h">{t('ct.cta.h')}</h2>
          <p>{t('ct.cta.p')}</p>
          <div className="pg-cta-links">
            <a href={DISCORD} target="_blank" rel="noopener noreferrer">
              <span>Discord</span>
              <span>{t('ct.cta.discord')}</span>
            </a>
            <a href={docsBase} target="_blank" rel="noopener noreferrer">
              <span>{t('ct.cta.docs.t')}</span>
              <span>{t('ct.cta.docs')}</span>
            </a>
            <a href={EMAIL}>
              <span>contacto@dash-ai.com</span>
              <span>{t('ct.cta.mail')}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
