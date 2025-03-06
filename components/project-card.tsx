"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  images?: string[]
  onClick: (images: string[], title: string) => void
}

export function ProjectCard({ title, description, image, tags, images = [], onClick }: ProjectCardProps) {
  const handleClick = () => {
    // Si no se pasan imágenes adicionales, se usa la imagen principal
    const projectImages = images.length > 0 ? images : [image];
    onClick(projectImages, title);
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-xl border border-[#A8D8EA]/30 shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#87CEEB]/5 to-[#A8D8EA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="aspect-video w-full overflow-hidden">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </div>
      <div className="relative p-6">
        <h3 className="text-lg font-semibold mb-2 text-[#001F3F]">{title}</h3>
        <p className="text-[#4A4E69] text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 bg-[#87CEEB]/10 text-[#001F3F] rounded-full text-xs font-medium group-hover:bg-[#87CEEB]/20 transition-colors duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
