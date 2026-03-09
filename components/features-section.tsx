"use client"

import { useEffect, useRef, useState } from "react"
import { Trans, useTranslation } from "react-i18next"

const featureItems = [
  {
    id: 1,
    key: "dataExplorer",
    image: "features/eda_module.png",
    defaultTitle: "Data Explorer",
    defaultDescription:
      "Explore, clean, and prepare your data in an intuitive visual environment: perform dynamic, visual, and guided exploratory data analyses (EDA) directly within DashAI.",
  },
  {
    id: 2,
    key: "mlExperimentation",
    image: "features/ml_experimentation.png",
    defaultTitle: "ML Experimentation",
    defaultDescription:
      "Set up and manage your ML experiments with an intuitive interface. Select models, configure its hyperparameters, and define evaluation metrics without writing a single line of code.",
  },
  {
    id: 3,
    key: "resultsVisualization",
    image: "features/results.png",
    defaultTitle: "Results Visualization",
    defaultDescription:
      "Compare model performance across multiple experiments. Interactive dashboards help you identify the best performing models and understand their behavior through comprehensive metrics and visualizations.",
  },
  {
    id: 4,
    key: "modelExplainability",
    image: "features/explainability_module.png",
    defaultTitle: "Model Explainability",
    defaultDescription:
      "Understand how your models make decisions. Generate feature importance plots, SHAP values, and interpretable visualizations that help you trust and debug your AI models.",
  },
  {
    id: 5,
    key: "generativeModule",
    image: "features/generative_module.png",
    defaultTitle: "Generative Module",
    defaultDescription:
      "Experiment with generative AI models seamlessly. Generate text, images, and other content while visualizing the generation process and fine-tuning parameters in real-time.",
  },
]

export function FeaturesSection() {
  const { t } = useTranslation()
  const [visibleFeatures, setVisibleFeatures] = useState<Set<number>>(new Set())
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleFeatures((prev) => new Set(prev).add(index))
            }
          })
        },
        { threshold: 0.2 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="features" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Trans i18nKey="features:heading">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance text-white">
              Powerful <span className="text-primary">Features</span>
            </h2>
          </Trans>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("features:description", {
              defaultValue:
                "Discover the powerful features that make DashAI the ultimate platform for AI experimentation",
            })}
          </p>
        </div>

        <div className="space-y-32">
          {featureItems.map((feature, index) => {
            const isEven = index % 2 === 0
            const isVisible = visibleFeatures.has(index)
            const title = t(`features:items.${feature.key}.title`, {
              defaultValue: feature.defaultTitle,
            })
            const description = t(`features:items.${feature.key}.description`, {
              defaultValue: feature.defaultDescription,
            })

            return (
              <div
                key={feature.id}
                ref={(el) => {
                  featureRefs.current[index] = el
                }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold">{title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="flex-1 relative">
                  <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.defaultTitle}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
