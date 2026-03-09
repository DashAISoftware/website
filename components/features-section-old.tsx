import { Card, CardContent } from "@/components/ui/card"
import { Layers, Zap, Eye, Users, Code2, Puzzle } from "lucide-react"

const features = [
  {
    icon: Puzzle,
    title: "Plugin System",
    description:
      "Extensible architecture that allows the community to create and share plugins, expanding platform capabilities.",
  },
  {
    icon: Layers,
    title: "Modular Integration",
    description: "Connect multiple AI models from different providers in a single unified platform.",
  },
  {
    icon: Zap,
    title: "Rapid Experimentation",
    description: "Test different configurations and parameters in real-time without writing code.",
  },
  {
    icon: Eye,
    title: "Advanced Visualization",
    description: "Visualize results, metrics, and model comparisons in a clear and intuitive way.",
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Designed for both expert developers and users without technical experience.",
  },
  {
    icon: Code2,
    title: "Complete API",
    description: "Access all functionalities through a documented and easy-to-use REST API.",
  },
  // {
  //   icon: Users,
  //   title: "Open Source",
  //   description: "100% open code, auditable and extensible. Contribute plugins and core improvements.",
  // },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">{"Democratizing access to AI"}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {"A complete platform that eliminates barriers to entry into the world of machine learning"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
