import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import ThemeRegistry from "@/theme/ThemeRegistry"
import { AppProvider } from "@/context/AppContext"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Minh Tri | Web Developer",
  description: "Personal portfolio of Minh Tri, Web Developer",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jetbrainsMono.variable}>
        <AppProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </AppProvider>
      </body>
    </html>
  )
}


import './globals.css'