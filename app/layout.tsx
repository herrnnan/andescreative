import type React from "react"
import "@/app/globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "@/components/navigation"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "Andes Creative - Desarrollo Web y Aplicaciones",
  description: "Soluciones tecnológicas innovadoras inspiradas en la grandeza de los Andes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={plusJakartaSans.className}>
      <body className="font-sans">
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'