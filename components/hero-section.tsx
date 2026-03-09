"use client"

import { Button } from "@/components/ui/button"
import { Github, BookOpen, Download } from "lucide-react"
import Image from "next/image"
import { siteConfig } from "@/lib/config"
import { useTranslation, Trans } from "react-i18next"

export function HeroSection() {
  const { t } = useTranslation()
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Decorative lines background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-1/4 w-96 h-96 opacity-30" viewBox="0 0 400 400">
          <path d="M 50 350 Q 150 250 250 300" stroke="oklch(0.65 0.18 45)" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute bottom-0 right-1/4 w-96 h-96 opacity-30" viewBox="0 0 400 400">
          <path d="M 150 50 Q 250 150 350 100" stroke="oklch(0.6 0.15 240)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center text-center gap-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/images/dashai-logo.png"
              alt="DashAI Logo"
              width={600}
              height={200}
              className="w-auto h-24 md:h-32"
              priority
            />
          </div>

          <Trans i18nKey="hero:title" >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              {"The "}
              <span className="text-primary">open source</span>
              {" platform for AI experimentation"}
            </h1>
          </Trans>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {
              t("hero:description", "Integrate, experiment, and visualize AI model results through an intuitive visual interface. Built with an extensible plugin architecture for limitless customization.")
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/80 hover:scale-102 hover:shadow-lg transition-all duration-100 text-primary-foreground cursor-pointer"
              onClick={() => scrollToSection("download")}
            >
              <Download className="mr-2 h-5 w-5" />
              {t("hero:download")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary text-foreground hover:bg-primary/10 hover:text-foreground dark:hover:bg-primary/20 dark:hover:text-foreground bg-transparent"
              asChild
            >
              <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                {t("hero:viewOnGithub", "View on GitHub")}
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-primary text-foreground hover:bg-primary/10 hover:text-foreground dark:hover:bg-primary/20 dark:hover:text-foreground bg-transparent"
              asChild
            >
              <a href={siteConfig.docs.url} target="_blank" rel="noopener noreferrer">
                <BookOpen className="mr-2 h-5 w-5" />
                {t("hero:documentation", "Documentation")}
              </a>
            </Button>
          </div>

          {/* <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{"100% Open Source"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{"No complex setup"}</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
