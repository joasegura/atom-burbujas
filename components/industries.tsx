"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, Users, Landmark, Briefcase } from "lucide-react"

const industries = [
  {
    id: "particulares",
    name: "Particulares",
    icon: Users,
    image: "/happy-diverse-team-of-people-using-technology-smar.jpg",
    description:
      "Soluciones personalizadas para emprendedores, freelancers y profesionales independientes que buscan potenciar su presencia digital.",
    features: ["Sitios web personales", "Portafolios digitales", "Landing pages", "Tiendas online"],
  },
  {
    id: "privadas",
    name: "Empresas Privadas",
    icon: Briefcase,
    image: "/modern-office-team-working-on-technology-computers.jpg",
    description:
      "Acompañamos a empresas de todos los tamaños en su transformación digital, desde startups hasta corporaciones establecidas.",
    features: ["Sistemas de gestión", "Automatización", "Integración de procesos", "Desarrollo a medida"],
  },
  {
    id: "publicas",
    name: "Organizaciones Públicas",
    icon: Landmark,
    image: "/team-working-renewable-energy-office.jpg",
    description:
      "Trabajamos con instituciones gubernamentales y organizaciones públicas para modernizar sus servicios y mejorar la atención ciudadana.",
    features: ["Portales ciudadanos", "Trámites online", "Sistemas de gestión", "Transparencia"],
  },
  {
    id: "ong",
    name: "ONGs y Fundaciones",
    icon: Building2,
    image: "/modern-team-working-on-technology-computers-in-off.jpg",
    description:
      "Apoyamos a organizaciones sin fines de lucro con soluciones tecnológicas que potencien su impacto social.",
    features: ["Sitios institucionales", "Gestión de donantes", "Comunicación digital", "Reportes"],
  },
]

export function Industries() {
  const [active, setActive] = useState("particulares")
  const activeIndustry = industries.find((i) => i.id === active)

  return (
    <section id="industrias" className="py-24 sm:py-32 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Clientes de diversos sectores confían en Atom para su{" "}
            <span className="font-black">transformación digital.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActive(industry.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                active === industry.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card text-foreground hover:bg-card/80 border border-border"
              }`}
            >
              {industry.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeIndustry && (
            <motion.div
              key={activeIndustry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-3xl p-8 lg:p-12 border border-border"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <activeIndustry.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{activeIndustry.name}</h3>
                  <p className="text-lg text-muted-foreground mb-6">{activeIndustry.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {activeIndustry.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src={activeIndustry.image || "/placeholder.jpg"}
                      alt={activeIndustry.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
