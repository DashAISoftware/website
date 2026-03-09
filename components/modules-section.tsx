import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, LineChart, Boxes, Workflow, Puzzle } from "lucide-react"

const modules = [
  {
    icon: Brain,
    title: "Model Hub",
    description: "Model management system",
    features: [
      "Import models from Hugging Face, OpenAI, and more",
      "Automatic model versioning",
      "Performance comparison",
      "Real-time metrics",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow Builder",
    description: "Visual pipeline constructor",
    features: [
      "Intuitive drag-and-drop interface",
      "Pre-built connectors",
      "Parallel task execution",
      "Integrated visual debugging",
    ],
  },
  {
    icon: LineChart,
    title: "Analytics Dashboard",
    description: "Advanced analytics panel",
    features: ["Interactive results charts", "Data and report exports", "A/B model comparison", "Cost monitoring"],
  },
  {
    icon: Boxes,
    title: "Experiment Manager",
    description: "Experiment management",
    features: [
      "Automatic experiment tracking",
      "Guaranteed reproducibility",
      "Dataset management",
      "Team collaboration",
    ],
  },
  {
    icon: Puzzle,
    title: "Plugin Architecture",
    description: "Extensible plugin system",
    features: [
      "Create custom plugins with ease",
      "Hot-reload plugin development",
      "Secure plugin sandboxing",
      "Community plugin marketplace",
    ],
  },
]

export function ModulesSection() {
  return (
    <section id="modules" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">{"Powerful modules, easy to use"}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {"Each module is designed to solve specific problems in your ML workflow"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon
            return (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-1">{module.title}</CardTitle>
                      <CardDescription className="text-base">{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
