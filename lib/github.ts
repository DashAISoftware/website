export interface ReleaseAsset {
  name: string
  browser_download_url: string
  size: number
}

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

export function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024)
  return `${Math.round(mb)} MB`
}

export function findAsset(
  assets: ReleaseAsset[],
  platform: "windows" | "mac_intel" | "mac_arm"
): ReleaseAsset | undefined {
  return assets.find(({ name }) => {
    const n = name.toLowerCase()
    switch (platform) {
      case "windows":
        return n.includes("windows")
      case "mac_intel":
        return (
          (n.includes("x64") || n.includes("intel")) &&
          (n.includes("osx") || n.includes("mac") || n.includes("darwin"))
        )
      case "mac_arm":
        return (
          (n.includes("arm") || n.includes("aarch")) &&
          (n.includes("osx") || n.includes("mac") || n.includes("darwin"))
        )
    }
  })
}
