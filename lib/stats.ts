export interface Stats {
  updatedAt?:  string
  github:      { downloads: number; stars: number }
  website:     { downloads: number }
  sourceForge: { downloads: number }
  pypi:        { downloads: number }
}

export const STATS_URL = process.env.NEXT_PUBLIC_TRACKER_URL ? `${process.env.NEXT_PUBLIC_TRACKER_URL}/stats` : ''
export const STATS_PLACEHOLDER: Stats = {
  github:      { downloads: 173,  stars: 75  },
  website:     { downloads: 108             },
  sourceForge: { downloads: 59              },
  pypi:        { downloads: 2205            },
}

export function totalDownloads(s: Stats): number {
  return s.github.downloads + s.website.downloads + s.sourceForge.downloads + s.pypi.downloads
}

const CACHE_KEY = 'dashai-stats-cache'

export function getCachedStats(): Stats | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as Stats) : null
  } catch {
    return null
  }
}

export function setCachedStats(stats: Stats): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(stats))
  } catch {}
}
