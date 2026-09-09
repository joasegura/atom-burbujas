import type { Metadata } from "next"
import Link from "next/link"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  clients,
  getLogoChipClassName,
  getLogoChipStyle,
  getLogoTextClassName,
  type Client,
} from "@/lib/clients"
import { cn } from "@/lib/utils"

import { AfiliadosMobileCta, AfiliadosNav } from "./AfiliadosNav"
import PostulacionForm from "./PostulacionForm"
import Reveal from "./Reveal"

export const metadata: Metadata = {
  title: "Programa de referidos | Atom Soluciones IT",
  description:
    "Referí empresas que necesitan un sistema y cobrá una comisión por cada venta cerrada. Nosotros desarrollamos, implementamos y sostenemos.",
  alternates: { canonical: "https://atomsolucionesit.com.ar/afiliados" },
  openGraph: {
    title: "Programa de referidos | Atom Soluciones IT",
    description: "Vos traés la oportunidad, nosotros ponemos el producto. Comisión por cada venta cerrada.",
    url: "https://atomsolucionesit.com.ar/afiliados",
    locale: "es_AR",
    type: "website",
  },
}

const condiciones = [
  { t: "Sin invertir un peso", d: "No comprás stock ni licencias" },
  { t: "Sin exclusividad", d: "Seguís con tu trabajo o tu cartera" },
  { t: "Reserva de 90 días", d: "Nadie te pisa el contacto" },
  { t: "Contra cobranza", d: "Cuando el cliente paga, cobrás" },
]

const productos = [
  {
    nombre: "Nexus",
    que: "Plataforma de gestión para PyMEs: stock, ventas, ingresos y egresos, logística, entregas y analítica del negocio en un solo lugar.",
    quien: "Distribuidoras, mayoristas, retail y empresas con depósito y reparto.",
    href: "https://nexussoftware.app",
    cta: "nexussoftware.app",
    externo: true,
  },
  {
    nombre: "MoviTracker",
    que: "Seguimiento de cargas para transportistas. El dador de carga ve dónde está su mercadería sin llamar a nadie, y el conductor reporta desde WhatsApp.",
    quien: "Transportistas de 5 a 50 camiones en ruta larga, y empresas con logística propia.",
    href: "https://movitracker.app",
    cta: "movitracker.app",
    externo: true,
  },
  {
    nombre: "Software a medida",
    que: "Cuando el proceso no entra en ningún producto de estantería: ERP, CRM, automatizaciones e integraciones entre sistemas que hoy no se hablan.",
    quien: "Empresas y municipios con un proceso propio que hoy manejan con planillas.",
    href: "/#servicios",
    cta: "Ver servicios",
    externo: false,
  },
  {
    nombre: "Web y e-commerce",
    que: "Sitios institucionales, portales y tiendas online. Suele ser la puerta de entrada a una cuenta que después compra sistema.",
    quien: "Comercios, profesionales y organizaciones sin presencia digital seria.",
    href: "/#clientes",
    cta: "Ver trabajos",
    externo: false,
  },
]

const pasos = [
  {
    t: "Cargás el contacto",
    meta: "Dos minutos",
    d: "Desde tu link personal: empresa, contacto, teléfono y qué necesita. Si esa empresa ya está en nuestra cartera, el formulario te lo avisa ahí mismo, antes de que pierdas tiempo.",
  },
  {
    t: "Queda reservado a tu nombre",
    meta: "Noventa días",
    d: "Nadie más puede cargar esa empresa en ese plazo. Si el negocio no avanza, se libera.",
  },
  {
    t: "Lo contactamos",
    meta: "24 horas hábiles",
    d: "Hacemos la demo, el relevamiento y la propuesta. Podés estar en la reunión o dejarnos avanzar solos, como prefieras.",
  },
  {
    t: "Cobrás cuando el cliente paga",
    meta: "Contra cobranza",
    d: "La comisión se liquida contra cobranza real, no contra firma del contrato. Si el cliente paga en dos partes, vos cobrás en dos partes.",
  },
]

const si = [
  "Ya tenés trato con dueños o gerentes de PyMEs",
  "Sos contador, consultor o vendés otro producto a empresas",
  "Trabajás en logística, transporte o distribución y conocés el rubro por dentro",
  "Podés detectar un problema operativo y contarlo, aunque no sepas nada de software",
]

const no = [
  "Buscás un sueldo fijo: acá se cobra por resultado",
  "Pensás cargar listados de empresas al voleo. Contactos sin conversación previa no se pagan",
  "Necesitás cobrar rápido: un sistema tarda semanas o meses en cerrarse",
  "Querés vender prometiendo funciones que no existen",
]

