export interface ReleaseAsset {
  name: string
  browser_download_url: string
  size: number
  download_count?: number
}

export interface Release {
  tag_name: string
  html_url: string
  published_at: string
  draft: boolean
  prerelease: boolean
  assets: ReleaseAsset[]
}

export type Platform = "windows" | "mac_arm" | "mac_intel" | "linux"
export const PLATFORMS: Platform[] = ["windows", "mac_arm", "mac_intel", "linux"]

export interface LatestRelease {
  tag_name: string
  assets: ReleaseAsset[]
}

export async function getLatestRelease(): Promise<LatestRelease | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/DashAISoftware/DashAI/releases/latest",
      { headers: { Accept: "application/vnd.github+json" } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

// All published releases, newest first (drafts and pre-releases left out).
export async function getReleases(): Promise<Release[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/DashAISoftware/DashAI/releases?per_page=100",
      { headers: { Accept: "application/vnd.github+json" } }
    )
    if (!res.ok) return []
    const data: Release[] = await res.json()
    return data.filter((r) => !r.draft && !r.prerelease)
  } catch {
    return []
  }
}

// The installer assets of a release, by platform. Releases before 0.3.0 only
// ship example datasets, so they come back empty.
export function installers(assets: ReleaseAsset[]): Partial<Record<Platform, ReleaseAsset>> {
  const out: Partial<Record<Platform, ReleaseAsset>> = {}
  for (const p of PLATFORMS) {
    const a = findAsset(assets, p)
    if (a) out[p] = a
  }
  return out
}

export function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024)
  return `${Math.round(mb)} MB`
}

export function findAsset(
  assets: ReleaseAsset[],
  platform: Platform
): ReleaseAsset | undefined {
  return assets.find(({ name }) => {
    const n = name.toLowerCase()
    const mac = n.includes("osx") || n.includes("mac") || n.includes("darwin")
    switch (platform) {
      case "windows":
        return n.includes("windows") || n.endsWith(".exe")
      case "linux":
        return n.includes("linux") || n.includes("appimage")
      case "mac_arm":
        return mac && (n.includes("arm") || n.includes("aarch"))
      case "mac_intel":
        return mac && (n.includes("x64") || n.includes("x86_64") || n.includes("intel"))
    }
  })
}
