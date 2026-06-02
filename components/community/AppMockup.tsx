"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useTranslation } from 'react-i18next'
import '@/app/i18n'

const SLIDES = ["datasets", "models", "generative"] as const
type SlideId = (typeof SLIDES)[number]

export function AppMockup() {
  const { t, i18n } = useTranslation('home')
  const th = (key: string) => ({ __html: t(key) })

  const [activeIndex, setActiveIndex] = useState(1) // default: models
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  const computeTranslate = useCallback(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!track || !viewport) return

    const slides = track.querySelectorAll<HTMLDivElement>(".mock-screen")
    const slideEl = slides[activeIndex]
    if (!slideEl) return

    const vw = viewport.clientWidth
    const sw = slideEl.offsetWidth
    const slideLeft = slideEl.offsetLeft
    const tx = Math.round((vw - sw) / 2 - slideLeft)
    track.style.transform = `translate3d(${tx}px, 0, 0)`
  }, [activeIndex])

  useEffect(() => {
    computeTranslate()
    window.addEventListener("resize", computeTranslate)
    return () => window.removeEventListener("resize", computeTranslate)
  }, [computeTranslate])

  const goTo = (index: number) => {
    const n = SLIDES.length
    setActiveIndex(((index % n) + n) % n)
  }

  const tabLabels: Record<SlideId, string> = {
    datasets: t("sho.tab.datasets"),
    models: t("sho.tab.models"),
    generative: t("sho.tab.gen"),
  }

  return (
    <div className="app-mockup">
      {/* Tabs */}
      <div className="mock-tabs" role="tablist">
        {SLIDES.map((slide, i) => (
          <button
            key={slide}
            className={`mock-tab${activeIndex === i ? " is-on" : ""}`}
            role="tab"
            aria-selected={activeIndex === i}
            onClick={() => goTo(i)}
          >
            <span>{tabLabels[slide]}</span>
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="mock-carousel">
        {/* Prev arrow */}
        <button
          className="mock-arrow mock-arrow-prev"
          aria-label={t("mock.prevLabel")}
          onClick={() => goTo(activeIndex - 1)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Viewport */}
        <div className="mock-viewport" ref={viewportRef}>
          <div className="mock-track" ref={trackRef}>

            {/* ====== Slide: Datasets ====== */}
            <div className={`mock-screen${activeIndex === 0 ? " is-active" : ""}`} data-mock-screen="datasets">
              <div className="mock-chrome">
                <div className="mock-dots"><span /><span /><span /></div>
                <div className="mock-url">dashAI · datasets / housing-2024.csv</div>
                <div className="mock-lang">EN ▾</div>
              </div>
              <div className="mock-body">
                <aside className="mock-sidebar">
                  <div className="mock-brand">
                    <svg viewBox="0 0 854 237.04" style={{ height: 18, width: "auto", color: "var(--ink-text)" }}>
                      <use href="#dashai-lockup" />
                    </svg>
                  </div>
                  <div className="mock-group">
                    <div className="mock-label">{t("mock.workspace")}</div>
                    <ul>
                      <li className="active"><span>{t("mock.datasets")}</span><span className="count">12</span></li>
                      <li><span>{t("mock.models")}</span><span className="count">28</span></li>
                      <li><span>{t("mock.generative")}</span><span className="count">5</span></li>
                      <li><span>{t("mock.plugins")}</span><span className="count">+</span></li>
                    </ul>
                  </div>
                  <div className="mock-group">
                    <div className="mock-label">{t("mock.ds.recentLabel")}</div>
                    <ul>
                      <li className="muted"><span>housing-2024.csv</span></li>
                      <li className="muted"><span>clinical_v3.csv</span></li>
                      <li className="muted"><span>nps_quarter.json</span></li>
                      <li className="muted"><span>+9 {t("mock.ds.more")}</span></li>
                    </ul>
                  </div>
                </aside>

                <div className="mock-main">
                  <div className="mock-breadcrumb">
                    <span>{t("mock.ds.bc")}</span>
                    <span className="cur">{t("mock.ds.bc2")}</span>
                  </div>
                  <div className="mock-h">housing-2024.csv</div>
                  <div className="mock-sub" dangerouslySetInnerHTML={th("mock.ds.sub")} />

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">price</div>
                        <div className="mock-ftype">float64</div>
                      </div>
                      <div className="mock-bar"><div className="bar-fill" style={{ width: "88%" }} /></div>
                      <div className="mock-fvalue">95k–2.4M</div>
                    </div>
                    <div className="mock-fdesc">{t("mock.ds.f1")}</div>
                  </div>

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">area_m2</div>
                        <div className="mock-ftype">float64</div>
                      </div>
                      <div className="mock-bar"><div className="bar-fill" style={{ width: "64%" }} /></div>
                      <div className="mock-fvalue">28–580</div>
                    </div>
                    <div className="mock-fdesc">{t("mock.ds.f2")}</div>
                  </div>

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">bedrooms</div>
                        <div className="mock-ftype">int8</div>
                      </div>
                      <div className="mock-bar"><div className="bar-fill" style={{ width: "42%" }} /></div>
                      <div className="mock-fvalue">1–7</div>
                    </div>
                    <div className="mock-fdesc">{t("mock.ds.f3")}</div>
                  </div>

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">location</div>
                        <div className="mock-ftype">categorical</div>
                      </div>
                      <div className="mock-select">
                        <span>{t("mock.ds.locationLevels")}</span>
                        <span style={{ color: "var(--ink-text-2)" }}>▾</span>
                      </div>
                      <div />
                    </div>
                    <div className="mock-fdesc">{t("mock.ds.f4")}</div>
                  </div>

                  <div className="mock-footer">
                    <div className="mock-status">
                      <span className="led" />
                      <span>{t("mock.ds.status")}</span>
                    </div>
                    <button className="mock-train">
                      <span>{t("mock.ds.cta")}</span> →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ====== Slide: Models ====== */}
            <div className={`mock-screen${activeIndex === 1 ? " is-active" : ""}`} data-mock-screen="models">
              <div className="mock-chrome">
                <div className="mock-dots"><span /><span /><span /></div>
                <div className="mock-url">dashAI · models / tabular-classification</div>
                <div className="mock-lang">EN ▾</div>
              </div>
              <div className="mock-body">
                <aside className="mock-sidebar">
                  <div className="mock-brand">
                    <svg viewBox="0 0 854 237.04" style={{ height: 18, width: "auto", color: "var(--ink-text)" }}>
                      <use href="#dashai-lockup" />
                    </svg>
                  </div>
                  <div className="mock-group">
                    <div className="mock-label">{t("mock.workspace")}</div>
                    <ul>
                      <li><span>{t("mock.datasets")}</span><span className="count">12</span></li>
                      <li className="active"><span>{t("mock.models")}</span><span className="count">28</span></li>
                      <li><span>{t("mock.generative")}</span><span className="count">5</span></li>
                      <li><span>{t("mock.plugins")}</span><span className="count">+</span></li>
                    </ul>
                  </div>
                  <div className="mock-group">
                    <div className="mock-label">{t("mock.catalog")}</div>
                    <ul>
                      <li><span>{t("mock.tabular")}</span><span className="count">30</span></li>
                      <li><span>NLP</span><span className="count">15</span></li>
                      <li><span>{t("mock.translation")}</span><span className="count">9</span></li>
                      <li><span>Vision</span><span className="count">11</span></li>
                    </ul>
                  </div>
                </aside>

                <div className="mock-main">
                  <div className="mock-breadcrumb">
                    <span>{t("mock.bc")}</span>
                    <span className="cur">{t("mock.bc2")}</span>
                  </div>
                  <div className="mock-h">RandomForestClassifier</div>
                  <div className="mock-sub" dangerouslySetInnerHTML={th("mock.sub")} />

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">n_estimators</div>
                        <div className="mock-ftype">int · 10–1000</div>
                      </div>
                      <div className="mock-slider">
                        <div className="track"><div className="fill" /><div className="thumb" /></div>
                      </div>
                      <div className="mock-fvalue">350</div>
                    </div>
                    <div className="mock-fdesc">{t("mock.f1")}</div>
                  </div>

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">max_depth</div>
                        <div className="mock-ftype">int | None</div>
                      </div>
                      <div className="mock-input">None</div>
                      <div />
                    </div>
                    <div className="mock-fdesc">{t("mock.f2")}</div>
                  </div>

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">criterion</div>
                        <div className="mock-ftype">enum</div>
                      </div>
                      <div className="mock-select">
                        <span>gini</span>
                        <span style={{ color: "var(--ink-text-2)" }}>▾</span>
                      </div>
                      <div />
                    </div>
                    <div className="mock-fdesc">{t("mock.f3")}</div>
                  </div>

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">bootstrap</div>
                        <div className="mock-ftype">bool</div>
                      </div>
                      <div>
                        <span className="mock-toggle"><span className="led" />True · ON</span>
                      </div>
                      <div />
                    </div>
                    <div className="mock-fdesc">{t("mock.f4")}</div>
                  </div>

                  <div className="mock-footer">
                    <div className="mock-status">
                      <span className="led" />
                      <span>{t("mock.status")}</span>
                    </div>
                    <button className="mock-train">
                      <span>{t("mock.train")}</span> →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ====== Slide: Generative ====== */}
            <div className={`mock-screen${activeIndex === 2 ? " is-active" : ""}`} data-mock-screen="gen">
              <div className="mock-chrome">
                <div className="mock-dots"><span /><span /><span /></div>
                <div className="mock-url">dashAI · generative / mistral-7b</div>
                <div className="mock-lang">EN ▾</div>
              </div>
              <div className="mock-body">
                <aside className="mock-sidebar">
                  <div className="mock-brand">
                    <svg viewBox="0 0 854 237.04" style={{ height: 18, width: "auto", color: "var(--ink-text)" }}>
                      <use href="#dashai-lockup" />
                    </svg>
                  </div>
                  <div className="mock-group">
                    <div className="mock-label">{t("mock.workspace")}</div>
                    <ul>
                      <li><span>{t("mock.datasets")}</span><span className="count">12</span></li>
                      <li><span>{t("mock.models")}</span><span className="count">28</span></li>
                      <li className="active"><span>{t("mock.generative")}</span><span className="count">5</span></li>
                      <li><span>{t("mock.plugins")}</span><span className="count">+</span></li>
                    </ul>
                  </div>
                  <div className="mock-group">
                    <div className="mock-label">{t("mock.gen.localLabel")}</div>
                    <ul>
                      <li><span>Llama</span><span className="count">8B</span></li>
                      <li className="muted"><span>Mistral</span><span className="count">7B</span></li>
                      <li className="muted"><span>Qwen</span><span className="count">7B</span></li>
                      <li className="muted"><span>SmolLM</span><span className="count">1.7B</span></li>
                    </ul>
                  </div>
                </aside>

                <div className="mock-main">
                  <div className="mock-breadcrumb">
                    <span>{t("mock.gen.bc")}</span>
                    <span className="cur">{t("mock.gen.bc2")}</span>
                  </div>
                  <div className="mock-h">Mistral · 7B-Instruct-v0.2</div>
                  <div className="mock-sub" dangerouslySetInnerHTML={th("mock.gen.sub")} />

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">temperature</div>
                        <div className="mock-ftype">float · 0.0–2.0</div>
                      </div>
                      <div className="mock-slider">
                        <div className="track">
                          <div className="fill" style={{ width: "35%" }} />
                          <div className="thumb" style={{ left: "35%" }} />
                        </div>
                      </div>
                      <div className="mock-fvalue">0.7</div>
                    </div>
                    <div className="mock-fdesc">{t("mock.gen.f1")}</div>
                  </div>

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">max_tokens</div>
                        <div className="mock-ftype">int · 16–4096</div>
                      </div>
                      <div className="mock-input">512</div>
                      <div />
                    </div>
                    <div className="mock-fdesc">{t("mock.gen.f2")}</div>
                  </div>

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">top_p</div>
                        <div className="mock-ftype">float · 0.0–1.0</div>
                      </div>
                      <div className="mock-slider">
                        <div className="track">
                          <div className="fill" style={{ width: "90%" }} />
                          <div className="thumb" style={{ left: "90%" }} />
                        </div>
                      </div>
                      <div className="mock-fvalue">0.9</div>
                    </div>
                    <div className="mock-fdesc">{t("mock.gen.f3")}</div>
                  </div>

                  <div className="mock-field">
                    <div className="mock-field-row">
                      <div>
                        <div className="mock-fname">stream</div>
                        <div className="mock-ftype">bool</div>
                      </div>
                      <div>
                        <span className="mock-toggle"><span className="led" />True · ON</span>
                      </div>
                      <div />
                    </div>
                    <div className="mock-fdesc">{t("mock.gen.f4")}</div>
                  </div>

                  <div className="mock-footer">
                    <div className="mock-status">
                      <span className="led" />
                      <span>{t("mock.gen.status")}</span>
                    </div>
                    <button className="mock-train">
                      <span>{t("mock.gen.cta")}</span> →
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /.mock-track */}
        </div>{/* /.mock-viewport */}

        {/* Next arrow */}
        <button
          className="mock-arrow mock-arrow-next"
          aria-label={t("mock.nextLabel")}
          onClick={() => goTo(activeIndex + 1)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>{/* /.mock-carousel */}

      {/* Pager dots */}
      <div className="mock-pager">
        <button
          className={activeIndex === 0 ? "is-on" : ""}
          aria-label={t("mock.tab.datasets")}
          onClick={() => goTo(0)}
        />
        <button
          className={activeIndex === 1 ? "is-on" : ""}
          aria-label={t("mock.tab.models")}
          onClick={() => goTo(1)}
        />
        <button
          className={activeIndex === 2 ? "is-on" : ""}
          aria-label={t("mock.tab.generative")}
          onClick={() => goTo(2)}
        />
      </div>
    </div>
  )
}
