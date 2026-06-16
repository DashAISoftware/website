"use client"

import { useTranslation } from "react-i18next"
import { siteConfig } from "@/lib/config"

export function Footer() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith("es") ? "es" : "en"

  return (
    <footer
      style={{
        padding: "clamp(56px,7vw,88px) clamp(20px,5vw,96px) 40px",
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
        color: "var(--foreground)",
      }}
    >
      {/* 4-col grid */}
      <div
        className="grid gap-12 mb-14"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))" }}
      >
        {/* Brand col */}
        <div>
          <div className="mb-[18px]">
            <img src="/images/dashai-logo.svg" alt="dash.AI" height={22} style={{ height: 22, width: "auto" }} />
          </div>
          {/* Palette ribbon */}
          <div className="flex items-center gap-1.5 mb-6" aria-hidden="true">
            <span className="h-[5px] rounded-full flex-1 max-w-[36px] bg-primary" />
            <span className="h-[5px] rounded-full flex-1 max-w-[36px]" style={{ background: "#FFA578" }} />
            <span className="h-[5px] rounded-full flex-1 max-w-[36px]" style={{ background: "#90F1C4" }} />
            <span className="h-[5px] rounded-full flex-1 max-w-[36px]" style={{ background: "#A54DA9" }} />
            <span className="font-mono text-[10px] uppercase tracking-[.12em] text-muted-foreground ml-2">
              Brand v2 | 2026
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-[1.55] max-w-[38ch]">
            {lang === "es"
              ? "Proyecto open-source desarrollado en la Universidad de Chile. Licencia MIT. Visual ML Full Open | Full Extensible."
              : "Open-source project developed at Universidad de Chile. MIT licensed. Visual ML, Full Open | Full Extensible."}
          </p>
        </div>

        {/* Project col */}
        <div>
          <h5 className="font-mono text-[11px] uppercase tracking-[.12em] text-muted-foreground mb-3.5">
            {lang === "es" ? "Proyecto" : "Project"}
          </h5>
          <ul className="grid gap-2">
            {[
              { label: { es: "GitHub", en: "GitHub" }, href: siteConfig.github.url, external: true },
              { label: { es: "Documentación", en: "Documentation" }, href: siteConfig.docs.url, external: true },
              { label: { es: "Descargar", en: "Download" }, href: "#download", external: false },
              { label: { es: "La aplicación", en: "The application" }, href: "#showcase", external: false },
            ].map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener" : undefined}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-[#A7C7FF]"
                >
                  {lang === "es" ? l.label.es : l.label.en}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources col */}
        <div>
          <h5 className="font-mono text-[11px] uppercase tracking-[.12em] text-muted-foreground mb-3.5">
            {lang === "es" ? "Recursos" : "Resources"}
          </h5>
          <ul className="grid gap-2">
            {[
              { label: { es: "Paper", en: "Paper" }, href: "#" },
              { label: { es: "Tutoriales", en: "Tutorials" }, href: "#" },
              { label: { es: "Colaboradores", en: "Collaborators" }, href: "#colaboradores" },
              { label: { es: "Notas de release", en: "Release notes" }, href: siteConfig.resources.changelog },
            ].map(l => (
              <li key={l.label.en}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener" : undefined}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-[#A7C7FF]"
                >
                  {lang === "es" ? l.label.es : l.label.en}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Community col */}
        <div>
          <h5 className="font-mono text-[11px] uppercase tracking-[.12em] text-muted-foreground mb-3.5">
            {lang === "es" ? "Comunidad" : "Community"}
          </h5>
          <ul className="grid gap-2">
            {[
              { label: { es: "Discord", en: "Discord" }, href: "https://discord.gg/CQVqMBjeWP" },
              { label: { es: "Contribuir", en: "Contribute" }, href: siteConfig.github.contribute },
              { label: { es: "Issues", en: "Issues" }, href: siteConfig.github.issues },
              { label: { es: "PyPI", en: "PyPI" }, href: "https://pypi.org/project/dashai/" },
            ].map(l => (
              <li key={l.label.en}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-[#A7C7FF]"
                >
                  {lang === "es" ? l.label.es : l.label.en}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 pt-6 font-mono text-[11.5px] text-muted-foreground"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex flex-wrap gap-x-[18px] gap-y-1">
          <span>© 2026 DashAI</span>
          <span>MIT License</span>
          <span>Universidad de Chile | Chile</span>
        </div>
        <div className="flex gap-5">
          <a href={siteConfig.github.url} target="_blank" rel="noopener" className="hover:text-[#A7C7FF] transition-colors">
            GitHub
          </a>
          <a href={siteConfig.docs.url} target="_blank" rel="noopener" className="hover:text-[#A7C7FF] transition-colors">
            docs.dash-ai.com
          </a>
        </div>
      </div>
    </footer>
  )
}
