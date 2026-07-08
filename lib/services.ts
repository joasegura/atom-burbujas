export interface Service {
  id: string
  title: string
  tagline: string
  shortDescription: string
  image: string
  idealFor: string[]
  includes: string[]
  process: { step: string; description: string }[]
  relatedClientIds?: string[]
  ctaLabel?: string
  ctaAction?: "contact" | "whatsapp"
}

export const services: Service[] = [
  {
    id: "sitios-y-portales",
    title: "Sitios web y portales corporativos",
    tagline: "Tu presencia digital, pensada para vender y escalar — no solo para estar en internet.",
    shortDescription:
      "Diseñamos y desarrollamos sitios web modernos, responsivos y optimizados. Desde landing pages hasta portales corporativos complejos.",
    image: "/modern-website-design-computer-screen-showing-resp.jpg",
    idealFor: [
      "Negocios que necesitan un sitio profesional que transmita seriedad y convierta visitas en clientes.",
      "Empresas con un sitio viejo, lento o difícil de actualizar.",
      "Emprendimientos que están arrancando y quieren empezar con una base sólida.",
    ],
    includes: [
      "Landing pages, sitios institucionales, e-commerce y portales a medida.",
      "Diseño responsive optimizado para mobile.",
      "Integración con WhatsApp, formularios, redes sociales y pasarelas de pago.",
      "Optimización SEO técnica desde el día uno.",
      "Panel de administración para actualizar contenido sin depender de nosotros.",
    ],
    process: [
      { step: "Descubrimiento", description: "Entendemos tu negocio y tus objetivos comerciales." },
      { step: "Diseño", description: "Diseñamos mockups y los validamos con vos antes de programar." },
      { step: "Desarrollo", description: "Construimos con tecnologías modernas (Next.js, React, Tailwind)." },
      {
        step: "Lanzamiento y mejora continua",
        description: "Publicamos, medimos y ajustamos según los resultados reales.",
      },
    ],
    relatedClientIds: ["palmaymarroquin", "trascendencia", "freq"],
    ctaLabel: "Solicitar propuesta",
    ctaAction: "whatsapp",
  },
  {
    id: "sistemas-a-medida",
    title: "Software a medida para tu operación",
    tagline: "Tu operación no debería adaptarse a un software genérico. El software debería adaptarse a vos.",
    shortDescription:
      "Creamos software personalizado que se adapta a los procesos únicos de tu organización. Automatización, gestión y eficiencia operativa.",
    image: "/custom-software-development-dashboard-interface-mo.jpg",
    idealFor: [
      "Empresas que usan Excel + WhatsApp + intuición para gestionar procesos críticos.",
      "Negocios que pagan varias herramientas SaaS que no terminan de encajar entre sí.",
      "Organizaciones que necesitan automatizar tareas repetitivas para escalar sin sumar más gente.",
    ],
    includes: [
      "Sistemas de gestión (CRM, ERP, logística, inventarios, reservas) hechos para tu flujo real.",
      "Automatizaciones que reemplazan trabajo manual repetitivo.",
      "Paneles con métricas en tiempo real para tomar decisiones con datos.",
      "Integraciones con las herramientas que ya usás (Google, WhatsApp, sistemas contables, etc.).",
      "Aplicaciones móviles cuando el negocio lo requiere.",
    ],
    process: [
      { step: "Análisis", description: "Estudiamos tus procesos actuales y detectamos cuellos de botella." },
      {
        step: "Diseño colaborativo",
        description: "Diseñamos el sistema con vos, no para vos — validamos cada módulo antes de programarlo.",
      },
      {
        step: "Desarrollo por fases",
        description: "Entregamos valor desde las primeras semanas, no al final del proyecto.",
      },
      { step: "Capacitación y soporte", description: "Formamos al equipo y damos soporte continuo." },
    ],
    relatedClientIds: ["goticket", "dibuy", "municipio-pdl"],
    ctaLabel: "Solicitar propuesta",
    ctaAction: "whatsapp",
  },
  {
    id: "consultoria-y-acompanamiento",
    title: "Consultoría y transformación digital",
    tagline: "Antes de programar, hay que pensar. Te ayudamos a decidir qué tecnología conviene, y cuál no.",
    shortDescription:
      "Te guiamos en la transformación digital de tu negocio. Análisis, estrategia e implementación de soluciones tecnológicas.",
    image: "/business-consulting-meeting-technology-strategy-te.jpg",
    idealFor: [
      "Empresas que saben que necesitan digitalizarse pero no saben por dónde empezar.",
      "Organizaciones que ya invirtieron en tecnología sin los resultados esperados.",
      "Líderes que necesitan una segunda opinión técnica antes de tomar decisiones grandes.",
    ],
    includes: [
      "Diagnóstico de procesos y del stack tecnológico actual.",
      "Estrategia y roadmap de transformación digital, con prioridades y presupuestos claros.",
      "Selección de herramientas y proveedores: te decimos qué comprar, qué desarrollar y qué evitar.",
      "Acompañamiento durante la implementación, con revisiones periódicas.",
      "Capacitación a equipos internos.",
    ],
    process: [
      { step: "Sesión inicial", description: "Entendemos tu contexto y objetivos." },
      { step: "Diagnóstico documentado", description: "Hallazgos concretos y oportunidades priorizadas." },
      { step: "Plan de acción", description: "Priorizado por impacto vs. esfuerzo." },
      { step: "Acompañamiento", description: "Revisiones mensuales durante la implementación." },
    ],
    relatedClientIds: ["municipio-pdl"],
    ctaLabel: "Conversemos",
    ctaAction: "whatsapp",
  },
]
