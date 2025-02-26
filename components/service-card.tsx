"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  Icon: LucideIcon
}

export function ServiceCard({ title, description, Icon }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-white/50 backdrop-blur-xl rounded-xl p-6 border border-[#A8D8EA]/30 shadow-lg transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#87CEEB]/5 to-[#A8D8EA]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex flex-col items-center text-center">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="p-3 bg-[#87CEEB]/10 rounded-lg mb-4 group-hover:bg-[#87CEEB]/20 transition-colors duration-300"
        >
          <Icon className="h-6 w-6 text-[#001F3F]" />
        </motion.div>
        <h3 className="text-lg font-semibold mb-2 text-[#001F3F]">{title}</h3>
        <p className="text-[#4A4E69] text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