const plata = [
  {
    t: "Dos tarifas",
    d: "Una si traés el contacto y cerramos nosotros. Otra, más alta, si además llevás vos la venta hasta la firma.",
  },
  {
    t: "El porcentaje",
    d: "Se acuerda al darte de alta: depende del producto y de tu rol. Te lo dejamos por escrito antes de que cargues el primer lead.",
  },
  {
    t: "Se liquida contra cobranza",
    d: "Cuando el dinero del cliente entra, no cuando se firma. Es la única forma de que el esquema se sostenga.",
  },
  {
    t: "Sin exclusividad",
    d: "Podés seguir con tu trabajo o tu cartera. Esto no te ata a nada.",
  },
]

const faq = [
  {
    q: "¿Necesito saber de software para vender esto?",
    a: "No. Tu trabajo es detectar el problema y presentarnos. La demo, el relevamiento y la propuesta técnica las hacemos nosotros. Podés estar en la reunión o dejarnos avanzar solos.",
  },
  {
    q: "¿Tengo que dejar mi trabajo o firmar exclusividad?",
    a: "No. El programa no te ata a nada: podés seguir con tu empleo, tu cartera o tu propio negocio en paralelo.",
  },
  {
    q: "¿Qué pasa si la empresa que cargo ya es cliente de Atom?",
    a: "El formulario te lo avisa en el momento de cargarla, antes de que inviertas tiempo en esa oportunidad.",
  },
  {
    q: "¿Cómo sé que el lead va a quedar a mi nombre?",
    a: "Al cargarlo queda reservado noventa días. En ese plazo nadie más puede presentar esa empresa. Si el negocio no avanza, se libera.",
  },
  {
    q: "¿Cuánto tarda en cerrarse una venta?",
    a: "Semanas o meses, según el producto y el tamaño de la empresa. No es un esquema para hacer plata rápido: es una comisión grande sobre un ciclo largo.",
  },
  {
    q: "¿Cuándo cobro exactamente?",
    a: "Contra cobranza real del cliente, no contra la firma del contrato. Si el cliente paga en cuotas, la comisión se liquida en esas mismas cuotas.",
  },
]

