"use client"

import { useState, useEffect } from "react"
import { Mountain } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-andes-primary" />
            <span className="text-xl font-semibold text-andes-gray-dark">Andes Creative</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#inicio" className="nav-link">
              Inicio
            </Link>
            <Link href="#servicios" className="nav-link">
              Servicios
            </Link>
            <Link href="#portafolio" className="nav-link">
              Portafolio
            </Link>
            <Link href="#contacto" className="nav-link">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

