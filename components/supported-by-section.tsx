"use client"

import { useTranslation } from "react-i18next"

const PAPER = "#FEFEFF"
const PAPER_LINE = "#E3E2DF"
const PAPER_DEEP = "#F4F4F2"
const ON_LIGHT = "#191817"
const ON_LIGHT_MUTE = "#4A4744"
const ON_LIGHT_FAINT = "#6C685F"
const BRAND_ON_LIGHT = "#1E63D8"

const COLLABS = [
  {
    acro: "CENIA",
    name: { es: "Centro Nacional de Inteligencia Artificial", en: "National Center for Artificial Intelligence" },
    role: { es: "Institución líder", en: "Lead institution" },
    meta: "Chile",
    url: "https://www.cenia.cl/",
  },
  {
    acro: "UCHILE",
    name: { es: "Universidad de Chile · DCC, FCFM", en: "University of Chile · DCC, FCFM" },
    role: { es: "Investigación y desarrollo", en: "Research & development" },
    meta: "DCC",
    url: "https://dcc.uchile.cl/",
  },
  {
    acro: "USM",
    name: { es: "Universidad Técnica Federico Santa María", en: "Federico Santa María Technical University" },
    role: { es: "Investigación y desarrollo", en: "Research & development" },
    meta: "Chile",
    url: "https://www.usm.cl/",
  },
  {
    acro: "IMFD",
    name: { es: "Instituto Milenio Fundamentos de los Datos", en: "Millennium Institute for Foundational Research on Data" },
    role: { es: "Colaboración científica", en: "Scientific collaboration" },
    meta: "ICN17_002",
    url: "https://www.imfd.cl/",
  },
  {
    acro: "ANID",
    name: { es: "Agencia Nacional de Investigación y Desarrollo", en: "National Agency for Research and Development" },
    role: { es: "Financiamiento público", en: "Public funding" },
    meta: "Fondef IDEA",
    url: "https://anid.cl/",
  },
]

export function SupportedBySection() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith("es") ? "es" : "en"

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
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5"
        style={{
          gap: "1px",
          background: PAPER_LINE,
          border: `1px solid ${PAPER_LINE}`,
        }}
      >
        {COLLABS.map(c => (
          <a
            key={c.acro}
            href={c.url}
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
              {c.acro}
            </div>
            <div className="mt-[18px] font-medium leading-[1.35] tracking-tight" style={{ fontSize: 15.5, color: ON_LIGHT, maxWidth: "24ch" }}>
              {lang === "es" ? c.name.es : c.name.en}
            </div>
            <div
              className="mt-auto pt-5 font-mono"
              style={{ fontSize: 11.5, letterSpacing: ".06em", color: ON_LIGHT_FAINT, borderTop: `1px dashed ${PAPER_LINE}` }}
            >
              {lang === "es" ? c.role.es : c.role.en}
              <span style={{ color: BRAND_ON_LIGHT, padding: "0 .3em" }}>·</span>
              {c.meta}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
