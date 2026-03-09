"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Github, BookOpen, Code2, Package } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { useTranslation } from "react-i18next"

const communityLinks = [
  {
    icon: Github,
    key: "github",
    defaultTitle: "GitHub",
    defaultDescription: "Explore the source code",
    link: siteConfig.github.url,
    // stats: "2.5k stars",
  },
  // {
  //   icon: Package,
  //   title: "Plugin Hub",
  //   description: "Browse community plugins",
  //   link: siteConfig.resources.pluginHub,
  //   // stats: "100+ plugins",
  // },
  {
    icon: BookOpen,
    key: "docs",
    defaultTitle: "Docs",
    defaultDescription: "Visit the technical documentation",
    link: siteConfig.docs.url,
    // stats: "Complete guides",
  },
  {
    icon: Code2,
    key: "contribute",
    defaultTitle: "Contribute",
    defaultDescription: "Improve the project",
    link: siteConfig.github.contribute,
    // stats: "Open to all",
  },
]

export function CommunitySection() {
  const { t } = useTranslation()
  return (
    <section id="community" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            {t("community:title", { defaultValue: "Built and extended by the community" })}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("community:description", {
              defaultValue:
                "DashAI's plugin architecture enables anyone to contribute new capabilities. Build plugins, improve the core, and shape the future of open source AI tools.",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
          {communityLinks.map((item, index) => {
            const Icon = item.icon
            const title = t(`community:cards.${item.key}.title`, {
              defaultValue: item.defaultTitle,
            })
            const description = t(`community:cards.${item.key}.description`, {
              defaultValue: item.defaultDescription,
            })
            return (
              <Card
                key={item.key}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                onClick={() => window.open(item.link, "_blank", "noopener,noreferrer")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm leading-relaxed">{description}</p>
                  <span className="text-xs text-primary font-mono">{item.stats}</span>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-balance">{"Ready to build your first plugin?"}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              {
                "Our comprehensive documentation guides you through creating plugins and contributing to the core platform"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                asChild
              >
                <a href={siteConfig.docs.pluginDocs} target="_blank" rel="noopener noreferrer">
                  {"Plugin Documentation"}
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-foreground/20 bg-transparent"
                asChild
              >
                <a href={siteConfig.github.contribute} target="_blank" rel="noopener noreferrer">
                  {"Contribution Guide"}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </section>
  )
}
