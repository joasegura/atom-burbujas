import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  // El layout raíz ya agrega " | Atom Soluciones IT" vía template.
  title: "Términos y Privacidad",
  description:
    "Políticas de privacidad y términos de uso de las aplicaciones y servicios desarrollados por Atom Soluciones IT.",
  alternates: { canonical: "https://atomsolucionesit.com.ar/privacidad" },
  openGraph: {
    title: "Términos y Privacidad | Atom Soluciones IT",
    description: "Políticas de privacidad y términos de uso de las aplicaciones de Atom Soluciones IT.",
    url: "https://atomsolucionesit.com.ar/privacidad",
    locale: "es_AR",
    type: "website",
  },
}

// Una entrada por producto con política propia. Sumar una app es agregar un objeto acá
// y su página en app/privacidad/<slug>/page.tsx.
const politicas = [
  {
    nombre: "Corralón App",
    href: "/privacidad/corralon",
    resumen:
      "Gestión operativa de tareas y servicios para cuadrillas, choferes y personal de servicios públicos. Usa identificación por DNI, ubicación en primer y segundo plano, y cámara.",
    actualizada: "23 de septiembre de 2026",
  },
]

export default function PrivacidadIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
        Términos y <span className="text-primary">Privacidad</span>
      </h1>
      <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-secondary-foreground/60 text-pretty">
        Cada aplicación que desarrollamos pide permisos distintos y trata datos distintos, así que cada una tiene su
        propia política. Elegí la que corresponde al producto que estás usando.
      </p>

      <ul className="mt-12 border-t border-border/15">
        {politicas.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="group block border-b border-border/15 py-7 transition-colors hover:bg-background/5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-lg font-medium leading-snug">{p.nombre}</p>
                <span
                  aria-hidden
                  className="text-secondary-foreground/30 transition-colors group-hover:text-primary"
                >
                  &rarr;
                </span>
              </div>
              <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-secondary-foreground/60 text-pretty">
                {p.resumen}
              </p>
              <p className="mt-3 text-[13px] text-secondary-foreground/40">Actualizada: {p.actualizada}</p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-[15px] leading-relaxed text-secondary-foreground/60 text-pretty">
        Para consultas sobre el tratamiento de tus datos, escribinos a{" "}
        <a
          href="mailto:contacto@atomsolucionesit.com.ar"
          className="text-primary underline-offset-4 hover:underline"
        >
          contacto@atomsolucionesit.com.ar
        </a>
        .
      </p>
    </div>
  )
}
