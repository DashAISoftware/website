"use client"

import { useTranslation } from "react-i18next"

export function CommunitySection() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith("es") ? "es" : "en"
  return (
    <section
      id="comunidad"
      className="border-b border-border"
      style={{
        padding: "clamp(80px,11vw,160px) clamp(20px,5vw,96px)",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Head */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-20 mb-14 items-end">
        <div>
          <div className="font-mono text-xs tracking-[.1em] uppercase text-primary">
            <span className="block w-12 h-[3px] mb-[18px] bg-primary" />
            [ 05 ] {lang === "es" ? "Comunidad" : "Community"}
          </div>
        </div>
        <div>
          <h2
            className="font-medium leading-[.96] text-foreground mb-4"
            style={{ fontSize: "clamp(48px,7vw,96px)", letterSpacing: "-.04em" }}
          >
            {lang === "es"
              ? <><em className="not-italic text-[#A7C7FF]">Construyamos</em> esto juntos.</>
              : <><em className="not-italic text-[#A7C7FF]">Let&apos;s build</em> this together.</>}
          </h2>
          <p className="text-muted-foreground leading-[1.5]" style={{ fontSize: "clamp(15px,1.3vw,18px)", maxWidth: "54ch" }}>
            {lang === "es"
              ? "dashAI es código abierto y comunidad abierta. Únete a la conversación, propone componentes, comparte experimentos."
              : "dashAI is open source and open community. Join the conversation, propose components, share experiments."}
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", background: "var(--border)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        {/* Contact */}
        <div className="flex flex-col p-8 min-h-[320px]" style={{ background: "var(--card)" }}>
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[.12em] text-muted-foreground mb-5">
            <span className="w-8 h-8 rounded-md flex items-center justify-center border border-border text-[#A7C7FF]">
              <svg width="18" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 6 10 7 10-7"/>
              </svg>
            </span>
            {lang === "es" ? "Contacto" : "Contact"}
          </div>
          <h3 className="text-2xl font-semibold tracking-tight mb-3">
            {lang === "es" ? "Escríbenos directamente." : "Reach out directly."}
          </h3>
          <p className="text-sm text-muted-foreground leading-[1.55] mb-6 flex-1">
            {lang === "es"
              ? "Consultas, colaboraciones, integraciones institucionales o simplemente para contar qué estás construyendo con dashAI."
              : "Questions, collaborations, institutional integrations, or just to share what you're building with dashAI."}
          </p>
          <a
            href="mailto:dashai.nocode@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm font-medium mb-6 transition-colors"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85" }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
          >
            {lang === "es" ? "Escríbenos" : "Send us an email"} →
          </a>
          <p className="mt-auto font-mono text-[11px] text-muted-foreground border-t border-border pt-4">
            {lang === "es"
              ? "· dashai.nocode@gmail.com · respuesta en < 48h"
              : "· dashai.nocode@gmail.com · reply in < 48h"}
          </p>
        </div>

        {/* Discord */}
        <div className="flex flex-col p-8 min-h-[320px]" style={{ background: "var(--card)" }}>
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[.12em] text-muted-foreground mb-5">
            <span className="w-8 h-8 rounded-md flex items-center justify-center border border-border text-[#5865F2]">
              <svg width="18" height="14" viewBox="0 0 71 55" fill="currentColor" aria-hidden="true">
                <path d="M60.1 4.9A58.5 58.5 0 0 0 45.6.5l-.6 1.1c-5.4-.8-10.7-.8-16 0L28.4.5A58.5 58.5 0 0 0 14 4.9C4.7 18.7 2.2 32.2 3.5 45.6a59.3 59.3 0 0 0 18 9.1l1.5-2a42.5 42.5 0 0 1-6.7-3.2c.6-.4 1.1-.9 1.7-1.3 12.9 6 26.9 6 39.6 0 .5.4 1 .9 1.7 1.3a42 42 0 0 1-6.7 3.2l1.5 2a59.4 59.4 0 0 0 18-9.1c1.5-15.5-2.4-29-10.7-40.7M24.7 37.7c-3.6 0-6.5-3.3-6.5-7.3s2.8-7.3 6.5-7.3 6.6 3.3 6.5 7.3c0 4-2.9 7.3-6.5 7.3m24 0c-3.6 0-6.5-3.3-6.5-7.3s2.8-7.3 6.5-7.3 6.6 3.3 6.5 7.3c0 4-2.8 7.3-6.5 7.3"/>
              </svg>
            </span>
            Discord
          </div>
          <h3 className="text-2xl font-semibold tracking-tight mb-3">
            {lang === "es" ? "Únete al servidor de Discord." : "Join the Discord server."}
          </h3>
          <p className="text-sm text-muted-foreground leading-[1.55] mb-6 flex-1">
            {lang === "es"
              ? "Soporte en vivo, anuncios de release e hilos por módulo (Datasets, Modelos, Generativo, Plugins) para que compartas tus experimentos."
              : "Live support, release announcements and per-module threads (Datasets, Models, Generative, Plugins) to share your experiments."}
          </p>
          <a
            href="https://discord.gg/CQVqMBjeWP"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm font-medium mb-6 transition-colors"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85" }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
          >
            {lang === "es" ? "Unirse al Discord" : "Join Discord"} →
          </a>
          <p className="mt-auto font-mono text-[11px] text-muted-foreground border-t border-border pt-4">
            {lang === "es"
              ? "· Comunidad abierta · acceso inmediato"
              : "· Open community · instant access"}
          </p>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col p-8 min-h-[320px]" style={{ background: "var(--card)" }}>
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[.12em] text-muted-foreground mb-5">
            <span className="w-8 h-8 rounded-md flex items-center justify-center border border-border text-[#A7C7FF]">
              <svg width="18" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            {lang === "es" ? "Lista de correo" : "Mailing List"}
          </div>
          <h3 className="text-2xl font-semibold tracking-tight mb-3">
            {lang === "es" ? "Una actualización mensual." : "One monthly digest."}
          </h3>
          <p className="text-sm text-muted-foreground leading-[1.55] mb-6 flex-1">
            {lang === "es"
              ? "Nuevas features, modelos agregados al catálogo, plugins de la comunidad, papers relevantes. Sin publicidad, sin promociones — solo lo que importa para tu flujo de trabajo."
              : "New features, models added to the catalog, community plugins, relevant papers. No spam, no promos — just what matters for your workflow."}
          </p>
          <a
            href="https://groups.google.com/g/dashai-updates"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm font-medium mb-6 transition-colors"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85" }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
          >
            {lang === "es" ? "Unirse al grupo" : "Join the group"} →
          </a>
          <p className="mt-auto font-mono text-[11px] text-muted-foreground border-t border-border pt-4">
            {lang === "es"
              ? "· Sal cuando quieras · 0 emails comerciales"
              : "· Leave anytime · 0 commercial emails"}
          </p>
        </div>
      </div>
    </section>
  )
}
