export interface Stats {
  github:      { downloads: number; stars: number }
  website:     { downloads: number }
  sourceForge: { downloads: number }
  pypi:        { downloads: number }
}

// TODO: swap for real fetch when endpoint is ready
// export const STATS_URL = process.env.NEXT_PUBLIC_STATS_URL ?? ''
export const STATS_PLACEHOLDER: Stats = {
  github:      { downloads: 173,  stars: 76  },
  website:     { downloads: 108             },
  sourceForge: { downloads: 59              },
  pypi:        { downloads: 2205            },
}

export function totalDownloads(s: Stats): number {
  return s.github.downloads + s.website.downloads + s.sourceForge.downloads + s.pypi.downloads
}
