'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
export function ContributeRoute() {
  const { t, i18n } = useTranslation('contribute')
  const th = (key: string) => ({ __html: t(key) })

  return (
    <>
      {/* HERO */}
      <section className="contrib-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <svg className="wm wm-tr" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow">
            <span className="num">[ /contribute ]</span>
            {' '}&nbsp;{' '}
            <span>{t('cont.ey')}</span>
          </div>
          <h1 style={{ marginTop: 18 }} dangerouslySetInnerHTML={th('cont.h')} />
          <p className="lead" dangerouslySetInnerHTML={th('cont.lead')} />
        </div>
      </section>

      {/* CONTRIBUTE BUCKETS */}
      <section className="section section--tight" style={{ borderTop: 'none' }}>
        <div className="wrap">

          {/* A. VIA PLUGIN */}
          <div className="contrib-bucket">
            <div className="bucket-head">
              <div className="bucket-chip plugin">
                <span>{t('cont.a.chip')}</span>
              </div>
              <h2 dangerouslySetInnerHTML={th('cont.a.h')} />
              <p className="bucket-lead" dangerouslySetInnerHTML={th('cont.a.lead')} />
            </div>

            <div className="contrib-grid">

              <article className="contrib-card c-model">
                <span className="num">{t('cont.c1.num')}</span>
                <svg className="ic"><use href="#ic-model" /></svg>
                <h3>{t('cont.c1.h')}</h3>
                <p dangerouslySetInnerHTML={th('cont.c1.p')} />
                <div className="footer">
                  <span className="effort">
                    <span className="dot" style={{ color: 'var(--brand)' }} />
                    {' '}
                    <span>{t('cont.c1.e')}</span>
                  </span>
                  <a href="#guide-model"><span>{t('cont.guide')}</span> →</a>
                </div>
              </article>

              <article className="contrib-card c-data">
                <span className="num">{t('cont.c2.num')}</span>
                <svg className="ic"><use href="#ic-data" /></svg>
                <h3>{t('cont.c2.h')}</h3>
                <p dangerouslySetInnerHTML={th('cont.c2.p')} />
                <div className="footer">
                  <span className="effort">
                    <span className="dot" style={{ color: 'var(--datasets-deep)' }} />
                    {' '}
                    <span>{t('cont.c2.e')}</span>
                  </span>
                  <a href="#guide-data"><span>{t('cont.guide')}</span> →</a>
                </div>
              </article>

              <article className="contrib-card c-metric">
                <span className="num">{t('cont.c4.num')}</span>
                <svg className="ic"><use href="#ic-metric" /></svg>
                <h3>{t('cont.c4.h')}</h3>
                <p dangerouslySetInnerHTML={th('cont.c4.p')} />
                <div className="footer">
                  <span className="effort">
                    <span className="dot" style={{ color: 'var(--ink-3)' }} />
                    {' '}
                    <span>{t('cont.c4.e')}</span>
                  </span>
                  <a href="#guide-metric"><span>{t('cont.guide')}</span> →</a>
                </div>
              </article>

              <article className="contrib-card c-xai">
                <span className="num">{t('cont.c5.num')}</span>
                <svg className="ic"><use href="#ic-xai" /></svg>
                <h3>{t('cont.c5.h')}</h3>
                <p dangerouslySetInnerHTML={th('cont.c5.p')} />
                <div className="footer">
                  <span className="effort">
                    <span className="dot" style={{ color: 'var(--generative-deep)' }} />
                    {' '}
                    <span>{t('cont.c5.e')}</span>
                  </span>
                  <a href="#guide-xai"><span>{t('cont.guide')}</span> →</a>
                </div>
              </article>

              <article className="contrib-card c-hpo">
                <span className="num">{t('cont.c6.num')}</span>
                <svg className="ic"><use href="#ic-hpo" /></svg>
                <h3>{t('cont.c6.h')}</h3>
                <p dangerouslySetInnerHTML={th('cont.c6.p')} />
                <div className="footer">
                  <span className="effort">
                    <span className="dot" style={{ color: 'var(--ink-3)' }} />
                    {' '}
                    <span>{t('cont.c6.e')}</span>
                  </span>
                  <a href="#guide-hpo"><span>{t('cont.guide')}</span> →</a>
                </div>
              </article>

              <article className="contrib-card c-plugin">
                <span className="num">{t('cont.c3.num')}</span>
                <svg className="ic"><use href="#ic-plugin" /></svg>
                <h3>{t('cont.c3.h')}</h3>
                <p>{t('cont.c3.p')}</p>
                <div className="footer">
                  <span className="effort">
                    <span className="dot" style={{ color: 'var(--plugins-deep)' }} />
                    {' '}
                    <span>{t('cont.c3.e')}</span>
                  </span>
                  <a href="#guide-plugin"><span>{t('cont.guide')}</span> →</a>
                </div>
              </article>

            </div>
          </div>

          {/* B. VIA PULL REQUEST */}
          <div className="contrib-bucket">
            <div className="bucket-head">
              <div className="bucket-chip pr">
                <span>{t('cont.b.chip')}</span>
              </div>
              <h2 dangerouslySetInnerHTML={th('cont.b.h')} />
              <p className="bucket-lead" dangerouslySetInnerHTML={th('cont.b.lead')} />
            </div>

            <div className="contrib-grid">

              <article className="contrib-card c-bug">
                <span className="num">{t('cont.c9.num')}</span>
                <svg className="ic"><use href="#ic-bug" /></svg>
                <h3>{t('cont.c9.h')}</h3>
                <p>{t('cont.c9.p')}</p>
                <div className="footer">
                  <span className="effort">
                    <span className="dot" style={{ color: 'var(--datasets-deep)' }} />
                    {' '}
                    <span>{t('cont.c9.e')}</span>
                  </span>
                  <a href="#guide-bug"><span>{t('cont.guide')}</span> →</a>
                </div>
              </article>

              <article className="contrib-card c-refactor">
                <span className="num">{t('cont.c10.num')}</span>
                <svg className="ic"><use href="#ic-refactor" /></svg>
                <h3>{t('cont.c10.h')}</h3>
                <p>{t('cont.c10.p')}</p>
                <div className="footer">
                  <span className="effort">
                    <span className="dot" style={{ color: 'var(--ink-3)' }} />
                    {' '}
                    <span>{t('cont.c10.e')}</span>
                  </span>
                  <a href="#guide-feature"><span>{t('cont.guide')}</span> →</a>
                </div>
              </article>

              <article className="contrib-card c-lang">
                <span className="num">{t('cont.c7.num')}</span>
                <svg className="ic"><use href="#ic-lang" /></svg>
                <h3>{t('cont.c7.h')}</h3>
                <p>{t('cont.c7.p')}</p>
                <div className="footer">
                  <span className="effort">
                    <span className="dot" style={{ color: 'var(--datasets-deep)' }} />
                    {' '}
                    <span>{t('cont.c7.e')}</span>
                  </span>
                  <a href="#guide-lang"><span>{t('cont.guide')}</span> →</a>
                </div>
              </article>

            </div>
          </div>

          {/* C. SIN CODIGO */}
          <div className="contrib-bucket">
            <div className="bucket-head">
              <div className="bucket-chip nocode">
                <span>{t('cont.c.chip')}</span>
              </div>
              <h2 dangerouslySetInnerHTML={th('cont.c.h')} />
              <p className="bucket-lead">{t('cont.c.lead')}</p>
            </div>

            <div className="contrib-grid">

              <article className="contrib-card c-tutorial">
                <span className="num">{t('cont.c8.num')}</span>
                <svg className="ic"><use href="#ic-tutorial" /></svg>
                <h3>{t('cont.c8.h')}</h3>
                <p>{t('cont.c8.p')}</p>
                <div className="footer">
                  <span className="effort">
                    <span className="dot" style={{ color: 'var(--brand)' }} />
                    {' '}
                    <span>{t('cont.c8.e')}</span>
                  </span>
                  <a href="#guide-tutorial"><span>{t('cont.guide')}</span> →</a>
                </div>
              </article>

            </div>
          </div>

          {/* GUIDES SECTION */}
          <div className="guides-section">
            <div className="sec-eyebrow">
              <span className="num">[ /contribute/guides ]</span>
              {' '}&nbsp;{' '}
              <span>{t('g.sec.ey')}</span>
            </div>
            <h2>{t('g.sec.h')}</h2>
            <p className="sec-lead" dangerouslySetInnerHTML={th('g.sec.lead')} />

            <div className="guides-grid">

              {/* Guide 1 — Modelo */}
              <article className="guide g-model" id="guide-model">
                <div className="guide-head">
                  <svg className="ic"><use href="#ic-model" /></svg>
                  <div className="meta">
                    <div className="gnum">{t('g.1.num')}</div>
                    <h3>{t('g.1.h')}</h3>
                  </div>
                </div>
                <p className="guide-ctx">{t('g.1.ctx')}</p>
                <ol className="guide-steps">
                  <li dangerouslySetInnerHTML={th('g.1.s1')} />
                  <li dangerouslySetInnerHTML={th('g.1.s2')} />
                  <li dangerouslySetInnerHTML={th('g.1.s3')} />
                  <li dangerouslySetInnerHTML={th('g.1.s4')} />
                  <li dangerouslySetInnerHTML={th('g.1.s5')} />
                </ol>
                <div className="guide-footer">
                  <a href="https://github.com/DashAISoftware/DashAI/tree/develop/DashAI/back/models" target="_blank" rel="noopener">
                    <span>{t('g.lnk.repo')}</span> →
                  </a>
                  <a href="https://docs.dash-ai.com" target="_blank" rel="noopener">
                    <span>{t('g.lnk.docs')}</span> →
                  </a>
                </div>
              </article>

              {/* Guide 2 — Loader */}
              <article className="guide g-data" id="guide-data">
                <div className="guide-head">
                  <svg className="ic"><use href="#ic-data" /></svg>
                  <div className="meta">
                    <div className="gnum">{t('g.2.num')}</div>
                    <h3>{t('g.2.h')}</h3>
                  </div>
                </div>
                <p className="guide-ctx">{t('g.2.ctx')}</p>
                <ol className="guide-steps">
                  <li dangerouslySetInnerHTML={th('g.2.s1')} />
                  <li dangerouslySetInnerHTML={th('g.2.s2')} />
                  <li dangerouslySetInnerHTML={th('g.2.s3')} />
                  <li dangerouslySetInnerHTML={th('g.2.s4')} />
                  <li dangerouslySetInnerHTML={th('g.2.s5')} />
                </ol>
                <div className="guide-footer">
                  <a href="https://github.com/DashAISoftware/DashAI/tree/develop/DashAI/back/dataloaders" target="_blank" rel="noopener">
                    <span>{t('g.lnk.repo2')}</span> →
                  </a>
                </div>
              </article>

              {/* Guide 3 — Plugin */}
              <article className="guide g-plugin" id="guide-plugin">
                <div className="guide-head">
                  <svg className="ic"><use href="#ic-plugin" /></svg>
                  <div className="meta">
                    <div className="gnum">{t('g.3.num')}</div>
                    <h3>{t('g.3.h')}</h3>
                  </div>
                </div>
                <p className="guide-ctx">{t('g.3.ctx')}</p>
                <ol className="guide-steps">
                  <li dangerouslySetInnerHTML={th('g.3.s1')} />
                  <li dangerouslySetInnerHTML={th('g.3.s2')} />
                  <li dangerouslySetInnerHTML={th('g.3.s3')} />
                  <li dangerouslySetInnerHTML={th('g.3.s4')} />
                </ol>
                <div className="guide-footer">
                  <a href="https://packaging.python.org/en/latest/tutorials/packaging-projects/" target="_blank" rel="noopener">
                    <span>{t('g.lnk.pypi')}</span> →
                  </a>
                  <a href="https://github.com/DashAISoftware/DashAI" target="_blank" rel="noopener">
                    <span>{t('g.lnk.repo3')}</span> →
                  </a>
                </div>
              </article>

              {/* Guide 4 — Metrica */}
              <article className="guide g-metric" id="guide-metric">
                <div className="guide-head">
                  <svg className="ic"><use href="#ic-metric" /></svg>
                  <div className="meta">
                    <div className="gnum">{t('g.4.num')}</div>
                    <h3>{t('g.4.h')}</h3>
                  </div>
                </div>
                <p className="guide-ctx">{t('g.4.ctx')}</p>
                <ol className="guide-steps">
                  <li dangerouslySetInnerHTML={th('g.4.s1')} />
                  <li dangerouslySetInnerHTML={th('g.4.s2')} />
                  <li dangerouslySetInnerHTML={th('g.4.s3')} />
                  <li dangerouslySetInnerHTML={th('g.4.s4')} />
                </ol>
                <div className="guide-footer">
                  <a href="https://github.com/DashAISoftware/DashAI/tree/develop/DashAI/back/metrics" target="_blank" rel="noopener">
                    <span>{t('g.lnk.repo4')}</span> →
                  </a>
                </div>
              </article>

              {/* Guide 5 — XAI */}
              <article className="guide g-xai" id="guide-xai">
                <div className="guide-head">
                  <svg className="ic"><use href="#ic-xai" /></svg>
                  <div className="meta">
                    <div className="gnum">{t('g.5.num')}</div>
                    <h3>{t('g.5.h')}</h3>
                  </div>
                </div>
                <p className="guide-ctx">{t('g.5.ctx')}</p>
                <ol className="guide-steps">
                  <li dangerouslySetInnerHTML={th('g.5.s1')} />
                  <li dangerouslySetInnerHTML={th('g.5.s2')} />
                  <li dangerouslySetInnerHTML={th('g.5.s3')} />
                  <li dangerouslySetInnerHTML={th('g.5.s4')} />
                </ol>
                <div className="guide-footer">
                  <a href="https://github.com/DashAISoftware/DashAI/tree/develop/DashAI/back/explainability" target="_blank" rel="noopener">
                    <span>{t('g.lnk.repo5')}</span> →
                  </a>
                </div>
              </article>

              {/* Guide 6 — HPO */}
              <article className="guide g-hpo" id="guide-hpo">
                <div className="guide-head">
                  <svg className="ic"><use href="#ic-hpo" /></svg>
                  <div className="meta">
                    <div className="gnum">{t('g.6.num')}</div>
                    <h3>{t('g.6.h')}</h3>
                  </div>
                </div>
                <p className="guide-ctx">{t('g.6.ctx')}</p>
                <ol className="guide-steps">
                  <li dangerouslySetInnerHTML={th('g.6.s1')} />
                  <li dangerouslySetInnerHTML={th('g.6.s2')} />
                  <li dangerouslySetInnerHTML={th('g.6.s3')} />
                  <li dangerouslySetInnerHTML={th('g.6.s4')} />
                </ol>
                <div className="guide-footer">
                  <a href="https://github.com/DashAISoftware/DashAI/tree/develop/DashAI/back/optimizers" target="_blank" rel="noopener">
                    <span>{t('g.lnk.repo6')}</span> →
                  </a>
                </div>
              </article>

              {/* Guide B1 — Bug fix */}
              <article className="guide g-bug" id="guide-bug">
                <div className="guide-head">
                  <svg className="ic"><use href="#ic-bug" /></svg>
                  <div className="meta">
                    <div className="gnum">{t('g.bug.num')}</div>
                    <h3>{t('g.bug.h')}</h3>
                  </div>
                </div>
                <p className="guide-ctx">{t('g.bug.ctx')}</p>
                <ol className="guide-steps">
                  <li dangerouslySetInnerHTML={th('g.bug.s1')} />
                  <li dangerouslySetInnerHTML={th('g.bug.s2')} />
                  <li dangerouslySetInnerHTML={th('g.bug.s3')} />
                  <li dangerouslySetInnerHTML={th('g.bug.s4')} />
                  <li dangerouslySetInnerHTML={th('g.bug.s5')} />
                </ol>
                <div className="guide-footer">
                  <a href="https://github.com/DashAISoftware/DashAI/issues?q=is%3Aissue+is%3Aopen+label%3Abug" target="_blank" rel="noopener">
                    <span>{t('g.lnk.bugs')}</span> →
                  </a>
                  <a href="https://github.com/DashAISoftware/DashAI/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22" target="_blank" rel="noopener">
                    <span>{t('g.lnk.firstissue')}</span> →
                  </a>
                </div>
              </article>

              {/* Guide B2 — Refactor or core feature */}
              <article className="guide g-refactor" id="guide-feature">
                <div className="guide-head">
                  <svg className="ic"><use href="#ic-refactor" /></svg>
                  <div className="meta">
                    <div className="gnum">{t('g.feat.num')}</div>
                    <h3>{t('g.feat.h')}</h3>
                  </div>
                </div>
                <p className="guide-ctx">{t('g.feat.ctx')}</p>
                <ol className="guide-steps">
                  <li dangerouslySetInnerHTML={th('g.feat.s1')} />
                  <li dangerouslySetInnerHTML={th('g.feat.s2')} />
                  <li dangerouslySetInnerHTML={th('g.feat.s3')} />
                  <li dangerouslySetInnerHTML={th('g.feat.s4')} />
                  <li dangerouslySetInnerHTML={th('g.feat.s5')} />
                </ol>
                <div className="guide-footer">
                  <a href="https://github.com/DashAISoftware/DashAI/issues" target="_blank" rel="noopener">
                    <span>{t('g.lnk.issues')}</span> →
                  </a>
                  <a href="https://github.com/DashAISoftware/DashAI/blob/production/CONTRIBUTING.rst" target="_blank" rel="noopener">
                    CONTRIBUTING.rst →
                  </a>
                </div>
              </article>

              {/* Guide 7 — Lang */}
              <article className="guide g-lang" id="guide-lang">
                <div className="guide-head">
                  <svg className="ic"><use href="#ic-lang" /></svg>
                  <div className="meta">
                    <div className="gnum">{t('g.7.num')}</div>
                    <h3>{t('g.7.h')}</h3>
                  </div>
                </div>
                <p className="guide-ctx">{t('g.7.ctx')}</p>
                <ol className="guide-steps">
                  <li dangerouslySetInnerHTML={th('g.7.s1')} />
                  <li dangerouslySetInnerHTML={th('g.7.s2')} />
                  <li dangerouslySetInnerHTML={th('g.7.s3')} />
                  <li dangerouslySetInnerHTML={th('g.7.s4')} />
                  <li dangerouslySetInnerHTML={th('g.7.s5')} />
                </ol>
                <div className="guide-footer">
                  <a href="https://github.com/DashAISoftware/DashAI/tree/develop/front/src/locales" target="_blank" rel="noopener">
                    <span>{t('g.lnk.repo7')}</span> →
                  </a>
                </div>
              </article>

              {/* Guide 8 — Tutorial */}
              <article className="guide g-tutorial" id="guide-tutorial">
                <div className="guide-head">
                  <svg className="ic"><use href="#ic-tutorial" /></svg>
                  <div className="meta">
                    <div className="gnum">{t('g.8.num')}</div>
                    <h3>{t('g.8.h')}</h3>
                  </div>
                </div>
                <p className="guide-ctx">{t('g.8.ctx')}</p>
                <ol className="guide-steps">
                  <li dangerouslySetInnerHTML={th('g.8.s1')} />
                  <li dangerouslySetInnerHTML={th('g.8.s2')} />
                  <li dangerouslySetInnerHTML={th('g.8.s3')} />
                  <li dangerouslySetInnerHTML={th('g.8.s4')} />
                </ol>
                <div className="guide-footer">
                  <a href="https://discord.gg/CQVqMBjeWP" target="_blank" rel="noopener">
                    <span>{t('g.lnk.discord')}</span> →
                  </a>
                  <a href="mailto:dashai.nocode@gmail.com">
                    <span>{t('g.lnk.email')}</span> →
                  </a>
                </div>
              </article>

            </div>
          </div>

          {/* ONBOARDING */}
          <div className="first-pr" id="first-pr">
            <div>
              <div className="eyebrow on-dark">
                <span className="num">{'// onboarding'}</span>
                {' '}&nbsp;{' '}
                <span>{t('cont.onb.ey')}</span>
              </div>
              <h2 dangerouslySetInnerHTML={th('cont.onb.h')} />
              <p>{t('cont.onb.p')}</p>

              <div className="steps">
                <div className="step">
                  <span className="n">01</span>
                  <div className="t">
                    <span>{t('cont.onb.s1.t')}</span>
                    <span>{t('cont.onb.s1.s')}</span>
                  </div>
                </div>
                <div className="step">
                  <span className="n">02</span>
                  <div className="t">
                    <span>{t('cont.onb.s2.t')}</span>
                    <span>{t('cont.onb.s2.s')}</span>
                  </div>
                </div>
                <div className="step">
                  <span className="n">03</span>
                  <div className="t">
                    <span>{t('cont.onb.s3.t')}</span>
                    <span>{t('cont.onb.s3.s')}</span>
                  </div>
                </div>
                <div className="step">
                  <span className="n">04</span>
                  <div className="t">
                    <span>{t('cont.onb.s4.t')}</span>
                    <span>{t('cont.onb.s4.s')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <pre className="code">
                <span className="c">{`# Un clasificador completo en dashAI`}</span>{'\n'}
                <span className="k">from</span>{` dashai.base `}<span className="k">import</span>{` BaseModel
`}
                <span className="k">from</span>{` dashai.core.schema_fields `}<span className="k">import</span>{` (
`}
                {'    schema_field, optimizer_int_field,\n'}
                {')\n'}
                <span className="k">from</span>{` sklearn.ensemble `}<span className="k">import</span>{` RandomForestClassifier
`}
                {'\n'}
                <span className="k">class</span>{' '}<span className="d">MyForestSchema</span>{`(BaseSchema):
`}
                {'    n_estimators: schema_field(\n'}
                {'        optimizer_int_field(ge='}
                <span className="s">1</span>
                {'),\n'}
                {'        placeholder={\n'}
                {'            '}
                <span className="s">{`"optimize"`}</span>
                {': '}
                <span className="k">False</span>
                {',\n'}
                {'            '}
                <span className="s">{`"fixed_value"`}</span>
                {': '}
                <span className="s">100</span>
                {',\n'}
                {'            '}
                <span className="s">{`"lower_bound"`}</span>
                {': '}
                <span className="s">50</span>
                {',\n'}
                {'            '}
                <span className="s">{`"upper_bound"`}</span>
                {': '}
                <span className="s">200</span>
                {',\n'}
                {'        },\n'}
                {'        description='}
                <span className="s">{`"Number of trees"`}</span>
                {',\n'}
                {'    )\n'}
                {'\n'}
                <span className="k">class</span>{' '}<span className="d">MyForest</span>{`(BaseModel):
`}
                {'    SCHEMA = MyForestSchema\n'}
                {'\n'}
                {'    '}
                <span className="k">def</span>{' '}<span className="d">train</span>
                {'(self, X, y):\n'}
                {'        self.model = RandomForestClassifier(\n'}
                {'            **self.params\n'}
                {'        ).fit(X, y)\n'}
                {'\n'}
                {'    '}
                <span className="k">def</span>{' '}<span className="d">predict</span>
                {'(self, X):\n'}
                {'        '}
                <span className="k">return</span>
                {' self.model.predict(X)\n'}
                <span className="c">{`# 24 líneas · UI auto-generada · python ≥ 3.10`}</span>
              </pre>
            </div>
          </div>

        </div>
      </section>

      {/* CITATION */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">
                <span className="num">[ /contribute/citation ]</span>
              </div>
              <h2>{t('cont.cit.h')}</h2>
              <p className="lead">{t('cont.cit.lead')}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr .9fr', gap: 32 }}>
            <pre className="code">{`@software{dashai_2026,
  title  = {dashAI: a Full Open, Full Extensible
            Visual ML platform},
  author = {{DashAI Team}},
  year   = {2026},
  version = {0.9.4},
  url    = {https://github.com/DashAISoftware/DashAI},
  license = {open-source},
  organization = {DashAI Community},
}`}</pre>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 24 }}>
              <h4 style={{ fontSize: 16, marginBottom: 10 }}>{t('cont.coc.h')}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }} dangerouslySetInnerHTML={th('cont.coc.p')} />
              <a
                className="btn btn--sm"
                style={{ marginTop: 14 }}
                href="https://github.com/DashAISoftware/DashAI/blob/production/CONTRIBUTING.rst"
                target="_blank"
                rel="noopener"
              >
                CONTRIBUTING.rst →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
