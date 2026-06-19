"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { findAsset, formatBytes, getLatestRelease } from "@/lib/github"
import { siteConfig } from "@/lib/config"

const SOURCEFORGE_URL = "https://sourceforge.net/projects/dashai/files/latest/download"
const TRACKER_URL = process.env.NEXT_PUBLIC_TRACKER_URL

async function trackClick(buttonId: string) {
  if (!TRACKER_URL) return
  try { await fetch(`${TRACKER_URL}/click/${buttonId}`, { method: "POST" }) } catch {}
}

type ExeEntry = { id: "mac_intel" | "mac_arm" | "windows"; os: string; ext: string; link: string; version: string; size: string }

const FALLBACK: ExeEntry[] = [
  { id: "windows",  os: "Windows", ext: ".exe",      link: SOURCEFORGE_URL, version: "", size: "" },
  { id: "mac_arm",  os: "macOS (ARM)", ext: ".dmg",  link: SOURCEFORGE_URL, version: "", size: "" },
  { id: "mac_intel",os: "macOS (Intel)", ext: ".dmg",link: SOURCEFORGE_URL, version: "", size: "" },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }
  return (
    <button
      onClick={copy}
      className="absolute top-2 right-2 font-mono text-[10px] px-2 py-1 border border-border rounded text-muted-foreground hover:text-[#A7C7FF] hover:border-primary transition-all"
    >
      {copied ? "✓ copied" : "copy"}
    </button>
  )
}

