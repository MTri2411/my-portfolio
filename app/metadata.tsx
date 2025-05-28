import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Minh Tri | Web Developer",
  description: "Personal portfolio of Minh Tri, Web Developer",
  generator: 'v0.dev',
  keywords: ["web developer", "portfolio", "react", "nextjs", "typescript"],
  authors: [{ name: "Minh Tri" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Minh Tri | Web Developer",
    description: "Personal portfolio of Minh Tri, Web Developer",
    url: "https://your-domain.com",
    siteName: "Minh Tri Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minh Tri | Web Developer",
    description: "Personal portfolio of Minh Tri, Web Developer",
    creator: "@your_twitter",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
} 

export default metadata;
