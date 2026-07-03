'use client'

import { useEffect, useState } from 'react'
import { getCachedStats, setCachedStats, STATS_PLACEHOLDER, STATS_URL } from './stats'
import type { Stats } from './stats'

/**
 * Stale-while-revalidate: shows the last cached value instantly (if any)
 * while refetching in the background, so the page never has to wait on
 * the tracker's own cache refresh. Only shows as "loading" on a first-ever
 * visit with nothing cached yet.
 */
export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const cached = getCachedStats()
    if (cached) {
      setStats(cached)
      setIsLoading(false)
    }

    if (!STATS_URL) {
      setStats(prev => prev ?? STATS_PLACEHOLDER)
      setIsLoading(false)
      return
    }

    fetch(STATS_URL)
      .then(r => (r.ok ? r.json() : null))
      .then((data: Stats | null) => {
        if (data) {
          setStats(data)
          setCachedStats(data)
        } else {
          setStats(prev => prev ?? STATS_PLACEHOLDER)
        }
      })
      .catch(() => setStats(prev => prev ?? STATS_PLACEHOLDER))
      .finally(() => setIsLoading(false))
  }, [])

  return { stats, isLoading }
}
