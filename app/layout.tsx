import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteShell } from "@/components/community/SiteShell"
import { THEME_SCRIPT } from "@/lib/theme"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dash-ai.com"),
  title: { default: "dashAI | Machine Learning Workbench", template: "%s | dashAI" },
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
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  )
}
