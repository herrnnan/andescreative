"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { CustomCursor } from "@/components/custom-cursor"
import { ParticleEffect } from "@/components/particle-effect"
import { ServiceCard } from "@/components/service-card"
import { ProjectCard } from "@/components/project-card"
import { ProjectCarousel } from "@/components/project-carousel"
import { Mountain, Code, Layout, Database, Globe, Smartphone } from "lucide-react"

const services = [
  {
    title: "Sitios Web",
    description:
      "Diseñamos sitios web modernos y responsivos que capturan la esencia de tu marca.",
    Icon: Globe,
  },
  {
    title: "Aplicaciones Web",
    description:
      "Desarrollamos aplicaciones web robustas y escalables para tu negocio.",
    Icon: Code,
  },
  {
    title: "Sistemas de Gestión",
    description:
      "Creamos sistemas personalizados para hoteles, restaurantes y control de stock.",
    Icon: Database,
  },
  {
    title: "Diseño UI/UX",
    description: "Interfaces intuitivas y experiencias de usuario excepcionales.",
    Icon: Layout,
  },
  {
    title: "Aplicaciones Móviles",
    description:
      "Apps nativas y multiplataforma con diseño moderno y funcional.",
    Icon: Smartphone,
  },
  {
    title: "Consultoría IT",
    description:
      "Asesoramiento experto para impulsar tu presencia digital.",
    Icon: Mountain,
  },
]

// Proyectos (2 WordPress + 1 de Registro para Comedor)
const projects = [
  {
    title: "Sitio Web para Barbería",
    description:
      "Desarrollo de un sitio WordPress para una barbería, con integración de citas y blog.",
    image: "/barberia/1.png?height=400&width=600",
    tags: ["WordPress", "PHP", "HTML/CSS"],
    images: [
      "/barberia/1.png",
      "/barberia/2.png",
      "/barberia/3.png",
      "/barberia/4.png",
      "/barberia/5.png",
    ],
  },
  {
    title: "Sitio Web para Casamiento",
    description:
      "Sitio web WordPress para bodas, con diseño elegante y galería interactiva.",
    image: "/casamiento/1.png?height=400&width=600",
    tags: ["WordPress", "PHP", "HTML/CSS"],
    images: [
      "/casamiento/1.png",
      "/casamiento/2.png",
      "/casamiento/3.png",
      "/casamiento/4.png",
      "/casamiento/5.png",
      "/casamiento/6.png",
      "/casamiento/7.png",
      "/casamiento/8.png",
      "/casamiento/9.png",
    ],
  },
  {
    title: "Sistema de Registro para Comedor",
    description:
      "Aplicación de contador y registro para la gestión de accesos en un comedor, con panel administrativo.",
    image: "/registro-comedor/1.png?height=400&width=600",
    tags: ["React", "Node.js", "MongoDB"],
    images: [
      "/registro-comedor/1.png",
      "/registro-comedor/2.png",
      "/registro-comedor/3.png",
      "/registro-comedor/4.png",
      "/registro-comedor/5.png",
    ],
  },
]

export default function Home() {
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [currentProjectTitle, setCurrentProjectTitle] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Función estable para cerrar el carrusel
  const handleCloseCarousel = useCallback(() => {
    setCarouselOpen(false)
  }, [])

  // Abre el carrusel al hacer clic en un proyecto
  const handleProjectClick = (images: string[], title: string) => {
    setCurrentImages(images)
    setCurrentProjectTitle(title)
    setCarouselOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-[#4A4E69]">
      <CustomCursor mousePosition={mousePosition} />

      {/* Progress Bar (opcional) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#A8D8EA] z-50"
        style={{ scaleX: 1 }}
      />

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <ParticleEffect />
        <div className="absolute inset-0">
          <Image
            src="/mountain2.jpg"
            alt="Cordillera de los Andes"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001F3F]/70 to-[#4A4E69]/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 mx-auto px-6 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Andes Creative
            <span className="block text-3xl md:text-4xl mt-4 bg-gradient-to-r from-[#A8D8EA] to-[#87CEEB] bg-clip-text text-transparent">
              Elevando tu presencia digital
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Desarrollamos soluciones tecnológicas innovadoras inspiradas en la
            grandeza de los Andes
          </p>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#87CEEB] text-[#001F3F] px-8 py-3 rounded-lg font-medium hover:bg-[#A8D8EA] transition-all duration-300 shadow-lg hover:shadow-[#87CEEB]/50"
          >
            Comencemos
          </motion.a>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="relative py-20 px-6">
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl" />
        <div className="container relative z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#001F3F]">
              Nuestros Servicios
            </h2>
            <p className="text-[#4A4E69] max-w-2xl mx-auto">
              Soluciones tecnológicas que transforman tu negocio
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portafolio" className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#A8D8EA]/20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container relative z-10 mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#001F3F]">
              Nuestro Portafolio
            </h2>
            <p className="text-[#4A4E69] max-w-2xl mx-auto">
              Explora algunos de nuestros proyectos más destacados
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard {...project} onClick={handleProjectClick} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Project Carousel Modal */}
      <ProjectCarousel
        images={currentImages}
        isOpen={carouselOpen}
        onClose={handleCloseCarousel}
        projectTitle={currentProjectTitle}
      />

      {/* Contact Section */}
      <section id="contacto" className="relative py-20 px-6">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
        <div className="container relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#001F3F]">
              Conversemos
            </h2>
            <p className="text-[#4A4E69]">
              ¿Listo para llevar tu proyecto al siguiente nivel?
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#001F3F] mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-[#A8D8EA] focus:outline-none focus:ring-2 focus:ring-[#87CEEB]/50 focus:border-[#87CEEB] transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#001F3F] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-[#A8D8EA] focus:outline-none focus:ring-2 focus:ring-[#87CEEB]/50 focus:border-[#87CEEB] transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#001F3F] mb-2">
                  Mensaje
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-[#A8D8EA] focus:outline-none focus:ring-2 focus:ring-[#87CEEB]/50 focus:border-[#87CEEB] transition-colors bg-white/50 backdrop-blur-sm"
                  rows={4}
                  placeholder="Cuéntanos sobre tu proyecto"
                ></textarea>
              </div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  className="bg-[#87CEEB] text-[#001F3F] px-8 py-3 rounded-lg font-medium hover:bg-[#A8D8EA] transition-all duration-300 shadow-lg hover:shadow-[#87CEEB]/50"
                >
                  Enviar Mensaje
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
