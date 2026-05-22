"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config"
import { useTranslation } from "react-i18next"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { i18n, t } = useTranslation("navbar")

  const lang = i18n.language?.startsWith("es") ? "es" : "en"
  const setLang = (l: string) => { i18n.changeLanguage(l); setMobileOpen(false) }

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  const navLinks = ["manifesto", "open", "showcase", "extensible", "download"]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between",
        "px-5 md:px-24 py-[18px] transition-all duration-300",
        "border-b backdrop-saturate-[160%] backdrop-blur-[14px]",
        isScrolled || mobileOpen
          ? "bg-background/90 border-primary/20"
          : "bg-background/75 border-primary/15",
      )}
    >
      {/* Logo */}
      <a href="#" onClick={e => { e.preventDefault(); scrollTo("hero") }} className="flex items-center">
        <img src="/images/dashai-logo.svg" alt="dash.AI" height={26} style={{ height: 26, width: "auto" }} />
      </a>

      {/* Desktop nav links */}
      <div className="hidden md:flex gap-7 items-center text-sm">
        {navLinks.map(l => (
          <button
            key={l}
            onClick={() => scrollTo(l)}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
          >
            {t(l)}
          </button>
        ))}
      </div>

      {/* Tools */}
      <div className="flex items-center gap-3">
        {/* Lang toggle */}
        <div
          className="flex items-center font-mono text-xs rounded-full p-[3px]"
          style={{ border: "1px solid var(--ink-line)", background: "rgba(10,19,34,.6)" }}
        >
          {["es", "en"].map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "px-[11px] py-[5px] rounded-full font-medium transition-all duration-200",
                lang === l
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <a
          href={siteConfig.docs.url}
          target="_blank"
          rel="noopener"
          className="hidden md:flex items-center gap-2 font-mono text-xs px-[13px] py-[7px] border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          Docs
        </a>

        <a
          href={siteConfig.github.url}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 font-mono text-xs px-[13px] py-[7px] border border-border rounded-md text-foreground hover:border-primary transition-all duration-200"
          style={{ transition: "border-color .2s, background .2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "color-mix(in oklab, var(--primary) 16%, transparent)")}
          onMouseLeave={e => (e.currentTarget.style.background = "")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3 1-.3 2-.4 3-.4s2 .1 3 .4c2.4-1.6 3.4-1.3 3.4-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.3 0 4.7-2.9 5.7-5.6 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.9 18.6.5 12 .5z"/></svg>
          GitHub
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Menu"
        >
          {mobileOpen
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border py-5 px-5 flex flex-col gap-4">
          {navLinks.map(l => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(l)}
            </button>
          ))}
          <div className="flex gap-3 pt-2 border-t border-border">
            <a href={siteConfig.docs.url} target="_blank" rel="noopener" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs ↗
            </a>
            <a href={siteConfig.github.url} target="_blank" rel="noopener" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub ↗
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
