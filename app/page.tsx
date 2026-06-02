'use client'

import { useState, useEffect } from 'react'
import '@/app/i18n'
import { SvgDefs } from '@/components/community/SvgDefs'
import { Navbar } from '@/components/community/Navbar'
import { Footer } from '@/components/community/Footer'
import { HomeRoute } from '@/components/community/routes/HomeRoute'
import { ContributeRoute } from '@/components/community/routes/ContributeRoute'
import { ModelsRoute } from '@/components/community/routes/ModelsRoute'
import { DownloadRoute } from '@/components/community/routes/DownloadRoute'
import { PluginsRoute } from '@/components/community/routes/PluginsRoute'
import { CommunityRoute } from '@/components/community/routes/CommunityRoute'
import { AboutRoute } from '@/components/community/routes/AboutRoute'
import i18n from '@/app/i18n'

function getRouteFromHash(hash: string): { route: string; isSubAnchor: boolean } {
  const rawHash = (hash || '#home').replace(/^#/, '') || 'home'
  const isSubAnchor = rawHash === 'first-pr' || rawHash.startsWith('guide-')
  return { route: isSubAnchor ? 'contribute' : rawHash, isSubAnchor }
}

export default function Page() {
  const [route, setRoute] = useState('home')
  const [scrollTarget, setScrollTarget] = useState<string | null>(null)
  const [ghVersion, setGhVersion] = useState('v0.9.3-alpha')

  // After route renders, scroll to pending target and highlight it
  useEffect(() => {
    if (!scrollTarget) return
    const target = document.getElementById(scrollTarget)
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Highlight: remove previous, add to target (replicates :target behavior)
        document.querySelectorAll('.guide.is-target').forEach(el => el.classList.remove('is-target'))
        target.classList.add('is-target')
      }, 30)
      setScrollTarget(null)
    }
  }, [route, scrollTarget])

  useEffect(() => {
    // Restore saved language
    try {
      const saved = localStorage.getItem('dashai-lang')
      if (saved && ['es', 'en', 'pt'].includes(saved)) i18n.changeLanguage(saved)
    } catch {}

    // Set initial route
    const { route: initial, isSubAnchor } = getRouteFromHash(window.location.hash)
    setRoute(initial)
    if (isSubAnchor) setScrollTarget(window.location.hash.slice(1))
    else window.scrollTo({ top: 0, behavior: 'instant' })

    function handleHashChange() {
      const { route: next, isSubAnchor } = getRouteFromHash(window.location.hash)
      setRoute(next)
      if (isSubAnchor) setScrollTarget(window.location.hash.slice(1))
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    fetch('https://api.github.com/repos/DashAISoftware/DashAI/releases?per_page=1')
      .then(r => r.ok ? r.json() : null)
      .then(releases => { if (releases?.[0]?.tag_name) setGhVersion(releases[0].tag_name) })
      .catch(() => {})
  }, [])

  return (
    <>
      <SvgDefs />
      <Navbar route={route} />
      {route === 'home'       && <HomeRoute ghVersion={ghVersion} />}
      {route === 'contribute' && <ContributeRoute />}
      {route === 'models'     && <ModelsRoute />}
      {route === 'download'   && <DownloadRoute />}
      {route === 'plugins'    && <PluginsRoute />}
      {route === 'community'  && <CommunityRoute />}
      {route === 'about'      && <AboutRoute />}
      <Footer />
    </>
  )
}
