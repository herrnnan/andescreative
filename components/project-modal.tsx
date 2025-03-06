// components/project-modal.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"

type Slide = 
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string }

interface Project {
  title: string
  description: string
  tags: string[]
  slides: Slide[]
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = project.slides.length

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const currentSlide = project.slides[currentIndex]

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      {/* Fondo del Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-3xl bg-white rounded-lg p-4"
      >
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          Cerrar ✕
        </button>

        {/* Título y descripción */}
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="mb-4">{project.description}</p>

        {/* Carrusel */}
        <div className="relative flex items-center justify-center mb-4">
          {currentSlide.type === "image" && (
            // Para imágenes con Next.js, podrías usar <Image> en lugar de <img>
            <img
              src={currentSlide.src}
              alt={currentSlide.alt || project.title}
              className="w-full max-h-[60vh] object-contain"
            />
          )}
          {currentSlide.type === "video" && (
            <div className="w-full aspect-video">
              <iframe
                src={currentSlide.src}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          {/* Flechas de navegación */}
          <button
            onClick={handlePrev}
            className="absolute left-0 px-3 py-1 bg-white/70 rounded-r-md text-gray-800 hover:bg-white"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 px-3 py-1 bg-white/70 rounded-l-md text-gray-800 hover:bg-white"
          >
            →
          </button>
        </div>
      </motion.div>
    </div>
  )
}
