export interface Client {
  id: string
  name: string
  logoUrl: string
  industry: string
  description: string
  projectUrl?: string
  images?: string[]
  challenge?: string
  stack?: string[]
  logoTreatment?: "default" | "dark-chip" | "text-fallback"
  fallbackText?: string
  chipColor?: string
  logoZoom?: number
}

type ChipFields = Pick<Client, "logoTreatment" | "chipColor">

export function getLogoChipClassName({ logoTreatment, chipColor }: ChipFields) {
  if (chipColor) return "border border-border/30"
  return logoTreatment === "dark-chip" ? "bg-secondary border border-border/30" : "bg-white"
}

export function getLogoChipStyle({ chipColor }: ChipFields) {
  return chipColor ? { backgroundColor: chipColor } : undefined
}

export function getLogoTextClassName({ logoTreatment, chipColor }: ChipFields) {
  const isDarkChip = logoTreatment === "dark-chip" || !!chipColor
  return isDarkChip ? "text-secondary-foreground" : "text-foreground"
}

export function getLogoImageStyle(logoZoom?: number) {
  return logoZoom ? { transform: `scale(${logoZoom})` } : undefined
}

// Convención de capturas: guardar en /public/clientes/ como <slug>-1.png, <slug>-2.png, etc.
// La primera imagen del array es la portada de la tarjeta.
// Si el archivo todavía no existe, la tarjeta cae automáticamente al logo (no se rompe nada).
// projectUrl: completar con la URL real de cada sitio; si falta, el botón "Ver página web" no se muestra.
export const clients: Client[] = [
  {
    id: "goticket",
    name: "GoTicket",
    logoUrl: "/clientes/goticket.webp",
    industry: "Venta de entradas",
    description: "Plataforma de ticketing para la venta online de entradas a eventos.",
    images: ["/clientes/goticket-1.png"],
    projectUrl: "https://www.goticket.ar/",
    chipColor: "#1E1E1E",
    logoZoom: 2.3,
  },
  {
    id: "dibuy",
    name: "Dibuy",
    logoUrl: "/clientes/dibuy.webp",
    industry: "Retail y mayorista",
    description: "E-commerce de tecnología y electrónica con venta minorista y mayorista.",
    images: ["/clientes/dibuy-1.png"],
    projectUrl: "https://dibuy.atomsolucionesit.com.ar/",
    logoZoom: 2.3,
  },
  {
    id: "municipio-pdl",
    name: "Municipio de Paso de los Libres",
    logoUrl: "/clientes/municipioPDLL.webp",
    industry: "Sector público",
    description: "Portal institucional con información de servicios y sistema de gestión de reclamos para la atención ciudadana.",
    images: ["/clientes/municipio-1.png"],
    projectUrl: "https://pasodeloslibres.gob.ar/",
  },
  {
    id: "freq",
    name: "Freq",
    logoUrl: "/clientes/freq.webp",
    industry: "Grabado láser / regalería",
    description: "Tienda online de grabados láser personalizados en termos, mates y accesorios, con pedidos a medida.",
    images: ["/clientes/freq-1.png"],
    projectUrl: "https://freq.ar/",
    chipColor: "#000000",
    logoZoom: 2.3,
  },
  {
    id: "palmaymarroquin",
    name: "Palma & Marroquín",
    logoUrl: "/clientes/palmaymarroquin.webp",
    industry: "Inmobiliaria rural",
    description: "Sitio institucional profesional para una inmobiliaria rural.",
    images: ["/clientes/palmaymarroquin-1.png"],
    projectUrl: "https://palmaymarroquin.com/",
    chipColor: "#003300",
  },
  {
    id: "trascendencia",
    name: "Trascendencia",
    logoUrl: "/clientes/trascendencia.jpeg",
    industry: "Indumentaria",
    description: "E-commerce de indumentaria con una experiencia de compra simple y cuidada.",
    images: ["/clientes/trascendencia-1.png"],
    projectUrl: "https://www.trascendencia.com.ar/",
    chipColor: "#F7F7F7",
  },
  {
    id: "vinoteca-entre-amigos",
    name: "Vinoteca Entre Amigos",
    logoUrl: "/clientes/vinotecaentreamigos.webp",
    industry: "Invitaciones digitales",
    description: "Invitación web personalizada, diseñada a medida de la celebración.",
    images: ["/clientes/vinotecaentreamigos-1.png"],
    projectUrl: "https://invitacion-entre-amigos.vercel.app/",
    chipColor: "#241117",
    logoZoom: 1.5,
  },
]
