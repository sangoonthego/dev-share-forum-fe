import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { AIChatbotWidget } from "@/components/agentic/ai-chatbot-widget"
import { MagicBackground } from "@/components/layout/magic-background" 
import "./globals.css"
import { StarBackground } from "@/components/layout/star-background"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevShare Forum",
  description: "Share knowledge, code snippets, and collaborate with developers worldwide",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7C84F5" },
    { media: "(prefers-color-scheme: dark)", color: "#9BA3FF" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased selection:bg-primary/30">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* */}
          {/* <MagicBackground /> */}
          { <StarBackground />}
          {/**/}
          <main className="relative z-10">
            {children}
          </main>

          <AIChatbotWidget />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}