export function DownloadSection() {
  const { t } = useTranslation("download")
  const [exes, setExes] = useState<ExeEntry[]>(FALLBACK)
  const [releaseTag, setReleaseTag] = useState("v0.9.3-alpha")

  useEffect(() => {
    getLatestRelease().then(release => {
      if (!release) return
      setReleaseTag(release.tag_name)
      setExes(FALLBACK.map(entry => {
        const asset = findAsset(release.assets, entry.id)
        if (!asset) return entry
        return { ...entry, version: release.tag_name, size: formatBytes(asset.size), link: asset.browser_download_url }
      }))
    })
  }, [])

  const pipCmd = "pip install dashai\ndashai"

  return (
    <section
      id="download"
      className="relative overflow-hidden border-b border-border"
      style={{
        padding: "clamp(80px,11vw,160px) clamp(20px,5vw,96px)",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Horizontal line pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 22px, rgba(167,199,255,.04) 22px 23px)" }} />

      {/* Head */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-20 mb-12 md:mb-18 items-end">
        <div>
          <div className="font-mono text-xs tracking-[.1em] uppercase text-primary">
            <span className="block w-12 h-[3px] mb-[18px] bg-primary" />
            [ 04 ] {t("sectionLabel")}
          </div>
        </div>
        <div>
          <h2
            className="font-medium leading-[.96] text-foreground mb-4"
            style={{ fontSize: "clamp(48px,7vw,96px)", letterSpacing: "-.04em" }}
          >
            <em className="not-italic text-[#A7C7FF]">{t("heading")}</em> dashAI.
          </h2>
          <div className="font-mono text-xs text-muted-foreground tracking-[.08em] flex flex-wrap gap-x-3 gap-y-1">
            <strong className="text-foreground font-medium">{releaseTag}</strong>
            <span>|</span><span>MIT License</span>
            <span>|</span><span>Linux | macOS | Windows</span>
            <span>|</span><span>{t("releaseMonth")}</span>
          </div>
        </div>
      </div>

      {/* 3-col grid */}
      <div
        className="relative z-10 grid gap-px"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {/* Card 1 - executables */}
        <div className="flex flex-col p-7 min-h-[280px]" style={{ background: "var(--card)" }}>
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[.12em] text-muted-foreground mb-3.5">
            <span className="bg-primary text-primary-foreground font-semibold text-[10px] px-[7px] py-[2px] rounded">01</span>
            {t("executables.badge")}
          </div>
          <h3 className="text-2xl font-semibold tracking-tight mb-2.5">{t("executables.title")}</h3>
          <p className="text-sm text-muted-foreground leading-[1.5] mb-4">
            {t("executables.description")}
          </p>
          <div className="flex flex-col border border-border rounded-md overflow-hidden mb-4">
            {exes.map((e, i) => (
              <a
                key={e.id}
                href={e.link}
                target="_blank"
                rel="noopener"
                onClick={() => trackClick(e.id)}
                className="flex items-center justify-between px-4 py-3 font-mono text-sm transition-all duration-200"
                style={{
                  background: "var(--ink-deep)",
                  borderBottom: i < exes.length - 1 ? "1px solid var(--border)" : "none",
                  color: "var(--foreground)",
                }}
                onMouseEnter={e2 => {
                  const el = e2.currentTarget as HTMLElement
                  el.style.background = "color-mix(in oklab, var(--primary) 20%, var(--ink-deep))"
                  el.style.color = "#A7C7FF"
                }}
                onMouseLeave={e2 => {
                  const el = e2.currentTarget as HTMLElement
                  el.style.background = "var(--ink-deep)"
                  el.style.color = "var(--foreground)"
                }}
              >
                <span className="font-medium">{e.os}</span>
                <span className="text-[11px] text-muted-foreground flex-1 ml-3.5">{e.ext}{e.size ? ` | ${e.size}` : ""}</span>
                <span className="text-[#A7C7FF] text-sm">↓</span>
              </a>
            ))}
          </div>
          <a
            href={siteConfig.github.releases}
            target="_blank"
            rel="noopener"
            className="mt-auto font-mono text-xs text-[#A7C7FF] flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
          >
            {t("executables.viewReleases")} →
          </a>
        </div>

        {/* Card 2 - pip */}
        <div className="flex flex-col p-7 min-h-[280px]" style={{ background: "var(--card)" }}>
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[.12em] text-muted-foreground mb-3.5">
            <span className="bg-primary text-primary-foreground font-semibold text-[10px] px-[7px] py-[2px] rounded">02</span>
            PyPI
          </div>
          <h3 className="text-2xl font-semibold tracking-tight mb-2.5">{t("pip.title")}</h3>
          <p className="text-sm text-muted-foreground leading-[1.5] mb-4">
            <code className="font-mono text-xs">dashai</code> {t("pip.descriptionMiddle")} <code className="font-mono text-xs">localhost:8000</code>.
          </p>
          <div className="relative border border-border rounded-md p-4 font-mono text-sm leading-[1.7] mb-4" style={{ background: "var(--ink-deep)" }}>
            <CopyButton text={pipCmd} />
            <div><span className="text-[#A7C7FF]">$</span> pip install dashai</div>
            <div><span className="text-[#A7C7FF]">$</span> dashai</div>
            <div className="text-muted-foreground mt-1 text-xs italic">
              # {t("pip.comment")}
            </div>
          </div>
          <a
            href="https://pypi.org/project/dashai/"
            target="_blank"
            rel="noopener"
            className="mt-auto font-mono text-xs text-[#A7C7FF] flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
          >
            {t("pip.viewOnPyPI")} →
          </a>
        </div>

        {/* Card 3 - requirements */}
        <div className="flex flex-col p-7 min-h-[280px]" style={{ background: "var(--card)" }}>
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[.12em] text-muted-foreground mb-3.5">
            <span className="font-semibold text-[10px] px-[7px] py-[2px] rounded border border-border">⊳</span>
            {t("requirements.badge")}
          </div>
          <h3 className="text-xl font-semibold tracking-tight mb-4">{t("requirements.title")}</h3>
          <ul className="flex flex-col gap-3.5 flex-1">
            {[
              { k: "Python", v: "≥ 3.10",                  note: t("requirements.items.python.note") },
              { k: "RAM",    v: "8 GB",                     note: t("requirements.items.ram.note") },
              { k: "OS",     v: "Linux | macOS | Windows",  note: t("requirements.items.os.note") },
            ].map(r => (
              <li key={r.k} className="grid gap-3.5 pb-3.5 border-b border-dashed border-border last:border-b-0 last:pb-0" style={{ gridTemplateColumns: "80px 1fr" }}>
                <span className="font-mono text-[10.5px] uppercase tracking-[.1em] text-muted-foreground pt-0.5">{r.k}</span>
                <span className="text-[13.5px] text-foreground leading-[1.45]">
                  {r.v}
                  <small className="block text-muted-foreground text-xs mt-0.5">{r.note}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer row */}
      <div className="relative z-10 mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-2 flex-wrap">
          <span>{t("footer.cloneText")}</span>
          <code className="bg-background border border-border rounded px-2 py-0.5 text-foreground ml-1.5">
            git clone github.com/DashAISoftware/dashAI
          </code>
        </div>
        <div className="flex gap-6 flex-wrap">
          <a href={siteConfig.docs.url} target="_blank" rel="noopener" className="hover:text-[#A7C7FF] transition-colors">docs.dash-ai.com</a>
          <a href={siteConfig.github.url} target="_blank" rel="noopener" className="hover:text-[#A7C7FF] transition-colors">github.com/DashAISoftware</a>
        </div>
      </div>
    </section>
  )
}
