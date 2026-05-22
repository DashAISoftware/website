"use client"

import { useTranslation } from "react-i18next"
import { Upload, FlaskConical, Sparkles, Puzzle } from "lucide-react"
import { siteConfig } from "@/lib/config"

function AppMockup({ lang }: { lang: string }) {
  return (
    <div
      className="w-full max-w-[640px] rounded-xl overflow-hidden border border-border hero-visual-in"
      style={{
        background: "var(--card)",
        boxShadow: "0 1px 0 rgba(255,255,255,.05) inset, 0 40px 80px -25px rgba(0,0,0,.75), 0 18px 40px -20px color-mix(in oklab, var(--primary) 22%, transparent)",
      }}
    >
      {/* Chrome */}
      <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-border" style={{ background: "var(--ink-deep)" }}>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 max-w-[280px] mx-auto text-center font-mono text-[10.5px] text-muted-foreground px-3 py-1 rounded-full border border-border" style={{ background: "var(--card)" }}>
          localhost:8000
        </div>
        <span className="font-mono text-[10px] text-muted-foreground px-2.5 py-1 border border-border rounded">
          {lang === "es" ? "ES" : "EN"} ▾
        </span>
      </div>

      {/* Body */}
      <div className="p-[18px_22px_22px]">
        {/* Header row */}
        <div className="flex items-center justify-between pb-3.5 border-b border-border mb-[18px] flex-wrap gap-3">
          <div className="flex items-center">
            <img src="/images/dashai-logo.svg" alt="dash.AI" height={18} style={{ height: 18, width: "auto" }} />
          </div>
          <div className="flex gap-[18px] font-mono text-[10.5px] tracking-[.1em] uppercase text-muted-foreground">
            <span>Datasets</span>
            <span>Models</span>
            <span>Generative</span>
            <span>Plugins</span>
          </div>
        </div>

        {/* Welcome */}
        <div className="mb-[18px]">
          <h3 className="text-lg font-semibold tracking-tight mb-1">
            Welcome to dashAI!
          </h3>
          <p className="text-xs text-muted-foreground">
            Pick a module to start
          </p>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { cls: "border-[rgba(255,165,120,.32)]", ico: <Upload size={15} />,     icoStyle: { background: "rgba(121,49,12,.45)", color: "#FFA578" }, name: "Datasets",  tags: ["IMPORT","CLEAN","EDA"], tagStyle: { background: "rgba(121,49,12,.40)", color: "#FFA578" } },
            { cls: "border-[rgba(44,122,255,.32)]",   ico: <FlaskConical size={15} />, icoStyle: { background: "rgba(44,122,255,.20)", color: "#A7C7FF" }, name: "Models",    tags: ["TABULAR","NLP","REGR"], tagStyle: { background: "rgba(44,122,255,.20)", color: "#A7C7FF" } },
            { cls: "border-[rgba(144,241,196,.32)]",  ico: <Sparkles size={15} />,    icoStyle: { background: "rgba(0,89,103,.45)",  color: "#90F1C4" }, name: "Generative", tags: ["LLM","T2I","INFER"],   tagStyle: { background: "rgba(0,89,103,.55)", color: "#90F1C4" } },
            { cls: "border-[rgba(165,77,169,.32)]",   ico: <Puzzle size={15} />,      icoStyle: { background: "rgba(165,77,169,.28)",color: "#FEE8FF" }, name: "Plugins",    tags: ["INSTALL","EXTEND"],    tagStyle: { background: "rgba(165,77,169,.28)", color: "#FEE8FF" } },
          ].map(m => (
            <div key={m.name} className={`p-3.5 rounded-lg border ${m.cls} transition-transform duration-200 hover:-translate-y-0.5`} style={{ background: "var(--muted)" }}>
              <div className="w-8 h-8 rounded-md flex items-center justify-center text-lg font-medium mb-2.5" style={m.icoStyle}>{m.ico}</div>
              <div className="text-sm font-semibold tracking-tight mb-2">{m.name}</div>
              <div className="flex flex-wrap gap-1">
                {m.tags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] tracking-[.08em] font-semibold px-1.5 py-0.5 rounded" style={m.tagStyle}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { i18n } = useTranslation("hero")
  const lang = i18n.language?.startsWith("es") ? "es" : "en"

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border"
      style={{
        padding: "clamp(40px,6vw,72px) clamp(20px,5vw,96px) clamp(64px,9vw,120px)",
        background: "radial-gradient(ellipse 65% 75% at 82% 30%, rgba(44,122,255,.28) 0%, rgba(44,122,255,.08) 38%, transparent 72%), radial-gradient(circle at 14% 88%, rgba(44,122,255,.10) 0%, transparent 55%), linear-gradient(170deg, #131211 0%, var(--background) 55%, #1B1A19 100%)",
      }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none bg-grid-subtle" />

      <div
        className="relative z-10 grid gap-10 md:gap-16 items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          paddingTop: "clamp(40px,6vw,80px)",
        }}
      >
        {/* Copy */}
        <div>
          <h1 className="font-medium leading-[.9] mb-9" style={{ margin: "0 0 36px" }}>
            <span
              className="flex items-center gap-3 italic font-light text-muted-foreground lowercase mb-[-0.05em]"
              style={{ fontSize: "clamp(18px,2.6vw,34px)", letterSpacing: "-.01em" }}
            >
              <span className="inline-block w-5 h-px bg-[#A7C7FF]" />
              full
            </span>
            <span
              className="block font-medium text-foreground"
              style={{ fontSize: "clamp(56px,10vw,156px)", letterSpacing: "-.045em", lineHeight: ".92" }}
            >
              Open.
            </span>
            <span
              className="flex items-center gap-3 italic font-light text-muted-foreground lowercase mt-2"
              style={{ fontSize: "clamp(18px,2.6vw,34px)", letterSpacing: "-.01em" }}
            >
              <span className="inline-block w-5 h-px bg-[#A7C7FF]" />
              full
            </span>
            <span
              className="block font-medium"
              style={{ fontSize: "clamp(56px,10vw,156px)", letterSpacing: "-.045em", lineHeight: ".92", color: "#A7C7FF" }}
            >
              Extensible.
            </span>
          </h1>

          <p
            className="text-muted-foreground leading-[1.55] mb-9"
            style={{ fontSize: "clamp(16.5px,1.3vw,19.5px)", maxWidth: "48ch" }}
          >
            {lang === "es"
              ? "Una plataforma open-source de Visual ML sin código. Sin paywall, sin componentes cerrados, sin claves API externas."
              : "An open-source no-code Visual ML platform. No paywall, no closed components, no external API keys."}
          </p>

          <div className="flex gap-3.5 flex-wrap">
            <button
              onClick={() => scrollTo("download")}
              className="inline-flex items-center gap-2.5 px-[22px] py-[13px] rounded-md text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow: "0 0 0 0 transparent",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px -8px rgba(44,122,255,.5)"; (e.currentTarget as HTMLElement).style.background = "#4A8FFF" }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ""; (e.currentTarget as HTMLElement).style.background = "var(--primary)" }}
            >
              {lang === "es" ? "Descargar" : "Download"}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
            <a
              href={siteConfig.github.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 px-[22px] py-[13px] rounded-md text-sm font-semibold border border-foreground text-foreground transition-all duration-200"
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(254,254,255,.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "")}
            >
              {lang === "es" ? "Ver en GitHub" : "View on GitHub"}
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="flex items-center justify-center">
          <AppMockup lang={lang} />
        </div>
      </div>

    </section>
  )
}
