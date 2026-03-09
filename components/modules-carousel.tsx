"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const modules = [
  {
    id: 1,
    title: "Data Explorer",
    description:
      "Explore, clean, and prepare your data in an intuitive visual environment: perform dynamic, visual, and guided exploratory data analyses (EDA) directly within DashAI.",
    image: "/exploratory-data-analysis-dashboard-with-charts-an.jpg",
    features: [
      "Manage all your datasets in one place",
      "Apply different conversions to your datasets easily",
      "Generate customizable charts",
    ],
  },
  {
    id: 2,
    title: "ML Experimentation",
    description:
      "Set up and manage your ML experiments with an intuitive interface. Select models, configure its hyperparameters, and define evaluation metrics without writing a single line of code.",
    image: "/config_param_600h.png",
    features: ["Model selection by task", "Experiment tracking", "One-click experiment runs"],
  },
  {
    id: 3,
    title: "Results Visualization",
    description:
      "Compare model performance across multiple experiments. Interactive dashboards help you identify the best performing models and understand their behavior through comprehensive metrics and visualizations.",
    image: "/results-1200w.png",
    features: ["Performance comparison", "Interactive dashboards", "Custom visualizations"],
  },
  {
    id: 4,
    title: "Model Explanability",
    description:
      "Understand how your models make decisions. Generate feature importance plots, SHAP values, and interpretable visualizations that help you trust and debug your AI models.",
    image: "/ai-model-explainability-interface-with-shap-values.jpg",
    features: [
      "Visual Explanations",
      "Global y Local explicadores",
      "Model inspection and analysis"
    ],
  },
  {
    id: 5,
    title: "Generative Module",
    description:
      "Experiment with generative AI models seamlessly. Generate text, images, and other content while visualizing the generation process and fine-tuning parameters in real-time.",
    image: "/generative-ai-interface-with-text-and-image-genera.jpg",
    features: ["Multi-modal generation", "Real-time preview", "Parameter control"],
  },
]

export function ModulesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeButton, setActiveButton] = useState<"previous" | "next" | null>(null)

  const goToPrevious = () => {
    setActiveButton("previous")
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? modules.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setActiveButton("next")
    setCurrentIndex((prevIndex) => (prevIndex === modules.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveButton("previous")
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? modules.length - 1 : prevIndex - 1))
      } else if (event.key === "ArrowRight") {
        setActiveButton("next")
        setCurrentIndex((prevIndex) => (prevIndex === modules.length - 1 ? 0 : prevIndex + 1))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Reset active button after 0.5 seconds
  useEffect(() => {
    if (activeButton) {
      const timer = setTimeout(() => {
        setActiveButton(null)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [activeButton])

  const currentModule = modules[currentIndex]

  return (
    <section id="features" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance text-white">
            Powerful <span className="text-primary">Features</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the powerful features that make DashAI the ultimate platform for AI experimentation
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main carousel content */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-400/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image side */}
              <div className="relative h-[400px] md:h-[550px] bg-gradient-to-br from-cyan-500/5 to-orange-500/5 overflow-hidden">
                <img
                  src={currentModule.image || "/placeholder.svg"}
                  alt={currentModule.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content side */}
              <div className="p-6 md:p-12 flex flex-col md:h-[550px]">
                {/* Fixed header section */}
                <div className="flex-shrink-0">
                <div className="inline-block px-4 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-medium mb-4 w-fit">
                  Feature {currentModule.id} of {modules.length}
                </div>
                  <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white">{currentModule.title}</h3>
                </div>

                {/* Content section - auto height on mobile, scrollable on desktop */}
                <div className="flex-1 md:overflow-y-auto md:min-h-0 mb-4 md:mb-6">
                  <p className="text-gray-300 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">{currentModule.description}</p>
                  <div className="space-y-2 md:space-y-3">
                    {currentModule.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span className="text-gray-400 text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fixed navigation buttons */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <Button
                    onClick={goToPrevious}
                    variant="outline"
                    size="icon"
                    className={`border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/50 hover:text-cyan-300 text-cyan-400 rounded-full h-12 w-12 transition-all cursor-pointer ${
                      activeButton === "previous"
                        ? "!bg-cyan-400/20 !border-cyan-400 !border-2 text-cyan-300"
                        : ""
                    }`}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    onClick={goToNext}
                    variant="outline"
                    size="icon"
                    className={`border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/50 hover:text-cyan-300 text-cyan-400 rounded-full h-12 w-12 transition-all cursor-pointer ${
                      activeButton === "next"
                        ? "!bg-cyan-400/20 !border-cyan-400 !border-2 text-cyan-300"
                        : ""
                    }`}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {modules.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-cyan-400" : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
