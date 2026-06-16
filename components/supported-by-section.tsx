"use client"

import { useTranslation } from "react-i18next"
import { getInstitutions, getAcknowledgmentsText, getFunderLogos } from "@/lib/institutions"

const PAPER = "#FEFEFF"
const PAPER_LINE = "#E3E2DF"
const PAPER_DEEP = "#F4F4F2"
const ON_LIGHT = "#191817"
const ON_LIGHT_MUTE = "#4A4744"
const ON_LIGHT_FAINT = "#6C685F"
const BRAND_ON_LIGHT = "#1E63D8"

export function SupportedBySection() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith("es") ? "es" : "en"
  const institutions = [
    ...getInstitutions(),
    ...getFunderLogos().map(f => ({
      id: f.id,
      name: f.name,
      fullName: f.fullName,
      url: f.url,
      logo: f.logo,
      role: lang === "es" ? "Financiamiento público" : "Public funding",
    })),
  ]
  const acknowledgment = getAcknowledgmentsText(lang)

  return (
    <section
      id="colaboradores"
      className="border-b"
      style={{ padding: "clamp(80px,11vw,160px) clamp(20px,5vw,96px)", background: PAPER, color: ON_LIGHT, borderColor: PAPER_LINE }}
    >
      {/* Head */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-20 mb-14">
        <div>
          <div className="font-mono text-xs tracking-[.1em] uppercase pt-2" style={{ color: BRAND_ON_LIGHT }}>
            <span className="block w-12 h-[3px] mb-[18px]" style={{ background: BRAND_ON_LIGHT }} />
            [ 06 ] {lang === "es" ? "Colaboradores" : "Collaborators"}
          </div>
        </div>
        <div>
          <h2
            className="font-medium leading-[.96] mb-5"
            style={{ fontSize: "clamp(48px,7vw,96px)", letterSpacing: "-.04em", color: ON_LIGHT }}
          >
            {lang === "es"
              ? <>Construido entre <span style={{ color: BRAND_ON_LIGHT }}>instituciones</span>.</>
              : <>Built across <span style={{ color: BRAND_ON_LIGHT }}>institutions</span>.</>}
          </h2>
          <p style={{ fontSize: "clamp(15px,1.3vw,20px)", maxWidth: "58ch", lineHeight: 1.5, color: ON_LIGHT_MUTE }}>
            {lang === "es"
              ? "dashAI es un proyecto académico chileno mantenido por una red de instituciones de investigación y financiamiento público."
              : "dashAI is a Chilean academic project maintained by a network of research institutions and public funding bodies."}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4"
        style={{
          gap: "1px",
          background: PAPER_LINE,
          border: `1px solid ${PAPER_LINE}`,
        }}
      >
        {institutions.map(inst => (
          <a
            key={inst.id}
            href={inst.url}
            target="_blank"
            rel="noopener"
            className="flex flex-col p-7 min-h-[230px] transition-colors duration-200 group no-underline"
            style={{ background: PAPER }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = PAPER_DEEP }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = PAPER }}
          >
            <div
              className="font-mono font-medium leading-none"
              style={{ fontSize: "clamp(28px,3.4vw,42px)", letterSpacing: "-.03em", color: ON_LIGHT }}
            >
              {inst.id.toUpperCase()}
            </div>
            <div className="mt-[18px] font-medium leading-[1.35] tracking-tight" style={{ fontSize: 15.5, color: ON_LIGHT, maxWidth: "24ch" }}>
              {inst.fullName || inst.name}
            </div>
            <div
              className="mt-auto pt-5 font-mono"
              style={{ fontSize: 11.5, letterSpacing: ".06em", color: ON_LIGHT_FAINT, borderTop: `1px dashed ${PAPER_LINE}` }}
            >
              {inst.role}
            </div>
          </a>
        ))}
      </div>

      {/* Acknowledgments / funding */}
      {acknowledgment && (
        <p
          className="mt-10 font-mono"
          style={{ fontSize: 12.5, lineHeight: 1.6, letterSpacing: ".02em", color: ON_LIGHT_FAINT, maxWidth: "80ch" }}
        >
          {acknowledgment}
        </p>
      )}
    </section>
  )
}
