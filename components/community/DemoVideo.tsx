'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'
import { demoEmbedUrl } from '@/lib/demo'

// "Ver demo" button for the home hero. The YouTube player is only created when
// the modal opens, so the page loads nothing from YouTube until someone clicks.
export function DemoVideo() {
  const { t } = useTranslation('home')
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <button ref={triggerRef} type="button" className="btn" onClick={() => setOpen(true)}>
        <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px' }} fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5Z" />
        </svg>
        <span>{t('hero.cta.demo')}</span>
      </button>

      {open && createPortal(
        <div className="demo-modal" role="dialog" aria-modal="true" aria-label={t('hero.demo.title')} onClick={() => setOpen(false)}>
          <button ref={closeRef} type="button" className="mock-lightbox-close" onClick={() => setOpen(false)} aria-label={t('hero.demo.close')}>✕</button>
          <div className="demo-frame" onClick={e => e.stopPropagation()}>
            {/* aria-label, not title: a title shows a tooltip over the player on hover */}
            <iframe
              src={demoEmbedUrl()}
              aria-label={t('hero.demo.title')}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
