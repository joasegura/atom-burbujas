"use client"

import { motion } from "framer-motion"

export function Marquee() {
  const text = "TECH IT ATOM SOLUCIONES DESARROLLO WEB SISTEMAS CONSULTORÍA "

  return (
    <section className="py-8 overflow-hidden border-y border-border bg-card">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold text-primary/60 tracking-tight mx-4"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
