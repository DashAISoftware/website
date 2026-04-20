"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next";

const participatingInstitutions = [
  {
    name: "DCC Universidad de Chile",
    logo: "supported-by/dcc-logo.png",
    url: "https://dcc.uchile.cl/",
  },
  {
    name: "Universidad Técnica Federico Santa María",
    logo: "supported-by/utfsm-logo.jpg",
    url: "https://www.usm.cl/",
  },
  {
    name: "Centro Nacional de Inteligencia Artificial",
    logo: "supported-by/cenia-logo.png",
    url: "https://www.cenia.cl/",
  },
  {
    name: "Instituto Milenio Fundamentos de los Datos",
    logo: "supported-by/imfd-logo.png",
    url: "https://www.imfd.cl/",
  },
  {
    name: "Agencia Nacional de Investigación y Desarrollo (ANID)",
    logo: "supported-by/anid-logo.png",
    url: "https://www.anid.cl/",
  }
]

const fundingInstitution = {
  name: "Institución Financiadora",
  logo: "supported-by/idea-logo.png",
  url: "#",
}

const partnerOrganizations = [
  {
    name: "Organización Asociada 1",
    logo: "/placeholder-logo.png",
    url: "#",
  },
  {
    name: "Organización Asociada 2",
    logo: "/placeholder-logo.png",
    url: "#",
  },
]

export function SupportedBySection() {

  const { t } = useTranslation();
  return (
    <section id="support" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">{t("supportedBy:title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("supportedBy:description")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Participating Institutions */}
          {/* <div>
            <h3 className="text-xl font-semibold mb-8 text-center text-muted-foreground">
              Participating Institutions
            </h3> */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {participatingInstitutions.map((institution, index) => {
                const isSmallLogo = institution.logo.includes("dcc-logo") || institution.logo.includes("utfsm-logo")
                return (
                  <Card
                    key={index}
                    className="bg-white border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                    onClick={() => window.open(institution.url, "_blank", "noopener,noreferrer")}
                  >
                    <CardContent className="p-6 flex items-center justify-center h-32">
                      <img
                        src={institution.logo}
                        alt={institution.name}
                        className={`max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity ${
                          isSmallLogo ? "max-h-28" : "max-h-20"
                        }`}
                      />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          {/* </div> */}

          {/* Funding Institution */}
          {/* <div>
            <h3 className="text-xl font-semibold mb-8 text-center text-muted-foreground">Funding</h3>
            <div className="flex justify-center">
              <Card
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer max-w-md w-full"
                onClick={() => window.open(fundingInstitution.url, "_blank", "noopener,noreferrer")}
              >
                <CardContent className="p-8 flex items-center justify-center">
                  <img
                    src={fundingInstitution.logo}
                    alt={fundingInstitution.name}
                    className="w-full h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </CardContent>
              </Card>
            </div>
          </div> */}

          {/* Partner Organizations */}
          {/* <div>
            <h3 className="text-xl font-semibold mb-8 text-center text-muted-foreground">
              In Partnership With
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {partnerOrganizations.map((organization, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                  onClick={() => window.open(organization.url, "_blank", "noopener,noreferrer")}
                >
                  <CardContent className="p-6 flex items-center justify-center h-32">
                    <img
                      src={organization.logo}
                      alt={organization.name}
                      className="max-w-full max-h-20 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

