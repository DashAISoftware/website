"use client"

import { useTranslation } from "react-i18next"

export function ShowcaseSection() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith("es") ? "es" : "en"

  return (
    <section
      id="showcase"
      className="border-b border-border overflow-hidden"
      style={{
        padding: "clamp(80px,11vw,160px) clamp(20px,5vw,96px)",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Section head */}
      <div className="grid gap-8 md:gap-20 mb-12 md:mb-20" style={{ gridTemplateColumns: "min(240px, 100%) 1fr" }}>
        <div>
          <div className="font-mono text-xs tracking-[.1em] uppercase pt-2 relative text-primary">
            <span className="block w-12 h-[3px] mb-[18px] bg-primary" />
            [ 02 ] {lang === "es" ? "La aplicación" : "The application"}
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[.14em] mb-[18px] text-muted-foreground">
            <span className="text-primary">{"{ ■ }"}</span>
            <span className="inline-block w-6 h-px bg-border" style={{ transform: "translateY(-3px)" }} />
            Schema-driven UI
          </div>
          <h2
            className="font-medium leading-[1.02] text-foreground mb-6"
            style={{ fontSize: "clamp(36px,5.4vw,72px)", letterSpacing: "-.03em", maxWidth: "18ch" }}
          >
            {lang === "es" ? "La interfaz que emerge del schema." : "The interface that emerges from the schema."}
          </h2>
          <p className="text-muted-foreground leading-[1.5]" style={{ fontSize: "clamp(17px,1.3vw,20px)", maxWidth: "62ch" }}>
            {lang === "es"
              ? "Cuando registrás un componente, la UI no se programa: se genera. El servidor expone su schema Pydantic y el frontend renderiza el formulario sin conocerlo previamente."
              : "When you register a component, the UI isn't programmed: it's generated. The server exposes its Pydantic schema and the React frontend renders the form without prior knowledge."}
          </p>
        </div>
      </div>

      {/* Main window + callouts */}
      <div className="grid gap-10 md:gap-20 items-start" style={{ gridTemplateColumns: "1fr min(320px,100%)" }}>
        {/* App window */}
        <div
          className="rounded-xl overflow-hidden border border-border"
          style={{
            background: "var(--card)",
            boxShadow: "0 1px 0 rgba(255,255,255,.04) inset, 0 30px 60px -20px rgba(0,0,0,.6), 0 12px 30px -15px color-mix(in oklab, var(--primary) 22%, transparent)",
          }}
        >
          {/* Chrome */}
          <div className="flex items-center gap-3.5 px-4 py-2.5 border-b border-border" style={{ background: "var(--ink-deep)" }}>
            <div className="flex gap-[7px]">
              <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
            </div>
            <div
              className="flex-1 max-w-[340px] font-mono text-[11.5px] py-1.5 px-3.5 rounded-full text-center text-muted-foreground border border-border"
              style={{ background: "var(--background)" }}
            >
              localhost:8000 / models / tabular-classification
            </div>
          </div>

          {/* App layout */}
          <div className="grid" style={{ gridTemplateColumns: "220px 1fr", minHeight: 480 }}>
            {/* Sidebar */}
            <aside className="border-r border-border p-5 text-sm" style={{ background: "var(--ink-deep)" }}>
              <div className="flex items-center pb-[18px] border-b border-border mb-[18px]">
                <img src="/images/dashai-logo.svg" alt="dash.AI" height={16} style={{ height: 16, width: "auto" }} />
              </div>
              {[
                { label: lang === "es" ? "Workspace" : "Workspace", items: [
                  { name: lang === "es" ? "Datasets"   : "Datasets",   badge: "12"    },
                  { name: lang === "es" ? "Modelos"    : "Models",     badge: "28", active: true },
                  { name: lang === "es" ? "Generativo" : "Generative", badge: "5"    },
                  { name: lang === "es" ? "Plugins"    : "Plugins",    badge: "+"    },
                ]},
                { label: lang === "es" ? "Catálogo" : "Catalog", items: [
                  { name: "Tabular",   badge: "30" },
                  { name: "NLP",       badge: "15" },
                  { name: lang === "es" ? "Traducción" : "Translation", badge: "9" },
                  { name: lang === "es" ? "Visión" : "Vision", badge: "11" },
                ]},
              ].map(sec => (
                <div key={sec.label} className="mb-[18px]">
                  <div className="font-mono text-[10px] uppercase tracking-[.12em] text-muted-foreground mb-2">{sec.label}</div>
                  <ul className="space-y-0.5">
                    {sec.items.map(item => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded text-[12.5px]"
                        style={
                          (item as any).active
                            ? { background: "color-mix(in oklab, var(--primary) 18%, transparent)", color: "#A7C7FF" }
                            : { color: "var(--muted-foreground)" }
                        }
                      >
                        <span>{item.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{item.badge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>

            {/* Main */}
            <div className="p-6 overflow-hidden">
              <div className="font-mono text-[11px] text-muted-foreground mb-2.5">
                <span className="text-[#A7C7FF]">{lang === "es" ? "Modelos" : "Models"}</span> / Tabular / <span>{lang === "es" ? "Configurar" : "Configure"}</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight mb-1">RandomForestClassifier</h3>
              <p className="text-sm text-muted-foreground mb-5">
                {lang === "es" ? "Hiperparámetros generados desde" : "Hyperparameters generated from"}{" "}
                <code className="font-mono text-[#A7C7FF]">MyForestSchema</code>
              </p>

              {/* Form grid */}
              <div className="grid grid-cols-2 gap-px border border-border rounded overflow-hidden" style={{ background: "var(--border)" }}>
                {[
                  { label: "n_estimators", type: "int · 10–1000", name: "", input: <div className="relative h-9 overflow-hidden rounded"><div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--primary) 0%, var(--primary) 35%, var(--ink-deep) 35%)" }}/><div className="relative flex items-center justify-between px-3 h-full text-foreground font-mono text-sm font-semibold"><span>350</span><span className="text-muted-foreground font-normal">1000</span></div></div>, help: lang === "es" ? "Número de árboles en el bosque." : "Number of trees in the forest." },
                  { label: "max_depth", type: "int | None", name: "", input: <div className="flex items-center justify-between border border-border rounded px-3 py-2 font-mono text-sm bg-[var(--ink-deep)]"><span>None</span></div>, help: lang === "es" ? "Profundidad máxima del árbol." : "Maximum depth of the tree." },
                  { label: "criterion", type: "enum", name: "", input: <div className="flex items-center justify-between border border-border rounded px-3 py-2 font-mono text-sm bg-[var(--ink-deep)]"><span>gini</span><span className="text-muted-foreground text-[10px]">▾</span></div>, help: lang === "es" ? "Función para medir la calidad del split." : "Function to measure split quality." },
                  { label: "bootstrap", type: "bool", name: "", input: <div className="flex items-center justify-between border border-border rounded px-3 py-2 font-mono text-sm bg-[var(--ink-deep)]"><span>True</span><span className="bg-primary text-primary-foreground text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full tracking-[.08em]">ON</span></div>, help: lang === "es" ? "Usar muestras bootstrap al construir cada árbol." : "Use bootstrap samples when building each tree." },
                ].map(f => (
                  <div key={f.label} className="p-3.5" style={{ background: "var(--background)" }}>
                    <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[.06em] text-muted-foreground mb-2">
                      <span>{f.label}</span>
                      <span className="text-[#A7C7FF]">{f.type}</span>
                    </div>
                    {f.input}
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-[1.4]">{f.help}</p>
                  </div>
                ))}
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                  <span className="text-primary text-sm leading-none">●</span>
                  {lang === "es" ? "Formulario auto-generado del schema" : "Form auto-generated from schema"}
                  <span className="text-foreground">·</span>
                  {lang === "es" ? "4 campos" : "4 fields"}
                </div>
                <button className="bg-primary text-primary-foreground font-semibold text-[12.5px] px-4 py-2 rounded">
                  {lang === "es" ? "Entrenar →" : "Train →"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Callouts */}
        <div className="flex flex-col gap-8 md:sticky md:top-24">
          {[
            {
              title: lang === "es" ? "1. Schema → UI" : "1. Schema → UI",
              body: lang === "es"
                ? "Cada campo del formulario nace de una línea de Pydantic. Tipo, rango, default y descripción se renderizan automáticamente."
                : "Each form field is born from a Pydantic line. Type, range, default and description render automatically.",
            },
            {
              title: lang === "es" ? "2. Sin código de frontend" : "2. No frontend code",
              body: lang === "es"
                ? "El componente nuevo no toca un solo archivo React. La interfaz aparece sola cuando el backend lo registra."
                : "The new component touches zero React files. The UI shows up on its own once the backend registers it.",
            },
            {
              title: lang === "es" ? "3. Catálogo navegable" : "3. Browsable catalog",
              body: lang === "es"
                ? "Tabular, NLP, traducción, LLMs y visión generativa coexisten en una sola UI consistente — todos sobre las mismas doce abstracciones."
                : "Tabular, NLP, translation, LLMs and generative vision coexist in one consistent UI — all on the same twelve abstractions.",
            },
          ].map(c => (
            <div
              key={c.title}
              className="p-6 border border-border rounded-lg relative"
              style={{ background: "var(--background)" }}
            >
              <span className="absolute w-2 h-2 rounded-full bg-primary -left-[9px] top-6" style={{ boxShadow: "0 0 0 4px color-mix(in oklab, var(--primary) 32%, transparent)" }} />
              <h4 className="font-semibold text-[15px] tracking-tight mb-2">{c.title}</h4>
              <p className="text-[13.5px] text-muted-foreground leading-[1.5]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini shot strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {/* Card 1: Model selector */}
        <div className="border border-border rounded-lg overflow-hidden" style={{ background: "var(--background)" }}>
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border text-[10.5px] font-mono text-muted-foreground" style={{ background: "var(--ink-deep)" }}>
            <div className="flex gap-1"><span className="w-[7px] h-[7px] rounded-full bg-[#FF5F57]"/><span className="w-[7px] h-[7px] rounded-full bg-[#FEBC2E]"/><span className="w-[7px] h-[7px] rounded-full bg-[#28C840]"/></div>
            <span className="ml-1.5">{lang === "es" ? "Catálogo / Modelos" : "Catalog / Models"}</span>
          </div>
          <div className="p-[18px] min-h-[200px]">
            <div className="font-mono text-[10px] text-muted-foreground tracking-[.06em] mb-3">[ TABULAR · 30 ]</div>
            <h5 className="text-sm font-semibold mb-3">{lang === "es" ? "Seleccionar un modelo" : "Pick a model"}</h5>
            <div className="grid grid-cols-2 gap-2">
              {[["RandomForest", lang === "es" ? "Bosque aleatorio" : "Random forest", true],["XGBoost","Gradient boosting",false],["LightGBM","Microsoft GBM",false],["SVM","Support Vector",false],["MLPClassifier",lang === "es" ? "Red neuronal" : "Neural net",false],["KNN","k-Nearest",false]].map(([name, desc, sel]) => (
                <div key={name as string} className="p-2.5 rounded border" style={sel ? { borderColor: "var(--primary)", background: "color-mix(in oklab, var(--primary) 16%, var(--ink-deep))" } : { borderColor: "var(--border)", background: "var(--ink-deep)" }}>
                  <div className="font-mono text-[11px] mb-0.5" style={sel ? { color: "#A7C7FF" } : { color: "var(--foreground)" }}>{name}</div>
                  <div className="text-[10px] text-muted-foreground leading-[1.4]">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Results */}
        <div className="border border-border rounded-lg overflow-hidden" style={{ background: "var(--background)" }}>
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border text-[10.5px] font-mono text-muted-foreground" style={{ background: "var(--ink-deep)" }}>
            <div className="flex gap-1"><span className="w-[7px] h-[7px] rounded-full bg-[#FF5F57]"/><span className="w-[7px] h-[7px] rounded-full bg-[#FEBC2E]"/><span className="w-[7px] h-[7px] rounded-full bg-[#28C840]"/></div>
            <span className="ml-1.5">{lang === "es" ? "Resultados / Job #218" : "Results / Job #218"}</span>
          </div>
          <div className="p-[18px] min-h-[200px]">
            <div className="font-mono text-[10px] text-muted-foreground tracking-[.06em] mb-3">[ {lang === "es" ? "COMPLETADO" : "COMPLETED"} · 2m 14s ]</div>
            <h5 className="text-sm font-semibold mb-3">{lang === "es" ? "Métricas de validación" : "Validation metrics"}</h5>
            {[["accuracy","0.9342","#90F1C4"],["f1_macro","0.9118","#90F1C4"],["precision","0.8987","#90F1C4"],["recall","0.8512","#FFA578"]].map(([k,v,c]) => (
              <div key={k} className="flex justify-between items-center py-2 border-b border-dashed border-border font-mono text-[11px] last:border-b-0">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-semibold" style={{ color: c }}>{v}</span>
              </div>
            ))}
            <div className="mt-3.5 h-[62px] border border-border rounded overflow-hidden p-1.5" style={{ background: "var(--ink-deep)" }}>
              <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="w-full h-full">
                <polyline points="0,42 20,38 40,30 60,32 80,22 100,18 120,14 140,16 160,11 180,9 200,7" fill="none" stroke="var(--primary)" strokeWidth="1.6"/>
                <polyline points="0,42 20,38 40,30 60,32 80,22 100,18 120,14 140,16 160,11 180,9 200,7" fill="none" stroke="var(--primary)" strokeWidth="6" opacity=".15"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Jobs */}
        <div className="border border-border rounded-lg overflow-hidden" style={{ background: "var(--background)" }}>
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border text-[10.5px] font-mono text-muted-foreground" style={{ background: "var(--ink-deep)" }}>
            <div className="flex gap-1"><span className="w-[7px] h-[7px] rounded-full bg-[#FF5F57]"/><span className="w-[7px] h-[7px] rounded-full bg-[#FEBC2E]"/><span className="w-[7px] h-[7px] rounded-full bg-[#28C840]"/></div>
            <span className="ml-1.5">Jobs · {lang === "es" ? "Cola" : "Queue"}</span>
          </div>
          <div className="p-[18px] min-h-[200px]">
            <div className="font-mono text-[10px] text-muted-foreground tracking-[.06em] mb-3">[ 8 BaseJob · 2 {lang === "es" ? "activos" : "running"} ]</div>
            <h5 className="text-sm font-semibold mb-3">{lang === "es" ? "Orquestación" : "Orchestration"}</h5>
            {[
              { pill: lang === "es" ? "Activo" : "Running", pillStyle: { background: "color-mix(in oklab, #90F1C4 25%, var(--ink-deep))", color: "#90F1C4", border: "1px solid color-mix(in oklab, #90F1C4 40%, transparent)" }, name: "train_rf_v2",  meta: "68%" },
              { pill: lang === "es" ? "Activo" : "Running", pillStyle: { background: "color-mix(in oklab, #90F1C4 25%, var(--ink-deep))", color: "#90F1C4", border: "1px solid color-mix(in oklab, #90F1C4 40%, transparent)" }, name: "explain_shap", meta: "12s" },
              { pill: lang === "es" ? "Listo"  : "Done",    pillStyle: { background: "color-mix(in oklab, var(--primary) 22%, var(--ink-deep))", color: "#A7C7FF", border: "1px solid color-mix(in oklab, var(--primary) 40%, transparent)" }, name: "predict_test", meta: "1m 4s" },
              { pill: lang === "es" ? "Cola"   : "Queued",  pillStyle: { background: "var(--background)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }, name: "optimize_hpo", meta: "—" },
            ].map(j => (
              <div key={j.name} className="flex items-center gap-2.5 py-2 border-b border-dashed border-border text-xs last:border-b-0">
                <span className="font-mono text-[9.5px] px-[7px] py-[2px] rounded-full uppercase tracking-[.06em] whitespace-nowrap" style={j.pillStyle}>{j.pill}</span>
                <span className="flex-1 font-mono text-[11.5px] text-foreground">{j.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{j.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
