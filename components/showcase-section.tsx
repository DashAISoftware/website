"use client"

import { useTranslation } from "react-i18next"

export function ShowcaseSection() {
  const { t } = useTranslation("showcase")
  const callouts = t("callouts", { returnObjects: true }) as Array<{ title: string; body: string }>

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
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-20 mb-12 md:mb-20">
        <div>
          <div className="font-mono text-xs tracking-[.1em] uppercase pt-2 relative text-primary">
            <span className="block w-12 h-[3px] mb-[18px] bg-primary" />
            [ 02 ] {t("sectionLabel")}
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
            {t("heading")}
          </h2>
          <p className="text-muted-foreground leading-[1.5]" style={{ fontSize: "clamp(17px,1.3vw,20px)", maxWidth: "62ch" }}>
            {t("description")}
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
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]" style={{ minHeight: 480 }}>
            {/* Sidebar */}
            <aside className="hidden md:block border-r border-border p-5 text-sm" style={{ background: "var(--ink-deep)" }}>
              <div className="flex items-center pb-[18px] border-b border-border mb-[18px]">
                <img src="/images/dashai-logo.svg" alt="dash.AI" height={16} style={{ height: 16, width: "auto" }} />
              </div>
              {[
                { label: t("sidebar.workspaceLabel"), items: [
                  { name: t("sidebar.datasets"),   badge: "12" },
                  { name: t("sidebar.models"),     badge: "28", active: true },
                  { name: t("sidebar.generative"), badge: "5" },
                  { name: t("sidebar.plugins"),    badge: "+" },
                ]},
                { label: t("sidebar.catalogLabel"), items: [
                  { name: t("sidebar.tabular"),     badge: "30" },
                  { name: t("sidebar.nlp"),         badge: "15" },
                  { name: t("sidebar.translation"), badge: "9" },
                  { name: t("sidebar.vision"),      badge: "11" },
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
                <span className="text-[#A7C7FF]">{t("sidebar.models")}</span> / Tabular / <span>{t("main.configure")}</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight mb-1">RandomForestClassifier</h3>
              <p className="text-sm text-muted-foreground mb-5">
                {t("main.hyperparamsFrom")}{" "}
                <code className="font-mono text-[#A7C7FF]">MyForestSchema</code>
              </p>

              {/* Form grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-border rounded overflow-hidden" style={{ background: "var(--border)" }}>
                {[
                  { label: "n_estimators", type: "int · 10–1000", input: <div className="relative h-9 overflow-hidden rounded"><div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--primary) 0%, var(--primary) 35%, var(--ink-deep) 35%)" }}/><div className="relative flex items-center justify-between px-3 h-full text-foreground font-mono text-sm font-semibold"><span>350</span><span className="text-muted-foreground font-normal">1000</span></div></div>, help: t("main.form.nEstimatorsHelp") },
                  { label: "max_depth",    type: "int | None",    input: <div className="flex items-center justify-between border border-border rounded px-3 py-2 font-mono text-sm bg-[var(--ink-deep)]"><span>None</span></div>, help: t("main.form.maxDepthHelp") },
                  { label: "criterion",    type: "enum",          input: <div className="flex items-center justify-between border border-border rounded px-3 py-2 font-mono text-sm bg-[var(--ink-deep)]"><span>gini</span><span className="text-muted-foreground text-[10px]">▾</span></div>, help: t("main.form.criterionHelp") },
                  { label: "bootstrap",    type: "bool",          input: <div className="flex items-center justify-between border border-border rounded px-3 py-2 font-mono text-sm bg-[var(--ink-deep)]"><span>True</span><span className="bg-primary text-primary-foreground text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full tracking-[.08em]">ON</span></div>, help: t("main.form.bootstrapHelp") },
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
                  {t("main.formAutoGenerated")}
                  <span className="text-foreground">·</span>
                  {t("main.fields")}
                </div>
                <button className="bg-primary text-primary-foreground font-semibold text-[12.5px] px-4 py-2 rounded">
                  {t("main.train")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Callouts */}
        <div className="flex flex-col gap-8 md:sticky md:top-24">
          {callouts.map(c => (
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
            <span className="ml-1.5">{t("strip.card1.title")}</span>
          </div>
          <div className="p-[18px] min-h-[200px]">
            <div className="font-mono text-[10px] text-muted-foreground tracking-[.06em] mb-3">[ TABULAR · 30 ]</div>
            <h5 className="text-sm font-semibold mb-3">{t("strip.card1.heading")}</h5>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["RandomForest", t("strip.card1.randomForest"), true],
                ["XGBoost",      "Gradient boosting",           false],
                ["LightGBM",     "Microsoft GBM",               false],
                ["SVM",          "Support Vector",              false],
                ["MLPClassifier", t("strip.card1.neuralNet"),   false],
                ["KNN",          "k-Nearest",                   false],
              ].map(([name, desc, sel]) => (
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
            <span className="ml-1.5">{t("strip.card2.title")}</span>
          </div>
          <div className="p-[18px] min-h-[200px]">
            <div className="font-mono text-[10px] text-muted-foreground tracking-[.06em] mb-3">[ {t("strip.card2.status")} · 2m 14s ]</div>
            <h5 className="text-sm font-semibold mb-3">{t("strip.card2.heading")}</h5>
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
            <span className="ml-1.5">Jobs · {t("strip.card3.queueLabel")}</span>
          </div>
          <div className="p-[18px] min-h-[200px]">
            <div className="font-mono text-[10px] text-muted-foreground tracking-[.06em] mb-3">[ 8 BaseJob · 2 {t("strip.card3.runningCount")} ]</div>
            <h5 className="text-sm font-semibold mb-3">{t("strip.card3.heading")}</h5>
            {[
              { pill: t("strip.card3.pills.running"), pillStyle: { background: "color-mix(in oklab, #90F1C4 25%, var(--ink-deep))", color: "#90F1C4", border: "1px solid color-mix(in oklab, #90F1C4 40%, transparent)" }, name: "train_rf_v2",  meta: "68%" },
              { pill: t("strip.card3.pills.running"), pillStyle: { background: "color-mix(in oklab, #90F1C4 25%, var(--ink-deep))", color: "#90F1C4", border: "1px solid color-mix(in oklab, #90F1C4 40%, transparent)" }, name: "explain_shap", meta: "12s" },
              { pill: t("strip.card3.pills.done"),    pillStyle: { background: "color-mix(in oklab, var(--primary) 22%, var(--ink-deep))", color: "#A7C7FF", border: "1px solid color-mix(in oklab, var(--primary) 40%, transparent)" }, name: "predict_test", meta: "1m 4s" },
              { pill: t("strip.card3.pills.queued"),  pillStyle: { background: "var(--background)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }, name: "optimize_hpo", meta: "—" },
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