export default function ReferidosPage() {
  return (
    <div className="bg-secondary text-secondary-foreground antialiased">
      <AfiliadosNav />

      <main>
        {/* Hero */}
        <section>
          <div className="mx-auto max-w-5xl px-6 py-24 md:py-36">
            <Reveal>
              <h1 className="max-w-[15ch] text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
                Conocés empresas que necesitan un <span className="text-primary">sistema</span>.
              </h1>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-8 max-w-[50ch] text-lg leading-relaxed text-secondary-foreground/60 text-pretty">
                Nosotros lo desarrollamos y lo sostenemos. Vos cobrás una comisión por cada venta que se
                cierra, sin poner un peso ni escribir una línea de código.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#sumarme"
                  className="rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Quiero sumarme
                </a>
                <a
                  href="#como"
                  className="text-[15px] text-secondary-foreground/60 underline-offset-8 transition-colors hover:text-secondary-foreground hover:underline"
                >
                  Cómo funciona
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Condiciones del programa, sin decoración: cuatro hechos y nada más. */}
        <div className="border-y border-border/15">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4">
              {condiciones.map((c) => (
                <div
                  key={c.t}
                  className="border-b border-border/15 py-6 last:border-b-0 sm:border-b-0 sm:border-l sm:border-border/15 sm:px-6 sm:first:border-l-0 sm:first:pl-0 lg:last:pr-0"
                >
                  <p className="text-[15px] font-medium">{c.t}</p>
                  <p className="mt-1 text-[15px] text-secondary-foreground/50">{c.d}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Clientes reales, para que quien refiere sepa que presenta algo que ya funciona. */}
        <div className="border-b border-border/15">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
              <p className="shrink-0 text-sm text-secondary-foreground/40">Ya trabajamos con</p>
              <div className="flex flex-wrap items-center gap-2.5">
                {clients.map((c) => (
                  <LogoChip key={c.id} client={c} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Seccion id="productos" titulo="Qué vas a estar ofreciendo">
          <p className="mb-10 max-w-[54ch] text-secondary-foreground/60">
            Vos traés la oportunidad; nosotros hacemos la demo, la propuesta técnica y el desarrollo.
          </p>
          <Filas>
            {productos.map((p, i) => (
              <Fila key={p.nombre} delay={i * 0.04} etiqueta={p.nombre}>
                <p className="leading-relaxed text-secondary-foreground/70">{p.que}</p>
                <p className="mt-3 text-[15px] text-secondary-foreground/45">{p.quien}</p>
                <a
                  href={p.href}
                  {...(p.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-4 inline-block text-[15px] text-primary underline-offset-8 hover:underline"
                >
                  {p.cta}
                </a>
              </Fila>
            ))}
          </Filas>
        </Seccion>

        <Seccion id="como" titulo="Cómo funciona">
          <Filas>
            {pasos.map((p, i) => (
              <Fila
                key={p.t}
                delay={i * 0.04}
                etiqueta={String(i + 1).padStart(2, "0")}
                etiquetaClassName="font-mono text-sm text-primary/70"
              >
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h3 className="text-lg font-medium">{p.t}</h3>
                  <span className="text-sm text-secondary-foreground/40">{p.meta}</span>
                </div>
                <p className="mt-2 leading-relaxed text-secondary-foreground/70">{p.d}</p>
              </Fila>
            ))}
          </Filas>
        </Seccion>

        <Seccion id="comision" titulo="Cómo se cobra">
          <Filas>
            {plata.map((p, i) => (
              <Fila key={p.t} delay={i * 0.04} etiqueta={p.t}>
                <p className="leading-relaxed text-secondary-foreground/70">{p.d}</p>
              </Fila>
            ))}
          </Filas>
        </Seccion>

        <Seccion id="para-quien" titulo="Para quién es">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <Lista titulo="Funciona bien si" items={si} />
            </Reveal>
            <Reveal delay={0.04}>
              <Lista titulo="No funciona si" items={no} atenuado />
            </Reveal>
          </div>
        </Seccion>

        <Seccion id="preguntas" titulo="Preguntas frecuentes">
          <Reveal>
            <Accordion type="single" collapsible className="border-t border-border/15">
              {faq.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-b border-border/15">
                  <AccordionTrigger className="py-5 text-left text-base font-medium transition-colors hover:no-underline hover:text-primary [&>svg]:text-secondary-foreground/35">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[64ch] pb-6 text-[15px] leading-relaxed text-secondary-foreground/60">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Seccion>

        {/* Postulación */}
        <section id="sumarme" className="scroll-mt-20 border-t border-border/15">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
            <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
              <Reveal>
                <div className="md:sticky md:top-28">
                  <h2 className="max-w-[17ch] text-3xl font-semibold leading-tight tracking-tight text-balance md:text-[2.5rem]">
                    Si tenés los contactos, nosotros ponemos el{" "}
                    <span className="text-primary">producto</span>.
                  </h2>
                  <p className="mt-6 max-w-[44ch] leading-relaxed text-secondary-foreground/60">
                    Contanos en dos minutos con quién trabajás. Si encaja, te damos tu link personal para
                    cargar leads y el esquema de comisiones por escrito.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <PostulacionForm />
              </Reveal>
            </div>
          </div>
        </section>

        <footer className="border-t border-border/15">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-secondary-foreground/40">
            <Link href="/" className="underline-offset-4 transition-colors hover:text-secondary-foreground">
              Volver al sitio de Atom
            </Link>
            <span>Atom Soluciones IT</span>
          </div>
        </footer>
      </main>

      <AfiliadosMobileCta />
    </div>
  )
}

function Seccion({
  id,
  titulo,
  children,
}: {
  id: string
  titulo: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-border/15">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="mb-10 text-2xl font-semibold tracking-tight md:text-3xl">{titulo}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

// Sistema base de la página: una etiqueta a la izquierda, el contenido a la derecha
// y una línea entre filas. Sin tarjetas ni bordes redondeados.
function Filas({ children }: { children: React.ReactNode }) {
  return <div className="border-t border-border/15">{children}</div>
}

function Fila({
  etiqueta,
  etiquetaClassName,
  delay,
  children,
}: {
  etiqueta: string
  etiquetaClassName?: string
  delay?: number
  children: React.ReactNode
}) {
  return (
    <Reveal delay={delay}>
      <div className="grid gap-y-3 border-b border-border/15 py-8 md:grid-cols-[minmax(0,200px)_minmax(0,1fr)] md:gap-x-12">
        <p className={cn("text-lg font-medium leading-snug", etiquetaClassName)}>{etiqueta}</p>
        <div className="max-w-[62ch]">{children}</div>
      </div>
    </Reveal>
  )
}

function Lista({ titulo, items, atenuado }: { titulo: string; items: string[]; atenuado?: boolean }) {
  return (
    <div>
      <h3 className="text-lg font-medium">{titulo}</h3>
      <ul className="mt-5 border-t border-border/15">
        {items.map((t) => (
          <li
            key={t}
            className={cn(
              "border-b border-border/15 py-3.5 text-[15px] leading-relaxed",
              atenuado ? "text-secondary-foreground/40" : "text-secondary-foreground/70",
            )}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

function LogoChip({ client }: { client: Client }) {
  return (
    <div
      className={cn(
        "flex h-12 w-24 items-center justify-center overflow-hidden rounded p-2 opacity-70 transition-opacity hover:opacity-100",
        getLogoChipClassName(client),
      )}
      style={getLogoChipStyle(client)}
      title={client.name}
    >
      {client.logoTreatment === "text-fallback" ? (
        <span className={cn("text-[10px] font-medium tracking-tight", getLogoTextClassName(client))}>
          {client.fallbackText}
        </span>
      ) : (
        // Sin logoZoom: el zoom calibrado para las tarjetas grandes desborda un chip chico.
        <img
          src={client.logoUrl || "/placeholder.svg"}
          alt={client.name}
          className="max-h-full max-w-full object-contain"
        />
      )}
    </div>
  )
}
