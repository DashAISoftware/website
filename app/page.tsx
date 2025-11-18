import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
//import { ModulesCarousel } from "@/components/modules-carousel"
import { DownloadSection } from "@/components/download-section"
import { SupportedBySection } from "@/components/supported-by-section"
import { CommunitySection } from "@/components/community-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
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
