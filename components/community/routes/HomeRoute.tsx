'use client'

import { useState, useEffect } from 'react'
import { AppMockup } from '../AppMockup'
import { InstitutionsGrid } from '../InstitutionsGrid'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'

const MONTH_NAMES: Record<string, string[]> = {
  es: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  pt: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
}

interface GhRelease { tag_name: string; name: string; html_url: string; published_at: string }

export function HomeRoute({ ghVersion }: { ghVersion: string }) {
  const { t, i18n } = useTranslation('home')
  const th = (key: string) => ({ __html: t(key) })
  const lang = i18n.language as 'es' | 'en' | 'pt'
  const [releases, setReleases] = useState<GhRelease[]>([])

  useEffect(() => {
    fetch('https://api.github.com/repos/DashAISoftware/DashAI/releases?per_page=4')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.length) setReleases(data) })
      .catch(() => {})
  }, [])

  function fmtDate(iso: string) {
    const d = new Date(iso)
    const months = MONTH_NAMES[lang] ?? MONTH_NAMES.es
    return `${months[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <svg className="wm wm-br" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap">
          <div className="hero-top">
            <div className="hero-eyebrow">
              <span className="led"></span>
              <span data-gh-version>{ghVersion}</span>
              <span className="sep">·</span>
              <span>{t('hero.ey')}</span>
            </div>
            <h1 dangerouslySetInnerHTML={th('hero.h')} />
            <p className="hero-sub" dangerouslySetInnerHTML={th('hero.sub')} />
            <div className="hero-cta">
              <a className="btn btn--blue" href="#download">
                <svg style={{ width: '14px', height: '14px' }}>
                  <use href="#i-download" />
                </svg>
                <span>{t('hero.cta.dl')}</span>
              </a>
              <a className="btn" href="#contribute">
                <span>{t('hero.cta.cont')}</span>
                <svg style={{ width: '14px', height: '14px' }}>
                  <use href="#i-arrow" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-concepts">
            <div className="concept c-ext">
              <div className="ey">{t('hero.c1.ey')}</div>
              <h4>{t('hero.c1.h')}</h4>
              <p>{t('hero.c1.p')}</p>
            </div>
            <div className="concept c-local">
              <div className="ey">{t('hero.c2.ey')}</div>
              <h4>{t('hero.c2.h')}</h4>
              <p>{t('hero.c2.p')}</p>
            </div>
            <div className="concept c-open">
              <div className="ey">{t('hero.c3.ey')}</div>
              <h4>{t('hero.c3.h')}</h4>
              <p>{t('hero.c3.p')}</p>
            </div>
            <div className="concept c-tool">
              <div className="ey">{t('hero.c4.ey')}</div>
              <h4>{t('hero.c4.h')}</h4>
              <p>{t('hero.c4.p')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">
                <span className="num">[ 01 ]</span>
                {' '}&nbsp;{' '}
                <span>{t('sho.ey')}</span>
              </div>
              <h2 dangerouslySetInnerHTML={th('sho.h')} />
              <p className="lead" dangerouslySetInnerHTML={th('sho.lead')} />
            </div>
          </div>

          <AppMockup t={t} th={th} />

          <div className="showcase-explain">
            <div className="showcase-step">
              <div className="n">01</div>
              <h4>{t('sho.e1.h')}</h4>
              <p>{t('sho.e1.p')}</p>
            </div>
            <div className="showcase-step">
              <div className="n">02</div>
              <h4>{t('sho.e2.h')}</h4>
              <p>{t('sho.e2.p')}</p>
            </div>
            <div className="showcase-step">
              <div className="n">03</div>
              <h4>{t('sho.e3.h')}</h4>
              <p>{t('sho.e3.p')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="section section--tight">
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">
                <span className="num">[ 02 ]</span>
                {' '}&nbsp;{' '}
                <span>{t('mods.ey')}</span>
              </div>
              <h2>{t('mods.h')}</h2>
              <p className="lead">{t('mods.lead')}</p>
            </div>
          </div>

          <div className="modules">
            <a className="mod-card models" href="#models">
              <div className="chip">{t('mod.m.chip')}</div>
              <h3>{t('mod.m.h')}</h3>
              <div className="count mono">{t('mod.m.c')}</div>
              <p className="desc" dangerouslySetInnerHTML={th('mod.m.d')} />
              <span className="arrow">
                <span>{t('mod.m.cta')}</span>{' '}
                <svg style={{ width: '14px', height: '14px' }}>
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
            <a className="mod-card gen" href="#models">
              <div className="chip">{t('mod.g.chip')}</div>
              <h3>{t('mod.g.h')}</h3>
              <div className="count mono">{t('mod.g.c')}</div>
              <p className="desc">{t('mod.g.d')}</p>
              <span className="arrow">
                <span>{t('mod.g.cta')}</span>{' '}
                <svg style={{ width: '14px', height: '14px' }}>
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
            <a className="mod-card plugins" href="#plugins">
              <div className="chip">{t('mod.p.chip')}</div>
              <h3>{t('mod.p.h')}</h3>
              <div className="count">{t('mod.p.c')}</div>
              <p className="desc">{t('mod.p.d')}</p>
              <span className="arrow">
                <span>{t('mod.p.cta')}</span>{' '}
                <svg style={{ width: '14px', height: '14px' }}>
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED MODELS */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">
                <span className="num">[ 03 ]</span>
                {' '}&nbsp;{' '}
                <span>{t('feat.ey')}</span>
              </div>
              <h2>{t('feat.h')}</h2>
              <p className="lead">{t('feat.lead')}</p>
            </div>
            <a className="btn" href="#models">
              <span>{t('feat.cta')}</span>{' '}
              <svg style={{ width: '14px', height: '14px' }}>
                <use href="#i-arrow" />
              </svg>
            </a>
          </div>

          <div className="feat-models">
            <a className="feat-card" href="#models">
              <div className="id">#models/random-forest</div>
              <div className="name">RandomForestClassifier</div>
              <div className="meta">
                <span className="tag tabular">{t('tag.tab')}</span>
                <span className="tag">{t('tag.cls')}</span>
                <span className="tag mono">sklearn</span>
              </div>
            </a>
            <a className="feat-card" href="#models">
              <div className="id">#models/distilbert</div>
              <div className="name">DistilBERT</div>
              <div className="meta">
                <span className="tag nlp">NLP</span>
                <span className="tag">{t('tag.cls')}</span>
                <span className="tag mono">transformers</span>
              </div>
            </a>
            <a className="feat-card" href="#models">
              <div className="id">#models/nllb</div>
              <div className="name">NLLB</div>
              <div className="meta">
                <span className="tag translation">{t('tag.tr')}</span>
                <span className="tag mono">seq2seq</span>
                <span className="tag">BLEU · ChrF</span>
              </div>
            </a>
            <a className="feat-card" href="#models">
              <div className="id">#models/mistral</div>
              <div className="name">Mistral</div>
              <div className="meta">
                <span className="tag gen">LLM</span>
                <span className="tag">{t('tag.ow')}</span>
                <span className="tag mono">{t('tag.loc')}</span>
              </div>
            </a>
            <a className="feat-card" href="#models">
              <div className="id">#models/pixart-sigma</div>
              <div className="name">PixArt-Sigma</div>
              <div className="meta">
                <span className="tag vision">text-to-image</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ACTIVITY */}
      <section
        className="section section--tight activity-section"
        style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
      >
        <svg className="wm wm-tr" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">
                <span className="num">[ 04 ]</span>
                {' '}&nbsp;{' '}
                <span>{t('act.ey')}</span>
              </div>
              <h2>{t('act.h')}</h2>
              <p className="lead" dangerouslySetInnerHTML={th('act.lead')} />
            </div>
          </div>

          <div className="news-grid">
            <div className="news-releases">
              <h4>{t('act.col.h')}</h4>
              <div data-gh-releases="">
                {releases.length > 0 ? releases.map(r => (
                  <a key={r.tag_name} className="act-item" href={r.html_url} target="_blank" rel="noopener">
                    <div className="when">{fmtDate(r.published_at)}</div>
                    <div className="what">
                      <strong>{r.tag_name}</strong>
                      {r.name && r.name !== r.tag_name ? ` — ${r.name}` : ''}
                    </div>
                  </a>
                )) : (
                  <>
                    <a className="act-item" href="https://github.com/DashAISoftware/DashAI/releases" target="_blank" rel="noopener">
                      <div className="when">{t('act.fb.1w')}</div>
                      <div className="what" dangerouslySetInnerHTML={th('act.fb.1')} />
                    </a>
                    <a className="act-item" href="https://github.com/DashAISoftware/DashAI/releases" target="_blank" rel="noopener">
                      <div className="when">{t('act.fb.2w')}</div>
                      <div className="what" dangerouslySetInnerHTML={th('act.fb.2')} />
                    </a>
                    <a className="act-item" href="https://github.com/DashAISoftware/DashAI/releases" target="_blank" rel="noopener">
                      <div className="when">{t('act.fb.3w')}</div>
                      <div className="what" dangerouslySetInnerHTML={th('act.fb.3')} />
                    </a>
                  </>
                )}
              </div>
              <a className="news-all" href="https://github.com/DashAISoftware/DashAI/releases" target="_blank" rel="noopener">
                <span>{t('act.all')}</span> →
              </a>
            </div>

            <div className="news-newsletter">
              <div className="news-chip">NEWSLETTER</div>
              <h3>{t('act.nl.h')}</h3>
              <p>{t('act.nl.p')}</p>
              <a
                className="btn btn--blue"
                href="https://groups.google.com/g/dashai-updates"
                target="_blank"
                rel="noopener"
                style={{ marginTop: '8px' }}
              >
                <span>{t('act.nl.cta')}</span> →
              </a>
              <div className="news-fineprint">{t('act.nl.fine')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONS */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">
                <span className="num">[ 05 ]</span>
                {' '}&nbsp;{' '}
                <span>{t('inst.ey')}</span>
              </div>
              <h2 dangerouslySetInnerHTML={th('inst.h')} />
              <p className="lead">{t('inst.lead')}</p>
            </div>
          </div>

          <InstitutionsGrid />
        </div>
      </section>
    </>
  )
}
