"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Github, Menu, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        isScrolled || isMobileMenuOpen ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent",
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
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("download")}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Download
            </button>
            <button
              onClick={() => scrollToSection("community")}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection("support")}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Support
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary text-foreground hover:bg-primary/10 hover:text-foreground dark:hover:bg-primary/20 dark:hover:text-foreground bg-transparent"
              asChild
            >
              <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/80 hover:scale-102 hover:shadow-lg transition-all duration-100 text-primary-foreground cursor-pointer"
              onClick={() => scrollToSection("download")}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("download")}
                className="text-left text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              >
                Download
              </button>
              <button
                onClick={() => scrollToSection("community")}
                className="text-left text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              >
                Community
              </button>
              <button
                onClick={() => scrollToSection("support")}
                className="text-left text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              >
                Support
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              >
                Contact
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
                    GitHub
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
