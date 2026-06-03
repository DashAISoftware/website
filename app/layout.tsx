import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "dashAI - Full Open. Full Extensible.",
  description:
    "An open-source no-code Visual ML platform. No paywall, no closed components, no external API keys required.",
  generator: "v0.app",
  icons: {
    icon: "/images/dashai-isotype.svg",
    apple: "/images/dashai-isotype.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
