import type React from "react"
import type { Metadata } from "next"
import { geistSans } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Commit-Boost",
  description: "A standardized sidecar for Ethereum validators - Adoption Dashboard",
  generator: "v0.dev",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistSans.className}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
