'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'

const SLIDES = [
  { src: '/images/home/tour-inicio.gif', key: 'tour.1' },
  { src: '/images/home/tour-datos.gif', key: 'tour.2' },
  { src: '/images/home/tour-modelos.gif', key: 'tour.3' },
]
const INTERVAL_MS = 6000
// The front card drops away before the next one comes forward.
const SWAP_MS = 700

// Stacked cards with app recordings. Advances on its own, pauses on hover or
// focus, and stays still when the visitor prefers reduced motion.
export function TourCarousel() {
  const { t } = useTranslation('home')
  const [slide, setSlide] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reduce, setReduce] = useState(false)
  const swapRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const n = SLIDES.length

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const goTo = useCallback((i: number) => {
    const target = (i + n) % n
    if (target === slide || leaving) return
    if (reduce) { setSlide(target); return }
    setLeaving(true)
    if (swapRef.current) clearTimeout(swapRef.current)
    swapRef.current = setTimeout(() => {
      setLeaving(false)
      setSlide(target)
    }, SWAP_MS)
  }, [n, slide, leaving, reduce])

  useEffect(() => {
    if (reduce || paused) return
    const id = setInterval(() => goTo(slide + 1), INTERVAL_MS)
    return () => clearInterval(id)
  }, [reduce, paused, slide, goTo])

  useEffect(() => () => { if (swapRef.current) clearTimeout(swapRef.current) }, [])

  return (
    <figure
      className="tour"
      aria-roledescription="carousel"
      aria-label={t('tour.label')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="tour-stack">
        <div className="tour-ratio" aria-hidden="true" />
        {SLIDES.map((s, i) => {
          const depth = (i - slide + n) % n
          const state = depth === 0 ? (leaving ? 'leaving' : 'front') : depth === 1 ? 'second' : 'third'
          return (
            <div key={s.src} className="tour-card" data-state={state} aria-hidden={depth !== 0}>
              <img
                src={s.src}
                alt={t(`${s.key}.alt`)}
                width={960}
                height={600}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          )
        })}
      </div>
      <figcaption className="tour-caption">
        <span className="tour-caption-text" aria-live="polite">{t(`${SLIDES[slide].key}.cap`)}</span>
        <span className="tour-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t('tour.go', { n: i + 1, total: n })}
              aria-current={i === slide}
            >
              <span />
            </button>
          ))}
        </span>
      </figcaption>
    </figure>
  )
}
