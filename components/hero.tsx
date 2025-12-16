"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = 80
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/equipo-trabajando-en-oficina-moderna-con-paneles-s.jpg"
          alt="Equipo trabajando con tecnología sustentable"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary-foreground leading-tight mb-6 text-balance"
          >
            Conectamos organizaciones con <span className="text-primary">tecnología</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-secondary-foreground/80 mb-8 text-pretty"
          >
            Entregamos valor diferencial para ofrecer a tu organización soluciones tecnológicas integrales y a medida.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("servicios")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base"
            >
              Ver servicios
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("nosotros")}
              className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 rounded-full px-8 py-6 text-base bg-transparent group"
            >
              Descubrir más
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
