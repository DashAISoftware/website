'use client'

import { useEffect, useState } from 'react'

// Tag of the latest dashAI release, for the BibTeX entry.
export function useGhVersion(fallback = 'v0.11.0') {
  const [version, setVersion] = useState(fallback)
  useEffect(() => {
    fetch('https://api.github.com/repos/DashAISoftware/dashAI/releases?per_page=1')
      .then((r) => (r.ok ? r.json() : null))
      .then((releases) => {
        if (releases?.[0]?.tag_name) setVersion(releases[0].tag_name)
      })
      .catch(() => {})
  }, [])
  return version
}
