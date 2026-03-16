"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Github, Menu, X, Globe, ChevronDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config"
import { useTranslation } from "react-i18next"

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇨🇱" },
]

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0]

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-lang-switcher]")) setIsOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isOpen])

  return (
    <div className="relative" data-lang-switcher>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium",
          "border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-150",
          isOpen && "border-primary/50 bg-primary/5",
        )}
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <span>{currentLang.flag}</span>
        <span className="hidden sm:inline text-xs">{currentLang.code.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-muted-foreground transition-transform duration-150",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-40 rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-lg py-1 z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-1.5 text-sm hover:bg-primary/10 transition-colors text-left",
                i18n.language === lang.code && "text-primary font-medium bg-primary/5",
              )}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
            <Image src="/images/dashai-logo.png" alt="DashAI" width={120} height={40} className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("features")} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              {t("navbar:features")}
            </button>
            <button onClick={() => scrollToSection("download")} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              {t("navbar:download")}
            </button>
            <button onClick={() => scrollToSection("community")} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              {t("navbar:community")}
            </button>
            <button onClick={() => scrollToSection("support")} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              {t("navbar:support")}
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              {t("navbar:contact")}
            </button>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-foreground hover:bg-primary/10 hover:text-foreground dark:hover:bg-primary/20 dark:hover:text-foreground bg-transparent"
              asChild
            >
              <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                {t("navbar:github")}
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/80 hover:scale-102 hover:shadow-lg transition-all duration-100 text-primary-foreground cursor-pointer"
              onClick={() => scrollToSection("download")}
            >
              <Download className="mr-2 h-4 w-4" />
              {t("navbar:download")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button className="p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection("features")} className="text-left text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                {t("navbar:features")}
              </button>
              <button onClick={() => scrollToSection("download")} className="text-left text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                {t("navbar:download")}
              </button>
              <button onClick={() => scrollToSection("community")} className="text-left text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                {t("navbar:community")}
              </button>
              <button onClick={() => scrollToSection("support")} className="text-left text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                {t("navbar:support")}
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-left text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                {t("navbar:contact")}
              </button>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-foreground hover:bg-primary/10 hover:text-foreground dark:hover:bg-primary/20 dark:hover:text-foreground bg-transparent w-full justify-start"
                  asChild
                >
                  <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {t("navbar:github")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}