"use client"

import { Github, Twitter, Linkedin } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { useTranslation } from "react-i18next"

const productLinks = [
  {
    href: "#features",
    defaultLabel: "Features",
    key: "features",
    external: false,
  },
  {
    href: siteConfig.resources.changelog,
    defaultLabel: "Changelog",
    key: "changelog",
    external: true,
  },
]

const resourceLinks = [
  {
    href: siteConfig.docs.url,
    defaultLabel: "Documentation",
    key: "documentation",
    external: true,
  },
]

const communityLinks = [
  {
    href: siteConfig.github.url,
    defaultLabel: "GitHub",
    key: "github",
    external: true,
  },
  {
    href: siteConfig.github.contribute,
    defaultLabel: "Contribute",
    key: "contribute",
    external: true,
  },
]

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">
              {t("footer:brand.title", { defaultValue: "DashAI" })}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer:brand.description", {
                defaultValue: "Open source platform to democratize access to artificial intelligence.",
              })}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">
              {t("footer:sections.product.title", { defaultValue: "Product" })}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {productLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="hover:text-primary transition-colors"
                  >
                    {t(`footer:sections.product.links.${link.key}`, { defaultValue: link.defaultLabel })}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">
              {t("footer:sections.resources.title", { defaultValue: "Resources" })}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {resourceLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="hover:text-primary transition-colors"
                  >
                    {t(`footer:sections.resources.links.${link.key}`, { defaultValue: link.defaultLabel })}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">
              {t("footer:sections.community.title", { defaultValue: "Community" })}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {communityLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="hover:text-primary transition-colors"
                  >
                    {t(`footer:sections.community.links.${link.key}`, { defaultValue: link.defaultLabel })}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t("footer:copyright", { defaultValue: "© 2025 DashAI" })}
          </p>
          <div className="flex gap-4">
            <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            {/* <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
