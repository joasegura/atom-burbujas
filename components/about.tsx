"use client"

import { motion } from "framer-motion"

export function About() {
  return (
    <section
      id="nosotros"
      className="py-24 sm:py-32"
      style={{ backgroundColor: "#e8e4e0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              IT Tech powered by <span className="font-black">Innovación + Talento Humano</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              En Atom acompañamos a organizaciones a transformar la forma en que operan: ofrecemos{" "}
              <strong className="text-foreground">soluciones tecnológicas personalizadas e innovadoras</strong>,
              utilizando las últimas tecnologías web{" "}
              <strong className="text-foreground">para mejorar la eficiencia en todos los puntos de contacto.</strong>
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nuestro enfoque nos permite comprender a fondo las necesidades y desafíos de cada cliente,{" "}
              <strong className="text-foreground">brindando asesoramiento estratégico</strong> y diseñando soluciones
              que simplifiquen el trabajo, generen{" "}
              <strong className="text-foreground">eficiencia y aseguren resultados.</strong>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Glow central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              </div>

              {/* Grid lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-muted-foreground/20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-px bg-muted-foreground/20" />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-8 right-8 bg-card shadow-lg rounded-xl p-3 border border-border"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-xs">+</span>
                  </div>
                  <span className="text-xs text-foreground font-medium">Innovación</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute bottom-16 left-4 bg-card shadow-lg rounded-xl p-3 border border-border"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">A</span>
                  </div>
                  <span className="text-xs text-foreground font-medium">Somos Atom</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-1/2 right-0 -translate-y-1/2 bg-secondary text-secondary-foreground shadow-lg rounded-xl px-4 py-2"
              >
                <span className="text-2xl font-bold">IT</span>
              </motion.div>

              <motion.div
                animate={{ y: [5, -15, 5] }}
                transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute bottom-8 right-16 bg-card shadow-lg rounded-full px-4 py-2 border border-border"
              >
                <span className="text-xs text-muted-foreground">#IT #Tecnología #Personas</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
