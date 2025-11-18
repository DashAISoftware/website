import { Github, Twitter, Linkedin } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">DashAI</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"Open source platform to democratize access to artificial intelligence."}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-primary transition-colors">
                  {"Features"}
                </a>
              </li>
              {/* <li>
                <a href="#modules" className="hover:text-primary transition-colors">
                  {"Modules"}
                </a>
              </li> */}
              {/* <li>
                <a href={siteConfig.resources.roadmap} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {"Roadmap"}
                </a>
              </li> */}
              <li>
                <a href={siteConfig.resources.changelog} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {"Changelog"}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={siteConfig.docs.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {"Documentation"}
                </a>
              </li>
              {/* <li>
                <a href={siteConfig.docs.tutorials} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {"Tutorials"}
                </a>
              </li> */}
              {/* <li>
                <a href={siteConfig.docs.apiReference} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {"API Reference"}
                </a>
              </li> */}
              {/* <li>
                <a href={siteConfig.docs.examples} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {"Examples"}
                </a>
              </li> */}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {"GitHub"}
                </a>
              </li>
              {/* <li>
                <a href={siteConfig.social.discord} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {"Discord"}
                </a>
              </li>
              <li>
                <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {"Twitter"}
                </a>
              </li> */}
              <li>
                <a href={siteConfig.github.contribute} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {"Contribute"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{"© 2025 DashAI"}</p>
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
