'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'

const REPO = 'https://github.com/DashAISoftware/DashAI'

function citation(version: string, year: number) {
  return `@software{dashai_${year},
  title   = {dashAI: A graphical toolbox for training, evaluating
             and deploying state-of-the-art AI models},
  author  = {dashAI Development Team},
  year    = {${year}},
  version = {${version.replace(/^v/, '')}},
  url     = {${REPO}}
}`
}

// BibTeX entry with a copy button, shown on the home page and the contribute page.
export function CitationBox({ version }: { version: string }) {
  const { t } = useTranslation('home')
  const [copied, setCopied] = useState(false)
  const bib = citation(version, new Date().getFullYear())

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(bib)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="hm-cite">
      <pre suppressHydrationWarning>{bib}</pre>
      <button type="button" className="hm-cite-copy" onClick={copyCitation} aria-live="polite">
        {copied ? t('cite.copied') : t('cite.copy')}
      </button>
    </div>
  )
}
