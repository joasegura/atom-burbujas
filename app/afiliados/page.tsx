import type { Metadata } from "next"
import Link from "next/link"
import PostulacionForm from "./PostulacionForm"

export const metadata: Metadata = {
  title: "Programa de referidos | Atom Soluciones IT",
  description:
    "Referí empresas que necesitan un sistema y cobrá una comisión por cada venta cerrada. Nosotros desarrollamos, implementamos y sostenemos.",
  alternates: { canonical: "https://atomsolucionesit.com.ar/afiliados" },
  openGraph: {
    title: "Programa de referidos | Atom Soluciones IT",
    description:
      "Vos traés la oportunidad, nosotros ponemos el producto. Comisión por cada venta cerrada.",
    url: "https://atomsolucionesit.com.ar/afiliados",
    locale: "es_AR",
    type: "website",
  },
}

const productos = [
  {
    nombre: "Nexus",
    que: "Plataforma de gestión para PyMEs: stock, ventas, ingresos y egresos, logística, entregas y analítica del negocio en un solo lugar.",
    quien: "distribuidoras, mayoristas, retail y empresas con depósito y reparto.",
  },
  {
    nombre: "MoviTracker",
    que: "Seguimiento de cargas para transportistas. El dador de carga ve dónde está su mercadería sin llamar a nadie, y el conductor reporta desde WhatsApp.",
    quien: "transportistas de 5 a 50 camiones en ruta larga, y empresas con logística propia.",
  },
  {
    nombre: "Software a medida",
    que: "Cuando el proceso no entra en ningún producto de estantería: ERP, CRM, automatizaciones e integraciones entre sistemas que hoy no se hablan.",
    quien: "empresas y municipios con un proceso propio que hoy manejan con planillas.",
  },
  {
    nombre: "Web y e-commerce",
    que: "Sitios institucionales, portales y tiendas online. Suele ser la puerta de entrada a una cuenta que después compra sistema.",
    quien: "comercios, profesionales y organizaciones sin presencia digital seria.",
  },
]

const pasos = [
  {
    t: "Cargás el contacto",
    d: "Desde tu link personal, en dos minutos: empresa, contacto, teléfono y qué necesita. Si esa empresa ya está en nuestra cartera, el formulario te lo avisa ahí mismo, antes de que pierdas tiempo.",
  },
  {
    t: "Queda reservado a tu nombre",
    d: "Noventa días. Nadie más puede cargar esa empresa en ese plazo. Si el negocio no avanza, se libera.",
  },
  {
    t: "Lo contactamos",
    d: "Dentro de las 24 horas hábiles. Hacemos la demo, el relevamiento y la propuesta. Podés estar en la reunión o dejarnos avanzar solos, como prefieras.",
  },
  {
    t: "Cobrás cuando el cliente paga",
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
    t: "El porcentaje se acuerda al darte de alta",
    d: "Depende del producto y de tu rol. Te lo dejamos por escrito antes de que cargues el primer lead.",
  },
  {
    t: "Contra cobranza",
    d: "Se liquida cuando el dinero del cliente entra, no cuando se firma. Es la única forma de que el esquema se sostenga.",
  },
  {
    t: "Sin exclusividad",
    d: "Podés seguir con tu trabajo o tu cartera. Esto no te ata a nada.",
  },
]

