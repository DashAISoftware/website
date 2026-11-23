'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { demoEmbedUrl } from '@/lib/demo'

// The product demo, embedded in the page. Until someone presses play it is only
// a local poster image: nothing is loaded from YouTube before that click.
export function DemoEmbed() {
  const { t } = useTranslation('home')
  const [playing, setPlaying] = useState(false)

  return (
    <figure className="hm-demo">
      <div className="hm-demo-frame">
        {playing ? (
          <iframe
            src={demoEmbedUrl()}
            aria-label={t('hero.demo.title')}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="hm-demo-poster" onClick={() => setPlaying(true)} aria-label={t('about.demo.play')}>
            <img src="/images/home/demo-poster.jpg" alt="" width={1280} height={720} loading="lazy" />
            <span className="hm-demo-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.5 4.8v14.4a1 1 0 0 0 1.52.85l11.5-7.2a1 1 0 0 0 0-1.7L9.02 3.95A1 1 0 0 0 7.5 4.8Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="hm-demo-cap">
        <span>{t('about.demo.cap')}</span>
        <span className="hm-demo-src">{t('about.demo.src')}</span>
      </figcaption>
    </figure>
  )
}
