"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Package } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { findAsset, formatBytes, getLatestRelease } from "@/lib/github"

const SOURCEFORGE_URL = "https://sourceforge.net/projects/dashai/files/latest/download"

type DownloadEntry = {
  id: "mac_intel" | "mac_arm" | "windows"
  icon: typeof Package
  key: string
  defaultPlatform: string
  version: string
  size: string
  defaultFormat: string
  link: string
}

const FALLBACK_DOWNLOADS: DownloadEntry[] = [
  {
    id: "mac_intel",
    icon: Package,
    key: "macIntel",
    defaultPlatform: "macOS Intel processors",
    version: "",
    size: "",
    defaultFormat: ".dmg",
    link: SOURCEFORGE_URL,
  },
  {
    id: "mac_arm",
    icon: Package,
    key: "macArm",
    defaultPlatform: "macOS ARM processors",
    version: "",
    size: "",
    defaultFormat: ".dmg",
    link: SOURCEFORGE_URL,
  },
  {
    id: "windows",
    icon: Package,
    key: "windows",
    defaultPlatform: "Windows",
    version: "",
    size: "",
    defaultFormat: ".exe",
    link: SOURCEFORGE_URL,
  },
]

const TRACKER_URL = process.env.NEXT_PUBLIC_TRACKER_URL

async function trackClick(buttonId: string) {
  if (!TRACKER_URL) return
  try {
    await fetch(`${TRACKER_URL}/click/${buttonId}`, {
      method: "POST",
    })
  } catch {
    // non-blocking — don't let tracking errors affect the download
  }
}

export function DownloadSection() {
  const { t } = useTranslation()
  const [downloads, setDownloads] = useState<DownloadEntry[]>(FALLBACK_DOWNLOADS)

  useEffect(() => {
    getLatestRelease().then((release) => {
      if (!release) return
      setDownloads(
        FALLBACK_DOWNLOADS.map((entry) => {
          const asset = findAsset(release.assets, entry.id)
          if (!asset) return entry
          return {
            ...entry,
            version: release.tag_name,
            size: formatBytes(asset.size),
            link: asset.browser_download_url,
          }
        })
      )
    })
  }, [])

  return (
    <section id="download" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-balance">
            {t("download:title", { defaultValue: "Download DashAI" })}
          </h2>
          <span className="block text-base text-primary font-semibold mb-4">
            {t("download:badge", { defaultValue: "Beta Version" })}
          </span>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("download:description", {
              defaultValue:
                "This early version lets you explore DashAI's main features. We appreciate your feedback to help us improve before the official release.",
            })}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {downloads.map((download) => {
              const Icon = download.icon
              const platform = t(`download:cards.${download.key}.platform`, {
                defaultValue: download.defaultPlatform,
              })
              const format = t(`download:cards.${download.key}.format`, {
                defaultValue: download.defaultFormat,
              })
              return (
                <Card
                  key={download.key}
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{platform}</h3>
                    <div className="space-y-1 mb-4">
                      {download.version && (
                        <p className="text-sm text-muted-foreground">
                          {download.version} • {download.size}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground font-mono">{format}</p>
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                      size="sm"
                      asChild
                    >
                      <a href={download.link} onClick={() => trackClick(download.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        {t("download:button", { defaultValue: "Download" })}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("download:pip.title", { defaultValue: "Install via pip" })}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("download:pip.subtitle", {
                      defaultValue: "For developers who prefer command-line installation",
                    })}
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm border border-border">
                    <code className="text-primary">
                      {t("download:pip.command", { defaultValue: "pip install dashai" })}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
