"use client"

import { useTranslation } from "react-i18next"

const PAPER = "#FEFEFF"
const PAPER_LINE = "#E3E2DF"
const ON_LIGHT = "#191817"
const ON_LIGHT_MUTE = "#4A4744"
const ON_LIGHT_FAINT = "#6C685F"
const PLUGINS_COLOR = "#1E63D8"
const BRAND_ON_LIGHT = "#1E63D8"
const CODE_BG = "#131211"
const CODE_HEADER_BG = "#191817"
const CODE_BORDER = "#2E2C29"

const MODULES = [
  { num: "01", name: "BaseTask",             role: { es: "Tarea",            en: "Task"            }, desc: { es: "Paradigmas extensibles: clasificación, regresión, NLP, traducción, generación.", en: "Extensible paradigms: classification, regression, NLP, translation, generation." } },
  { num: "02", name: "BaseModel",            role: { es: "Modelo predictivo", en: "Predictive model"}, desc: { es: "Random Forest a transformers. Subclase + schema, listo para HPO.", en: "Random Forest to transformers. Subclass + schema, ready for HPO." } },
  { num: "03", name: "BaseGenerativeModel",  role: { es: "Modelo generativo", en: "Generative model"}, desc: { es: "LLMs e imagen como ciudadanos de primera clase.", en: "LLMs and image as first-class citizens." } },
  { num: "04", name: "BaseMetric",           role: { es: "Métrica",          en: "Metric"          }, desc: { es: "Classification, Regression, Translation. Aparece sola en la UI.", en: "Classification, Regression, Translation. Auto-appears in UI." } },
  { num: "05", name: "BaseOptimizer",        role: { es: "Optimización HPO",  en: "HPO optimizer"   }, desc: { es: "Optuna + HyperOpt. Estrategias bayesianas, evolutivas, QMC.", en: "Optuna + HyperOpt. Bayesian, evolutionary, QMC strategies." } },
  { num: "06", name: "BaseDataLoader",       role: { es: "Carga de datos",   en: "Data loader"     }, desc: { es: "CSV, JSON, imágenes, audio. Cada loader declara su formato.", en: "CSV, JSON, images, audio. Each loader declares its format." } },
  { num: "07", name: "BaseExplorer",         role: { es: "EDA / exploración", en: "EDA / exploration"}, desc: { es: "Visualizaciones, perfilado, distribuciones — tipado.", en: "Visualizations, profiling, distributions — typed." } },
  { num: "08", name: "BaseConverter",        role: { es: "Conversor",        en: "Converter"       }, desc: { es: "Transformaciones tipadas entre formatos y representaciones.", en: "Typed transformations between formats and representations." } },
  { num: "09", name: "BaseGlobalExplainer",  role: { es: "XAI global",       en: "Global XAI"      }, desc: { es: "Permutation importance, surrogate, partial dependence.", en: "Permutation importance, surrogate, partial dependence." } },
  { num: "10", name: "BaseLocalExplainer",   role: { es: "XAI local",        en: "Local XAI"       }, desc: { es: "SHAP, LIME, counterfactuals con abstracción dedicada.", en: "SHAP, LIME, counterfactuals with dedicated abstraction." } },
  { num: "11", name: "BaseJob",              role: { es: "Orquestación",     en: "Orchestration"   }, desc: { es: "Train, predict, explain, explore, convert, generate, evaluate, optimize.", en: "Train, predict, explain, explore, convert, generate, evaluate, optimize." } },
  { num: "12", name: "BaseGenerativeTask",   role: { es: "Tarea generativa", en: "Generative task" }, desc: { es: "Generación condicional, text-to-image, seq-to-seq.", en: "Conditional generation, text-to-image, seq-to-seq." } },
]

