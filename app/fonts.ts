import localFont from "next/font/local"

export const geistSans = localFont({
  src: [
    {
      path: "./fonts/GeistVF.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
})
