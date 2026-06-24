"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from 'react-i18next'
import '@/app/i18n'

const SLIDES = ["datasets", "models", "generative"] as const
type SlideId = (typeof SLIDES)[number]

export function AppMockup() {
  const { t, i18n } = useTranslation('home')
  const th = (key: string) => ({ __html: t(key) })

  const [activeIndex, setActiveIndex] = useState(1) // default: models
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
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

  useEffect(() => {
    if (!lightboxSrc) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxSrc(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxSrc])

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
    <>
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
                <div className="mock-url">dashAI | datasets / housing-2024.csv</div>
              </div>
              <div className="mock-img-wrap" style={{ lineHeight: 0 }} onClick={() => setLightboxSrc("/images/datasets.png")}>
                <img src="/images/datasets.png" alt="dashAI datasets view" style={{ width: '100%', display: 'block' }} />
                <div className="mock-zoom-hint" aria-hidden="true">🔍</div>
              </div>
            </div>

            {/* ====== Slide: Models ====== */}
            <div className={`mock-screen${activeIndex === 1 ? " is-active" : ""}`} data-mock-screen="models">
              <div className="mock-chrome">
                <div className="mock-dots"><span /><span /><span /></div>
                <div className="mock-url">dashAI | models / tabular-classification</div>
              </div>
              <div className="mock-img-wrap" style={{ lineHeight: 0 }} onClick={() => setLightboxSrc("/images/models.png")}>
                <img src="/images/models.png" alt="dashAI models view" style={{ width: '100%', display: 'block' }} />
                <div className="mock-zoom-hint" aria-hidden="true">🔍</div>
              </div>
            </div>

            {/* ====== Slide: Generative ====== */}
            <div className={`mock-screen${activeIndex === 2 ? " is-active" : ""}`} data-mock-screen="gen">
              <div className="mock-chrome">
                <div className="mock-dots"><span /><span /><span /></div>
                <div className="mock-url">dashAI | generative / mistral-7b</div>
              </div>
              <div className="mock-img-wrap" style={{ lineHeight: 0 }} onClick={() => setLightboxSrc("/images/generative.png")}>
                <img src="/images/generative.png" alt="dashAI generative view" style={{ width: '100%', display: 'block' }} />
                <div className="mock-zoom-hint" aria-hidden="true">🔍</div>
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

    {lightboxSrc && typeof document !== "undefined" && createPortal(
      <div className="mock-lightbox" onClick={() => setLightboxSrc(null)}>
        <button className="mock-lightbox-close" onClick={() => setLightboxSrc(null)} aria-label="Cerrar">✕</button>
        <img
          src={lightboxSrc}
          alt="Vista ampliada"
          className="mock-lightbox-img"
          onClick={e => e.stopPropagation()}
        />
      </div>,
      document.body
    )}
    </>
  )
}
