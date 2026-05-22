"use client"

import { useTranslation } from "react-i18next"

const PAPER = "#FEFEFF"
const PAPER_LINE = "#E3E2DF"
const ON_LIGHT = "#191817"
const ON_LIGHT_MUTE = "#4A4744"
const ON_LIGHT_FAINT = "#6C685F"
const BRAND_ON_LIGHT = "#1E63D8"

export function FeaturesSection() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith("es") ? "es" : "en"

  return (
    <section
      id="open"
      className="border-b"
      style={{
        padding: "clamp(80px,11vw,160px) clamp(20px,5vw,96px)",
        background: PAPER,
        color: ON_LIGHT,
        borderColor: PAPER_LINE,
      }}
    >
      {/* Section head */}
      <div className="grid gap-8 md:gap-20 mb-16 md:mb-24" style={{ gridTemplateColumns: "240px 1fr" }}>
        <div>
          <div className="font-mono text-xs tracking-[.1em] uppercase pt-2 relative" style={{ color: BRAND_ON_LIGHT }}>
            <span className="block w-12 h-[3px] mb-[18px]" style={{ background: BRAND_ON_LIGHT }} />
            [ 01 ] {lang === "es" ? "Apertura" : "Openness"}
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[.14em] mb-[18px]" style={{ color: ON_LIGHT_FAINT }}>
            <span style={{ color: BRAND_ON_LIGHT }}>{"{ I }"}</span>
            <span className="inline-block w-6 h-px" style={{ background: PAPER_LINE, transform: "translateY(-3px)" }} />
            {lang === "es" ? "Cuatro pruebas" : "Four proofs"}
          </div>
          <h2
            className="font-medium leading-[.96] mb-6"
            style={{ fontSize: "clamp(48px,7vw,104px)", letterSpacing: "-.04em", color: ON_LIGHT }}
          >
            <span style={{ color: BRAND_ON_LIGHT }}>Full</span> Open<span style={{ color: ON_LIGHT_MUTE }}>.</span>
          </h2>
          <p style={{ fontSize: "clamp(17px,1.5vw,22px)", maxWidth: "58ch", lineHeight: 1.5, color: ON_LIGHT_MUTE }}>
            {lang === "es"
              ? "La apertura no es una declaración de licencia: es una propiedad medible del sistema."
              : "Openness isn't a license statement: it's a measurable property of the system."}
          </p>
        </div>
      </div>

      {/* 4 Proofs */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-px mb-1"
        style={{ background: PAPER_LINE, border: `1px solid ${PAPER_LINE}` }}
      >
        {[
          {
            num: "01", sub: lang === "es" ? "Licencia" : "License",
            title: lang === "es" ? <>Licencia <span style={{ color: BRAND_ON_LIGHT }}>MIT</span>, sin copyleft.</> : <><span style={{ color: BRAND_ON_LIGHT }}>MIT</span> licensed, no copyleft.</>,
            body: lang === "es"
              ? "Integrable en sistemas institucionales y productos comerciales. Sin obligación de liberar lo que construís encima."
              : "Integrable into institutional systems and commercial products. No obligation to release what you build on top.",
          },
          {
            num: "02", sub: lang === "es" ? "Núcleo" : "Core",
            title: lang === "es" ? <>Sin <span style={{ color: BRAND_ON_LIGHT }}>paywall productivo</span>.</> : <>No <span style={{ color: BRAND_ON_LIGHT }}>productive paywall</span>.</>,
            body: lang === "es"
              ? "Scheduling, deployment, RBAC y gobernanza viven en el núcleo. El proyecto que clonás hoy es el que llega a producción."
              : "Scheduling, deployment, RBAC and governance live in the core. The project you clone today is what reaches production.",
          },
          {
            num: "03", sub: lang === "es" ? "Ecosistema" : "Ecosystem",
            title: lang === "es" ? <>Sin <span style={{ color: BRAND_ON_LIGHT }}>componentes cerrados</span>.</> : <>No <span style={{ color: BRAND_ON_LIGHT }}>closed components</span>.</>,
            body: lang === "es"
              ? "Toda extensión oficial comparte la licencia del núcleo. Auditable, modificable, forkeable bajo los mismos términos."
              : "Every official extension shares the core license. Auditable, modifiable, forkable under the same terms.",
          },
          { num: "04", sub: "", title: <></>, body: "" },
        ].map(p => (
          <div key={p.num} className="p-9 min-h-[220px] flex flex-col" style={{ background: PAPER }}>
            {p.sub && (
              <>
                <div className="font-mono text-[11px] tracking-[.12em]" style={{ color: ON_LIGHT_FAINT }}>
                  {p.num} / {p.sub}
                </div>
                <h3 className="font-medium mt-3.5 mb-3" style={{ fontSize: "clamp(22px,2vw,30px)", letterSpacing: "-.02em", lineHeight: 1.1, color: ON_LIGHT }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-[1.55] max-w-[46ch]" style={{ color: ON_LIGHT_MUTE }}>{p.body}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Catalog header */}
      <div className="flex items-baseline justify-between flex-wrap gap-4 mt-16 mb-6">
        <h3 className="font-medium" style={{ fontSize: "clamp(22px,2.2vw,32px)", letterSpacing: "-.02em", color: ON_LIGHT }}>
          {lang === "es" ? "Cobertura nativa, ejecución local." : "Native coverage, local execution."}
        </h3>
        <span className="font-mono text-xs tracking-[.06em]" style={{ color: ON_LIGHT_FAINT }}>
          {lang === "es" ? "⊳ La apertura puesta a prueba" : "⊳ Openness, in practice"}
        </span>
      </div>

      {/* Catalog grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-px"
        style={{ background: PAPER_LINE, border: `1px solid ${PAPER_LINE}` }}
      >
        {[
          {
            kind: lang === "es" ? "Tabular" : "Tabular",
            swatchColor: BRAND_ON_LIGHT,
            title: lang === "es" ? "Clasificación & regresión" : "Classification & regression",
            count: "15 + 15",
            body: lang === "es"
              ? <>Treinta modelos sobre scikit-learn y boosting. Cada uno como subclase de <code className="font-mono text-xs">BaseModel</code>.</>
              : <>Thirty models over scikit-learn and boosting. Each one as a subclass of <code className="font-mono text-xs">BaseModel</code>.</>,
            tags: ["RandomForest","XGBoost","LightGBM","SVM","MLP","+25"],
            countColor: BRAND_ON_LIGHT,
          },
          {
            kind: lang === "es" ? "NLP + Traducción" : "NLP + Translation",
            swatchColor: BRAND_ON_LIGHT,
            title: lang === "es" ? "Transformers y seq-to-seq" : "Transformers & seq-to-seq",
            count: "15 + 9",
            body: lang === "es"
              ? <>Clasificadores y modelos de traducción neural con métricas <code className="font-mono text-xs">BLEU · ChrF · TER</code> nativas.</>
              : <>Classifiers and neural translation models with native <code className="font-mono text-xs">BLEU · ChrF · TER</code> metrics.</>,
            tags: ["DistilBERT","DeBERTa-v3","ModernBERT","NLLB","OpusMT","+19"],
            countColor: BRAND_ON_LIGHT,
          },
          {
            kind: lang === "es" ? "Modelos generativos" : "Generative models",
            swatchColor: BRAND_ON_LIGHT,
            title: lang === "es" ? "LLMs locales" : "Local LLMs",
            count: "5",
            body: lang === "es"
              ? "Llama, Mistral, Mixtral, Qwen y SmolLM con pesos abiertos. Generación como tarea nativa."
              : "Llama, Mistral, Mixtral, Qwen and SmolLM on open weights. Generation as a native task.",
            tags: ["Llama","Mistral","Mixtral","Qwen","SmolLM"],
            countColor: BRAND_ON_LIGHT,
          },
          {
            kind: lang === "es" ? "Visión generativa" : "Generative vision",
            swatchColor: BRAND_ON_LIGHT,
            title: lang === "es" ? "Texto a imagen" : "Text to image",
            count: "11",
            body: lang === "es"
              ? "PixArt-Sigma, SDXL, Stable Diffusion y variantes ControlNet. Detección automática de CUDA."
              : "PixArt-Sigma, SDXL, Stable Diffusion and ControlNet variants. Automatic CUDA detection.",
            tags: ["PixArt-Sigma","SDXL","SD v3","SD v2","ControlNet","+6"],
            countColor: BRAND_ON_LIGHT,
          },
        ].map(c => (
          <div key={c.kind} className="p-9 relative overflow-hidden" style={{ background: PAPER }}>
            <div className="font-mono text-[11px] uppercase tracking-[.12em] mb-[18px]" style={{ color: ON_LIGHT_FAINT }}>
              <span className="inline-block w-3.5 h-3.5 rounded-[3px] mr-2.5 align-middle" style={{ background: c.swatchColor }} />
              {c.kind}
            </div>
            <h4 className="font-medium mb-2.5" style={{ fontSize: "clamp(22px,1.8vw,28px)", letterSpacing: "-.02em", color: ON_LIGHT }}>{c.title}</h4>
            <div className="font-mono font-light leading-none my-3.5" style={{ fontSize: 54, letterSpacing: "-.04em", color: c.countColor }}>{c.count}</div>
            <p className="text-sm max-w-[46ch] leading-[1.55] mb-4" style={{ color: ON_LIGHT_MUTE }}>{c.body}</p>
            <ul className="flex flex-wrap gap-1.5">
              {c.tags.map(tag => (
                <li key={tag} className="font-mono text-[11.5px] px-2 py-1 rounded border" style={{ borderColor: PAPER_LINE, color: ON_LIGHT_MUTE }}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
