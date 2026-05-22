"use client"

import { useTranslation } from "react-i18next"

function pipeline(lang: string) {
  return lang === "es" ? [
    { label: "Ingesta de Datos",       color: "var(--foreground)" },
    { label: "Exploración Visual",     color: "#A7C7FF"           },
    { label: "Preprocesamiento",       color: "var(--muted-foreground)" },
    { label: "Entrenamiento",          color: "#A7C7FF"           },
    { label: "Evaluación",             color: "var(--foreground)" },
    { label: "Explicabilidad",         color: "var(--muted-foreground)" },
  ] : [
    { label: "Data Ingestion",         color: "var(--foreground)" },
    { label: "Visual Exploration",     color: "#A7C7FF"           },
    { label: "Preprocessing",          color: "var(--muted-foreground)" },
    { label: "Model Training",         color: "#A7C7FF"           },
    { label: "Evaluation",             color: "var(--foreground)" },
    { label: "Explainability",         color: "var(--muted-foreground)" },
  ]
}

function MarqueeStrip({ lang }: { lang: string }) {
  const PIPELINE = pipeline(lang)
  const items = [...PIPELINE, ...PIPELINE, ...PIPELINE, ...PIPELINE]

  return (
    <div
      className="overflow-hidden border-b border-border py-5"
      aria-hidden="true"
      style={{ background: "var(--ink-deep, #131211)" }}
    >
      <div className="marquee-track">
        {items.map((step, i) => (
          <span key={i} className="inline-flex items-center font-medium" style={{ fontSize: "clamp(22px,2.8vw,40px)", letterSpacing: "-.02em" }}>
            <span style={{ color: step.color }}>
              {step.label}
            </span>
            {i % 6 !== 5 && (
              <span className="font-mono font-light" style={{ color: "var(--primary)", padding: "0 clamp(10px,1.5vw,24px)" }}>→</span>
            )}
            {i % 6 === 5 && (
              <span style={{ display: "inline-block", width: "clamp(40px,5vw,80px)" }} />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ManifestoSection() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith("es") ? "es" : "en"

  return (
    <>
      <MarqueeStrip lang={lang} />

      <section
        id="manifesto"
        className="border-b border-border"
        style={{
          padding: "clamp(80px,11vw,160px) clamp(20px,5vw,96px)",
          background: "var(--background)",
        }}
      >
        {/* Label */}
        <div
          className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[.14em] text-muted-foreground mb-9"
          style={{ letterSpacing: ".14em" }}
        >
          <span className="flex-1 max-w-[200px] h-px bg-border" />
          {lang === "es" ? "Manifiesto" : "Manifesto"}
          <span className="flex-1 max-w-[200px] h-px bg-border" />
        </div>

        {/* Body */}
        <div
          className="max-w-[1100px] mx-auto font-normal"
          style={{
            fontSize: "clamp(28px,4.4vw,64px)",
            lineHeight: "1.05",
            letterSpacing: "-.03em",
            color: "var(--foreground)",
          }}
        >
          {lang === "es" ? (
            <>
              <p style={{ margin: "0 0 .6em" }}>
                Una plataforma{" "}
                <span style={{ color: "#A7C7FF" }}>abierta</span>{" "}
                no es{" "}
                <span style={{ color: "var(--muted-foreground)" }}>la que se distribuye gratis</span>
                : es la que se{" "}
                <span style={{ color: "#A7C7FF" }}>comporta</span>{" "}
                de forma abierta.
              </p>
              <p style={{ margin: 0 }}>
                dashAI es{" "}
                <span style={{ color: "#A7C7FF" }}>Full Open</span>{" "}
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 300, color: "var(--primary)", padding: "0 .15em" }}>+</span>{" "}
                <span style={{ color: "#FEE8FF" }}>Full Extensible</span>.{" "}
                <span style={{ color: "var(--muted-foreground)" }}>Esa es la línea editorial.</span>
              </p>
            </>
          ) : (
            <>
              <p style={{ margin: "0 0 .6em" }}>
                An{" "}
                <span style={{ color: "#A7C7FF" }}>open</span>{" "}
                platform isn&apos;t{" "}
                <span style={{ color: "var(--muted-foreground)" }}>one distributed for free</span>
                : it&apos;s one that{" "}
                <span style={{ color: "#A7C7FF" }}>behaves</span>{" "}
                openly.
              </p>
              <p style={{ margin: 0 }}>
                dashAI is{" "}
                <span style={{ color: "#A7C7FF" }}>Full Open</span>{" "}
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 300, color: "var(--primary)", padding: "0 .15em" }}>+</span>{" "}
                <span style={{ color: "#FEE8FF" }}>Full Extensible</span>.{" "}
                <span style={{ color: "var(--muted-foreground)" }}>That&apos;s the editorial line.</span>
              </p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
