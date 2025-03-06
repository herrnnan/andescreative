"use client"

import { motion } from "framer-motion"

interface CustomCursorProps {
  mousePosition: { x: number; y: number }
}

export function CustomCursor({ mousePosition }: CustomCursorProps) {
  return (
    <>
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-[#87CEEB] mix-blend-difference pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          damping: 30,
          mass: 0.5,
          stiffness: 400,
        }}
      />
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-[#A8D8EA] mix-blend-difference pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          damping: 20,
          mass: 0.5,
          stiffness: 300,
        }}
      />
    </>
  )
}

