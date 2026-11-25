'use client'

import { useEffect, useState, type MouseEvent } from 'react'

// Tracks which section of a page is being read, for the sticky side index.
// Sections must carry the id `${prefix}${id}`.
export function useActiveSection(ids: string[], prefix: string) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) setActive(en.target.id.slice(prefix.length))
      })
    }, { rootMargin: '-80px 0px -70% 0px' })
    key.split('|').forEach((id) => {
      const el = document.getElementById(`${prefix}${id}`)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [key, prefix])

  // Scroll in place instead of going through the hash router; pushState keeps
  // the URL shareable without firing a hashchange.
  function jumpTo(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(`${prefix}${id}`)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.pushState(null, '', `#${prefix}${id}`)
    setActive(id)
  }

  return { active, jumpTo }
}
