'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'
export function DownloadRoute() {
  const { t, i18n } = useTranslation('download')
  const th = (key: string) => ({ __html: t(key) })

  return (
    <main data-route="download">

      <section className="dl-hero">
        <div className="wrap">
          <div className="eyebrow">
            <span className="num">[ /download ]</span>
            {' '}&nbsp;{' '}
            <span>{t('dl.ey')}</span>
          </div>
          <h1 style={{ marginTop: '18px' }} dangerouslySetInnerHTML={th('dl.h')} />
          <p className="lead">{t('dl.lead')}</p>
          <div className="dl-meta">
            <span className="brand">{t('dl.m.v')}</span>
            <span>{t('dl.m.l')}</span>
            <span>{t('dl.m.os')}</span>
            <span>{t('dl.m.d')}</span>
          </div>
        </div>
      </section>

      <section className="section section--tight" style={{ borderTop: 'none' }}>
        <div className="wrap">

          <div className="dl-grid">

            <article className="dl-card recommended">
              <span className="step-num">01</span>
              <span className="step-tag">
                <span className="n">// recomendado</span>
                {' '}&nbsp;{' '}
                <span>{t('dl.e.tag')}</span>
              </span>
              <h3>{t('dl.e.h')}</h3>
              <p>{t('dl.e.p')}</p>

              <div className="dl-buttons">
                <a href="https://sourceforge.net/projects/dashai/files/latest/download" target="_blank" rel="noopener">
                  <span className="os">
                    <svg style={{ width: '18px', height: '18px' }}>
                      <use href="#i-win" />
                    </svg>
                    <span>{t('dl.e.win')}</span>
                  </span>
                  <span className="arrow"><span className="ext">.exe</span> ↓</span>
                </a>
                <a href="https://sourceforge.net/projects/dashai/files/latest/download" target="_blank" rel="noopener">
                  <span className="os">
                    <svg style={{ width: '18px', height: '18px' }}>
                      <use href="#i-apple" />
                    </svg>
                    <span>{t('dl.e.arm')}</span>
                  </span>
                  <span className="arrow"><span className="ext">.dmg</span> ↓</span>
                </a>
                <a className="alt" href="https://sourceforge.net/projects/dashai/files/latest/download" target="_blank" rel="noopener">
                  <span className="os">
                    <svg style={{ width: '18px', height: '18px' }}>
                      <use href="#i-apple" />
                    </svg>
                    <span>{t('dl.e.int')}</span>
                  </span>
                  <span className="arrow"><span className="ext">.dmg</span> ↓</span>
                </a>
              </div>

              <a className="dl-link" href="https://github.com/DashAISoftware/DashAI/releases" target="_blank" rel="noopener">
                <span>{t('dl.e.r')}</span> →
              </a>
            </article>

            <article className="dl-card">
              <span className="step-num">02</span>
              <span className="step-tag">
                <span className="n">// PyPI</span>
                {' '}&nbsp;{' '}
                <span>{t('dl.p.tag')}</span>
              </span>
              <h3>{t('dl.p.h')}</h3>
              <p dangerouslySetInnerHTML={th('dl.p.p')} />

              <div className="dl-cmd">
                <span className="c"># instalar desde PyPI</span>{'\n'}
                <span className="p">$</span>{' pip install dashai\n\n'}
                <span className="c"># ejecutar</span>{'\n'}
                <span className="p">$</span>{' dashai\n\n'}
                <span className="c"># → dashAI listo</span>
              </div>

              <a className="dl-link" href="https://pypi.org/project/dashai/" target="_blank" rel="noopener">
                <span>{t('dl.p.r')}</span> →
              </a>
            </article>

          </div>

          <div style={{ marginTop: '64px' }}>
            <div className="eyebrow">
              <span className="num">[ /download/requirements ]</span>
              {' '}&nbsp;{' '}
              <span>{t('dl.req.ey')}</span>
            </div>
            <h2 style={{ marginTop: '14px', fontSize: '32px' }}>{t('dl.req.h')}</h2>

            <div className="req-grid">
              <div className="req-card">
                <div className="lbl">PYTHON</div>
                <div className="val">≥ 3.10</div>
                <div className="sub">{t('dl.req.py.s')}</div>
              </div>
              <div className="req-card">
                <div className="lbl">RAM</div>
                <div className="val">{t('dl.req.ram.v')}</div>
                <div className="sub">{t('dl.req.ram.s')}</div>
              </div>
              <div className="req-card">
                <div className="lbl">OS</div>
                <div className="val">Linux · macOS · Windows</div>
                <div className="sub">{t('dl.req.os.s')}</div>
              </div>
            </div>
          </div>

          <div className="dl-clone">
            <div className="t" dangerouslySetInnerHTML={th('dl.cl.t')} />
            <code>git clone github.com/DashAISoftware/DashAI</code>
          </div>

          <div style={{
            marginTop: '48px',
            padding: '24px',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--r-lg)',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '20px',
            alignItems: 'center',
          }}>
            <div>
              <h4 style={{ fontSize: '15px', marginBottom: '6px' }}>{t('dl.v.h')}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: '1.5' }}>{t('dl.v.p')}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a className="btn btn--sm" href="https://docs.dash-ai.com" target="_blank" rel="noopener">Docs →</a>
              <a className="btn btn--sm" href="https://discord.gg/dashai" target="_blank" rel="noopener">Discord →</a>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
