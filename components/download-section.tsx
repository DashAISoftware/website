"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Package } from "lucide-react"

const downloads = [
  {
    id: "mac_intel",
    icon: Package,
    platform: "macOS Intel processors",
    version: "v0.1.15",
    size: "487 MB",
    format: "binary",
    link: "https://dashai.nyc3.cdn.digitaloceanspaces.com/executables/DashAI-launcher-cpu-x86_64",
  },
  {
    id: "mac_arm",
    icon: Package,
    platform: "macOS ARM processors",
    version: "v0.1.15",
    size: "381 MB",
    format: "binary",
    link: "https://dashai.nyc3.cdn.digitaloceanspaces.com/executables/DashAI-launcher-cpu-arm64",
  },
  {
    id: "windows",
    icon: Package,
    platform: "Windows",
    version: "v0.1.15",
    size: "434 MB",
    format: ".exe",
    link: "https://dashai.nyc3.cdn.digitaloceanspaces.com/executables/DashAI-launcher-cpu.exe",
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
  return (
    <section id="download" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-balance">Download DashAI</h2>
          <span className="block text-base text-primary font-semibold mb-4">Beta Version</span>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This early version lets you explore DashAI&apos;s main features. We appreciate your feedback to help us
            improve before the official release.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {downloads.map((download) => {
              const Icon = download.icon
              return (
                <Card
                  key={download.id}
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{download.platform}</h3>
                    <div className="space-y-1 mb-4">
                      <p className="text-sm text-muted-foreground">
                        {download.version} • {download.size}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">{download.format}</p>
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                      size="sm"
                      asChild
                    >
                      <a href={download.link} download onClick={() => trackClick(download.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
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
                  <h3 className="text-xl font-semibold mb-2">Install via pip</h3>
                  <p className="text-muted-foreground text-sm">For developers who prefer command-line installation</p>
                </div>
                <div className="w-full md:w-auto">
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm border border-border">
                    <code className="text-primary">pip install dashai</code>
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