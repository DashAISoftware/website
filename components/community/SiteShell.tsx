'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import i18n from '@/app/i18n'
import { SvgDefs } from '@/components/community/SvgDefs'
import { Navbar } from '@/components/community/Navbar'
import { Footer } from '@/components/community/Footer'
import { legacyPath } from '@/lib/routes'

const LANGS = ['es', 'en', 'pt', 'de', 'zh']

// Frame shared by every page: icons, navbar and footer.
export function SiteShell({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Restore the saved language
    try {
      const saved = localStorage.getItem('dashai-lang')
      if (saved && LANGS.includes(saved)) i18n.changeLanguage(saved)
    } catch {}

    // Links from before the site had real pages ("/#faq") still land on the right one
    if (window.location.pathname === '/') {
      const to = legacyPath(window.location.hash)
      if (to) router.replace(to)
    }
  }, [router])

  return (
    <>
      <SvgDefs />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
