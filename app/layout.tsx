import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dash-ai.com"),
  title: "dashAI | Machine Learning Workbench",
  description:
    "dashAI is an open-source desktop app for data analysis and Machine Learning model training. Local-first.",
  icons: {
    icon: "/images/dashai-isotipo.svg",
    apple: "/images/dashai-isotipo.png",
  },
  openGraph: {
    title: "dashAI | Machine Learning Workbench",
    siteName: "dashAI",
    description:
      "Open-source desktop app for data analysis and Machine Learning model training. Local-first.",
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
