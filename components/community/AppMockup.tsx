"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { demoEmbedUrl } from '@/lib/demo'

const SLIDES = ["datasets", "models", "generative", "demo"] as const
type SlideId = (typeof SLIDES)[number]

// Only the screenshot slides open in the lightbox; the demo slide plays a video.
const SLIDE_IMAGES = [
  "/images/datasets.png",
  "/images/models.png",
  "/images/generative.png",
]
const DEMO_INDEX = SLIDES.indexOf("demo")

export function AppMockup() {
  const { t, i18n } = useTranslation('home')
  const th = (key: string) => ({ __html: t(key) })

  const [activeIndex, setActiveIndex] = useState(1) // default: models
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  // The YouTube player only exists while the demo is playing: nothing loads from
  // YouTube until the visitor clicks play, and leaving the slide stops the video.
  const [demoPlaying, setDemoPlaying] = useState(false)
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
    if (lightboxIndex === null) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft")  lightboxGoTo(lightboxIndex - 1)
      if (e.key === "ArrowRight") lightboxGoTo(lightboxIndex + 1)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [lightboxIndex])

  useEffect(() => {
    if (activeIndex !== DEMO_INDEX) setDemoPlaying(false)
  }, [activeIndex])

  const goTo = (index: number) => {
    const n = SLIDES.length
    setActiveIndex(((index % n) + n) % n)
  }

  const closeLightbox = () => setLightboxIndex(null)

  const lightboxGoTo = (index: number) => {
    const n = SLIDE_IMAGES.length
    const next = ((index % n) + n) % n
    setLightboxIndex(next)
    setActiveIndex(next)
  }

  const tabLabels: Record<SlideId, string> = {
    datasets: t("sho.tab.datasets"),
    models: t("sho.tab.models"),
    generative: t("sho.tab.gen"),
    demo: t("sho.tab.demo"),
  }

  const pagerLabels: Record<SlideId, string> = {
    datasets: t("mock.tab.datasets"),
    models: t("mock.tab.models"),
    generative: t("mock.tab.generative"),
    demo: t("mock.tab.demo"),
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
              <div className="mock-img-wrap" style={{ lineHeight: 0 }} onClick={() => setLightboxIndex(0)}>
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
              <div className="mock-img-wrap" style={{ lineHeight: 0 }} onClick={() => setLightboxIndex(1)}>
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
              <div className="mock-img-wrap" style={{ lineHeight: 0 }} onClick={() => setLightboxIndex(2)}>
                <img src="/images/generative.png" alt="dashAI generative view" style={{ width: '100%', display: 'block' }} />
                <div className="mock-zoom-hint" aria-hidden="true">🔍</div>
              </div>
            </div>

            {/* ====== Slide: Demo video ====== */}
            <div className={`mock-screen${activeIndex === DEMO_INDEX ? " is-active" : ""}`} data-mock-screen="demo">
              <div className="mock-chrome">
                <div className="mock-dots"><span /><span /><span /></div>
                <div className="mock-url">dashAI | demo</div>
              </div>
              <div className="mock-demo">
                {demoPlaying ? (
                  <iframe
                    src={demoEmbedUrl()}
                    aria-label={t("mock.demo.title")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    className="mock-demo-poster"
                    aria-label={t("mock.demo.play")}
                    tabIndex={activeIndex === DEMO_INDEX ? 0 : -1}
                    onClick={() => { goTo(DEMO_INDEX); setDemoPlaying(true) }}
                  >
                    <img src="/images/demo-poster.jpg" alt="" />
                    <span className="mock-demo-play" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5Z" /></svg>
                    </span>
                  </button>
                )}
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
        {SLIDES.map((slide, i) => (
          <button
            key={slide}
            className={activeIndex === i ? "is-on" : ""}
            aria-label={pagerLabels[slide]}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

    </div>

    {lightboxIndex !== null && typeof document !== "undefined" && createPortal(
      <div className="mock-lightbox" onClick={closeLightbox}>
        <button className="mock-lightbox-close" onClick={closeLightbox} aria-label="Cerrar">✕</button>
        <button className="mock-lightbox-arrow mock-lightbox-prev" onClick={e => { e.stopPropagation(); lightboxGoTo(lightboxIndex - 1) }} aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <img
          src={SLIDE_IMAGES[lightboxIndex]}
          alt="Vista ampliada"
          className="mock-lightbox-img"
          onClick={e => e.stopPropagation()}
        />
        <button className="mock-lightbox-arrow mock-lightbox-next" onClick={e => { e.stopPropagation(); lightboxGoTo(lightboxIndex + 1) }} aria-label="Siguiente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>,
      document.body
    )}
    </>
  )
}
