import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dash-ai.com"),
  title: "dashAI — Community Hub",
  description:
    "dashAI es una aplicación de escritorio open-source para análisis de datos y entrenamiento de modelos de Machine Learning. Corre localmente bajo licencia MIT.",
  icons: {
    icon: "/images/dashai-isotipo.svg",
    apple: "/images/dashai-isotipo.png",
  },
  openGraph: {
    title: "dashAI — Community Hub",
    description:
      "Aplicación de escritorio open-source para análisis de datos y entrenamiento de modelos de Machine Learning. Local-first, MIT.",
    images: ["/images/dashai-logo-azul.png"],
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
