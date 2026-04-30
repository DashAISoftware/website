"use client"

import { useEffect } from "react"
import i18n from "i18next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
//import { ModulesCarousel } from "@/components/modules-carousel"
import { DownloadSection } from "@/components/download-section"
import { SupportedBySection } from "@/components/supported-by-section"
import { CommunitySection } from "@/components/community-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import "./i18n"

const SUPPORTED_LANGS = ["en", "es"]

export default function Home() {
  useEffect(() => {
    const detected = navigator.language ?? "en"
    const match = SUPPORTED_LANGS.find((l) => detected.startsWith(l)) ?? "en"
    if (match !== i18n.language) i18n.changeLanguage(match)
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DownloadSection />
      <CommunitySection />
      <SupportedBySection />
      <ContactSection />
      <Footer />
    </main>
  )
}