export default function ReferidosPage() {
  return (
    <main className="bg-[#0B0B0B] text-[#F2F4F6] antialiased">
      {/* Hero */}
      <section className="border-b border-[#242424]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <p className="text-sm font-bold text-[#2D9CDB]">Programa de referidos</p>
          <h1 className="mt-5 max-w-[16ch] text-4xl font-extrabold leading-[1.04] tracking-tight md:text-6xl">
            Conocés empresas que necesitan un sistema.
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-[#8A8F96] md:text-xl">
            Nosotros lo desarrollamos y lo sostenemos. Vos cobrás una comisión por cada
            venta que se cierra, sin poner un peso ni escribir una línea de código.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#sumarme"
              className="rounded-lg bg-[#2D9CDB] px-7 py-4 font-extrabold text-[#0B0B0B]"
            >
              Quiero sumarme
            </a>
            <a
              href="#como"
              className="rounded-lg border border-[#242424] px-7 py-4 font-extrabold"
            >
              Cómo funciona
            </a>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="border-b border-[#242424]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Qué vas a estar ofreciendo
          </h2>
          <p className="mt-4 max-w-[56ch] text-[#8A8F96]">
            Cuatro líneas de producto. Vos traés la oportunidad; nosotros hacemos la demo,
            la propuesta técnica y el desarrollo.
          </p>
          <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-[#242424] bg-[#242424] md:grid-cols-2">
            {productos.map((p) => (
              <article key={p.nombre} className="bg-[#0B0B0B] p-7">
                <h3 className="text-xl font-extrabold tracking-tight">{p.nombre}</h3>
                <p className="mt-2 text-[15px] text-[#8A8F96]">{p.que}</p>
                <p className="mt-4 text-sm text-[#5C6168]">
                  <b className="font-bold text-[#F2F4F6]">Encaja en</b> {p.quien}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como" className="scroll-mt-20 border-b border-[#242424]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Cómo funciona
          </h2>
          <ol className="mt-10 ml-4">
            {pasos.map((p, i) => (
              <li
                key={p.t}
                className={`relative border-l pl-12 pb-8 last:pb-0 ${
                  i === pasos.length - 1 ? "border-transparent" : "border-[#242424]"
                }`}
              >
                <span className="absolute -left-[15px] -top-0.5 grid h-[30px] w-[30px] place-items-center rounded-full border border-[#242424] bg-[#0B0B0B] text-[13px] font-extrabold text-[#2D9CDB]">
                  {i + 1}
                </span>
                <b className="block text-[17px] font-extrabold">{p.t}</b>
                <p className="mt-1.5 max-w-[52ch] text-[15px] text-[#8A8F96]">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Para quién */}
      <section className="border-b border-[#242424]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Para quién es
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            <Lista titulo="Funciona bien si" items={si} color="bg-[#5C6168]" />
            <Lista titulo="No funciona si" items={no} color="bg-[#6b3838]" />
          </div>
        </div>
      </section>

      {/* Plata */}
      <section className="border-b border-[#242424]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Cómo se cobra
          </h2>
          <dl className="mt-8 grid gap-6 rounded-xl border border-[#242424] bg-[#141414] p-7 md:grid-cols-2 md:gap-x-10 md:gap-y-7">
            {plata.map((p) => (
              <div key={p.t}>
                <dt className="font-extrabold">{p.t}</dt>
                <dd className="mt-1.5 max-w-[54ch] text-[15px] text-[#8A8F96]">{p.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cierre */}
      <section id="sumarme" className="scroll-mt-20">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
          <h2 className="max-w-[18ch] text-3xl font-extrabold tracking-tight md:text-4xl">
            Si tenés los contactos, nosotros ponemos el producto.
          </h2>
          <p className="mt-4 max-w-[50ch] text-[#8A8F96]">
            Contanos en dos minutos con quién trabajás. Si encaja, te damos tu link
            personal para cargar leads.
          </p>
          <div className="mt-8 max-w-2xl">
            <PostulacionForm />
          </div>
          <p className="mt-8 text-sm text-[#5C6168]">
            <Link href="/" className="underline underline-offset-4">
              Volver al sitio
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

function Lista({
  titulo,
  items,
  color,
}: {
  titulo: string
  items: string[]
  color: string
}) {
  return (
    <div>
      <b className="block text-[17px] font-extrabold">{titulo}</b>
      <ul className="mt-3">
        {items.map((t) => (
          <li key={t} className="relative mb-2.5 pl-5 text-[15px] text-[#8A8F96]">
            <span className={`absolute left-0 top-[11px] h-px w-[7px] ${color}`} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
