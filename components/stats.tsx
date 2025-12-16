"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "50+", label: "organizaciones nos eligen" },
  { value: "+5", label: "años potenciando empresas con nuestros servicios" },
  { value: "+95%", label: "de satisfacción con nuestros productos y servicios" },
]

export function Stats() {
  return (
    <section className="py-24 sm:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center lg:text-left"
            >
              <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-secondary-foreground/70 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-border/30 pt-12"
        >
          <h3 className="text-lg font-semibold text-secondary-foreground mb-6">Tecnologías que dominamos</h3>
          <div className="flex flex-wrap gap-4">
            {["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Tailwind CSS", "MongoDB"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-background/10 rounded-full text-sm text-secondary-foreground/80 border border-border/30"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