export function ExtensibleSection() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith("es") ? "es" : "en"

  return (
    <section
      id="extensible"
      className="border-b"
      style={{
        padding: "clamp(80px,11vw,160px) clamp(20px,5vw,96px)",
        background: PAPER,
        color: ON_LIGHT,
        borderColor: PAPER_LINE,
      }}
    >
      {/* Section head */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-20 mb-0">
        <div>
          <div className="font-mono text-xs tracking-[.1em] uppercase pt-2 relative" style={{ color: PLUGINS_COLOR }}>
            <span className="block w-12 h-[3px] mb-[18px]" style={{ background: PLUGINS_COLOR }} />
            [ 03 ] {lang === "es" ? "Extensibilidad" : "Extensibility"}
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[.14em] mb-[18px]" style={{ color: ON_LIGHT_FAINT }}>
            <span style={{ color: PLUGINS_COLOR }}>{"{ II }"}</span>
            <span className="inline-block w-6 h-px" style={{ background: PAPER_LINE, transform: "translateY(-3px)" }} />
            {lang === "es" ? "Doce abstracciones" : "Twelve abstractions"}
          </div>
          <h2
            className="font-medium leading-[.96] mb-6"
            style={{ fontSize: "clamp(48px,7vw,104px)", letterSpacing: "-.04em", color: ON_LIGHT }}
          >
            <span style={{ color: PLUGINS_COLOR }}>Full</span> Extensible<span style={{ color: ON_LIGHT_MUTE }}>.</span>
          </h2>
          <p style={{ fontSize: "clamp(17px,1.5vw,22px)", maxWidth: "58ch", lineHeight: 1.5, color: ON_LIGHT_MUTE }}>
            {lang === "es"
              ? "Cada rol funcional tiene su clase base. Veinte a cuarenta líneas para un componente nuevo. La UI emerge del schema, no se programa."
              : "Each functional role has its base class. Twenty to forty lines for a new component. The UI emerges from the schema — it isn't programmed."}
          </p>
        </div>
      </div>

      {/* 12 Modules grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-16"
        style={{
          borderTop: `1px solid ${PAPER_LINE}`,
          borderLeft: `1px solid ${PAPER_LINE}`,
        }}
      >
        {MODULES.map(m => (
          <div
            key={m.num}
            className="p-7 relative min-h-[200px] transition-colors duration-200 group"
            style={{ borderRight: `1px solid ${PAPER_LINE}`, borderBottom: `1px solid ${PAPER_LINE}` }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F4F4F2")}
            onMouseLeave={e => (e.currentTarget.style.background = "")}
          >
            <div className="font-mono text-[11px] tracking-[.1em]" style={{ color: ON_LIGHT_FAINT }}>{m.num}</div>
            <div className="font-mono text-[15px] font-medium mt-3.5 break-all" style={{ color: BRAND_ON_LIGHT }}>{m.name}</div>
            <div className="text-base font-medium mt-3.5 mb-2 tracking-tight" style={{ color: ON_LIGHT }}>{lang === "es" ? m.role.es : m.role.en}</div>
            <div className="text-[13.5px] leading-[1.5]" style={{ color: ON_LIGHT_MUTE }}>{lang === "es" ? m.desc.es : m.desc.en}</div>
            <div className="absolute right-4.5 bottom-4.5 flex flex-col gap-[3px] opacity-40 group-hover:opacity-100 transition-opacity">
              {[14, 22, 14].map((w, i) => <span key={i} className="h-[3px] rounded-full block" style={{ width: w, background: BRAND_ON_LIGHT }} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Arch grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-8 xl:gap-18 items-start mt-20 md:mt-24">
        {/* Arch points */}
        <div className="flex flex-col gap-7">
          {[
            { ico: "⬡", title: "Schema-driven UI", body: { es: "El servidor expone el schema Pydantic; el frontend React renderiza el formulario sin conocerlo previamente.", en: "The server exposes the Pydantic schema; the React frontend renders the form without prior knowledge." } },
            { ico: "↻", title: lang === "es" ? "Hot-install desde la UI" : "Hot-install from the UI", body: { es: "Un click instala una extensión desde PyPI. Sin reiniciar, sin shell externa.", en: "One click installs an extension from PyPI. No restart, no external shell." } },
            { ico: "▶", title: lang === "es" ? "API HTTP pública" : "Public HTTP API", body: { es: <>Cualquier cliente HTTP — Python, Jupyter, CLI — consulta componentes y lanza jobs. <code className="font-mono text-xs">GET /component/</code>, <code className="font-mono text-xs">POST /job/</code>.</>, en: <>Any HTTP client — Python, Jupyter, CLI — queries components and launches jobs. <code className="font-mono text-xs">GET /component/</code>, <code className="font-mono text-xs">POST /job/</code>.</> } },
            { ico: "⚡", title: "FastAPI + React, not desktop", body: { es: "El servidor corre en cualquier máquina, accesible desde el navegador — local, red o remoto.", en: "The server runs anywhere, reachable from any browser — local, network or remote." } },
          ].map(p => (
            <div key={p.title} className="grid gap-4.5 pb-7" style={{ gridTemplateColumns: "56px 1fr", borderBottom: `1px solid ${PAPER_LINE}` }}>
              <div className="w-[50px] h-[50px] rounded-md flex items-center justify-center font-mono text-[18px] border shrink-0" style={{ background: "#F4F4F2", borderColor: PAPER_LINE, color: BRAND_ON_LIGHT }}>
                {p.ico}
              </div>
              <div>
                <h4 className="text-lg font-semibold tracking-tight mb-2" style={{ color: ON_LIGHT }}>{p.title}</h4>
                <p className="text-sm leading-[1.55]" style={{ color: ON_LIGHT_MUTE }}>{lang === "es" ? p.body.es : p.body.en}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Code block */}
        <div
          className="rounded-lg overflow-hidden border"
          style={{ background: CODE_BG, borderColor: CODE_BORDER, fontFamily: "var(--font-mono)" }}
        >
          <div className="flex items-center justify-between px-4.5 py-3 border-b" style={{ background: CODE_HEADER_BG, borderColor: CODE_BORDER }}>
            <div className="flex gap-1.5">
              <span className="w-[9px] h-[9px] rounded-full bg-primary" />
              <span className="w-[9px] h-[9px] rounded-full" style={{ background: CODE_BORDER }} />
              <span className="w-[9px] h-[9px] rounded-full" style={{ background: CODE_BORDER }} />
            </div>
            <span className="font-mono text-[11px]" style={{ color: ON_LIGHT_FAINT }}>my_classifier.py</span>
          </div>
          <pre className="m-0 px-5 py-4.5 overflow-x-auto text-[13px] leading-[1.7]" style={{ background: CODE_BG, color: "#FEFEFF" }}>
            <code>{`\
`}<span className="code-com"># {lang === "es" ? "Un clasificador completo en dashAI" : "A complete classifier in dashAI"}</span>{`
`}<span className="code-kw">from</span>{` dashai.base `}<span className="code-kw">import</span>{` `}<span className="code-cls">BaseModel</span>{`
`}<span className="code-kw">from</span>{` dashai.core.schema_fields `}<span className="code-kw">import</span>{` schema_field, optimizer_int_field
`}<span className="code-kw">from</span>{` sklearn.ensemble `}<span className="code-kw">import</span>{` RandomForestClassifier

`}<span className="code-kw">class</span>{` `}<span className="code-cls">MyForestSchema</span>{`(BaseSchema):
    n_estimators: `}<span className="code-cls">schema_field</span>{`(
        `}<span className="code-cls">optimizer_int_field</span>{`(ge=`}<span className="code-num">1</span>{`),
        placeholder={
            `}<span className="code-str">&quot;optimize&quot;</span>{`: `}<span className="code-cls">False</span>{`, `}<span className="code-str">&quot;fixed_value&quot;</span>{`: `}<span className="code-num">100</span>{`,
            `}<span className="code-str">&quot;lower_bound&quot;</span>{`: `}<span className="code-num">50</span>{`, `}<span className="code-str">&quot;upper_bound&quot;</span>{`: `}<span className="code-num">200</span>{`,
        },
        description=`}<span className="code-str">&quot;{lang === "es" ? "Número de árboles" : "Number of trees"}&quot;</span>{`,
    )
    max_depth: `}<span className="code-cls">schema_field</span>{`(
        `}<span className="code-cls">optimizer_int_field</span>{`(ge=`}<span className="code-num">1</span>{`),
        placeholder={
            `}<span className="code-str">&quot;optimize&quot;</span>{`: `}<span className="code-cls">False</span>{`, `}<span className="code-str">&quot;fixed_value&quot;</span>{`: `}<span className="code-num">2</span>{`,
            `}<span className="code-str">&quot;lower_bound&quot;</span>{`: `}<span className="code-num">2</span>{`, `}<span className="code-str">&quot;upper_bound&quot;</span>{`: `}<span className="code-num">10</span>{`,
        },
        description=`}<span className="code-str">&quot;{lang === "es" ? "Profundidad máxima" : "Maximum depth"}&quot;</span>{`,
    )

`}<span className="code-kw">class</span>{` `}<span className="code-cls">MyForest</span>{`(`}<span className="code-cls">BaseModel</span>{`):
    SCHEMA = MyForestSchema

    `}<span className="code-kw">def</span>{` `}<span className="code-fn">train</span>{`(`}<span className="code-kw">self</span>{`, X, y):
        `}<span className="code-kw">self</span>{`.model = RandomForestClassifier(
            **`}<span className="code-kw">self</span>{`.params
        ).fit(X, y)

    `}<span className="code-kw">def</span>{` `}<span className="code-fn">predict</span>{`(`}<span className="code-kw">self</span>{`, X):
        `}<span className="code-kw">return</span>{` `}<span className="code-kw">self</span>{`.model.predict(X)`}</code>
          </pre>
          <div className="flex justify-between px-4.5 py-2.5 border-t font-mono text-[11px]" style={{ background: CODE_HEADER_BG, borderColor: CODE_BORDER, color: ON_LIGHT_FAINT }}>
            <span>{lang === "es" ? "33 líneas | UI auto-generada" : "33 lines | UI auto-generated"}</span>
            <span>python ≥ 3.10</span>
          </div>
        </div>
      </div>
    </section>
  )
}
