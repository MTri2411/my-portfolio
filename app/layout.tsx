'use client';

import { useEffect } from 'react';
import { measurePaintTiming, measureResourceTiming, measureMemoryUsage } from '../utils/monitoring';
import type React from "react"
import { JetBrains_Mono } from "next/font/google"
import ThemeRegistry from "@/theme/ThemeRegistry"
import { AppProvider } from "@/context/AppContext"
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    // Theo dõi performance metrics khi component mount
    measurePaintTiming();
    measureResourceTiming();
    measureMemoryUsage();

    // Theo dõi resource loading mỗi 5 giây
    const interval = setInterval(() => {
      measureResourceTiming();
      measureMemoryUsage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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