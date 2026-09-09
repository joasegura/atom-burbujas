"use client"

import { useState } from "react"

import { supabase } from "@/lib/supabase"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

const HABILITADO = false

const vacio = {
  nombre: "",
  telefono: "",
  email: "",
  contexto: "",
}

type Campo = keyof typeof vacio

// Mientras el backend no esté listo no queremos que la persona llene todo el
// formulario y se choque con un cartel: la mandamos a WhatsApp con el mensaje armado.
const MENSAJE_WPP = "Hola! Vi el programa de referidos de Atom y me interesa sumarme como vendedor."

function errores(f: typeof vacio) {
  const e: Partial<Record<Campo, string>> = {}
  if (f.nombre.trim().length < 3) e.nombre = "Poné tu nombre y apellido"
  if (f.telefono.replace(/\D/g, "").length < 8) e.telefono = "Necesitamos un teléfono para contactarte"
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Revisá el email"
  if (f.contexto.trim().length < 6) e.contexto = "Contanos aunque sea en una línea a qué te dedicás"
  return e
}

export default function PostulacionForm() {
  const [f, setF] = useState(vacio)
  const [tocado, setTocado] = useState<Partial<Record<Campo, boolean>>>({})
  const [intento, setIntento] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<{ ok: boolean; motivo?: string } | null>(null)

  const errs = errores(f)
  const visible = (k: Campo) => (tocado[k] || intento ? errs[k] : undefined)

  const set = (k: Campo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value }))
    if (resultado && !resultado.ok) setResultado(null)
  }
  const blur = (k: Campo) => () => setTocado((p) => ({ ...p, [k]: true }))

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setIntento(true)
    if (Object.keys(errs).length > 0 || enviando) return

    if (!HABILITADO) {
      setResultado({ ok: false, motivo: "proximamente" })
      return
    }

    setEnviando(true)
    const { data, error } = await supabase.rpc("postular", {
      p_nombre: f.nombre,
      p_telefono: f.telefono,
      p_email: f.email || null,
      p_contexto: f.contexto,
    })
    setEnviando(false)
    setResultado(error ? { ok: false, motivo: "red" } : (data as { ok: boolean; motivo?: string }))
    if (data?.ok) {
      setF(vacio)
      setTocado({})
      setIntento(false)
    }
  }

  if (resultado?.ok) {
    return (
      <div className="border-t border-border/15 pt-8">
        <h3 className="text-lg font-medium">Recibimos tu postulación</h3>
        <p className="mt-3 max-w-[42ch] leading-relaxed text-secondary-foreground/60">
          Te contactamos en las próximas horas para contarte el esquema de comisiones y darte tu link
          personal.
        </p>
      </div>
    )
  }

  const noDisponible = resultado?.motivo === "proximamente"

  return (
    <form onSubmit={enviar} noValidate>
      {resultado && !resultado.ok && !noDisponible && (
        <p role="alert" className="mb-8 border-l-2 border-destructive pl-4 text-[15px]">
          {resultado.motivo === "duplicado" && "Ya recibimos una postulación con estos datos."}
          {resultado.motivo === "datos" && "Revisá tu nombre y tu teléfono."}
          {resultado.motivo === "red" && "No se pudo enviar. Probá de nuevo en un minuto."}
        </p>
      )}

      {noDisponible && (
        <div className="mb-8 border-l-2 border-primary pl-4">
          <p className="text-[15px] font-medium">Todavía estamos terminando de armar el alta online.</p>
          <p className="mt-1.5 max-w-[42ch] text-[15px] leading-relaxed text-secondary-foreground/60">
            Escribinos por WhatsApp y arrancamos igual: te respondemos hoy.
          </p>
          <a
            href={buildWhatsAppUrl(MENSAJE_WPP)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-[15px] text-primary underline-offset-8 hover:underline"
          >
            Escribirnos por WhatsApp
          </a>
        </div>
      )}

      <div className="space-y-7">
        <Campo
          id="nombre"
          label="Nombre y apellido"
          value={f.nombre}
          onChange={set("nombre")}
          onBlur={blur("nombre")}
          error={visible("nombre")}
          autoComplete="name"
        />

        <Campo
          id="telefono"
          label="Teléfono"
          value={f.telefono}
          onChange={set("telefono")}
          onBlur={blur("telefono")}
          error={visible("telefono")}
          inputMode="tel"
          autoComplete="tel"
        />

        <Campo
          id="email"
          label="Email"
          hint="Opcional"
          value={f.email}
          onChange={set("email")}
          onBlur={blur("email")}
          error={visible("email")}
          inputMode="email"
          autoComplete="email"
        />

        <Campo
          id="contexto"
          label="Con quién trabajás"
          hint="A qué te dedicás y qué tipo de empresas conocés"
          value={f.contexto}
          onChange={set("contexto")}
          onBlur={blur("contexto")}
          error={visible("contexto")}
          multilinea
        />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="mt-10 rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {enviando ? "Enviando" : "Enviar postulación"}
      </button>

      <p className="mt-5 text-sm text-secondary-foreground/40">
        Usamos tus datos sólo para contactarte por el programa de referidos.
      </p>
    </form>
  )
}

function Campo({
  id,
  label,
  hint,
  error,
  multilinea,
  ...props
}: {
  id: string
  label: string
  hint?: string
  error?: string
  multilinea?: boolean
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const base = cn(
    "w-full rounded-none border-0 border-b bg-transparent px-0 py-2.5 text-[15px]",
    "text-secondary-foreground focus:outline-none",
    error ? "border-destructive" : "border-border/25 focus:border-primary",
  )

  return (
    <div>
      <label htmlFor={id} className="block text-sm text-secondary-foreground/60">
        {label}
        {hint && <span className="ml-2 text-secondary-foreground/35">{hint}</span>}
      </label>

      {multilinea ? (
        <textarea id={id} className={cn(base, "mt-1 min-h-24 resize-y")} aria-invalid={!!error} {...props} />
      ) : (
        <input id={id} className={cn(base, "mt-1")} aria-invalid={!!error} {...props} />
      )}

      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  )
}
