"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { ServiceModal } from "@/components/service-modal"
import { services, type Service } from "@/lib/services"

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  return (
    <section
      id="servicios"
      className="scroll-mt-20 py-24 sm:py-32"
      style={{ backgroundColor: "#e8e4e0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-4"
          >
            <div className="hidden sm:block">
              <svg width="40" height="40" viewBox="0 0 40 40" className="text-primary">
                <path
                  d="M20 0L20 40M0 20L40 20M5.86 5.86L34.14 34.14M34.14 5.86L5.86 34.14"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                Nuestros <span className="font-black">servicios y soluciones IT</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Co-diseñamos estrategias tecnológicas integrales, con soporte especializado y foco en quienes más
                importan: <strong className="text-foreground">tu organización.</strong>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              className="scroll-mt-28"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                type="button"
                onClick={() => setSelectedService(service)}
                className="group block w-full h-full text-left bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
              >
                {/* Image with organic shape mask */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-1 w-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{service.shortDescription}</p>
                  <span className="inline-block mt-4 text-sm font-medium text-primary">Ver servicio</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  )
}
