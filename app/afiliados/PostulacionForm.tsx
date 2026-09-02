"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

const vacio = {
  nombre: "",
  telefono: "",
  email: "",
  contexto: "",
}

export default function PostulacionForm() {
  const [f, setF] = useState(vacio)
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<{ ok: boolean; motivo?: string } | null>(null)

  const set =
    (k: keyof typeof vacio) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value }))

  const completo =
    f.nombre.trim().length > 2 &&
    f.telefono.replace(/\D/g, "").length >= 8 &&
    f.contexto.trim().length > 5

  async function enviar() {
    if (!completo || enviando) return
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
    }
  }

  if (resultado?.ok) {
    return (
      <div className="rounded-lg border border-[#2D9CDB]/40 bg-[#2D9CDB]/10 px-4 py-3">
        Listo, recibimos tu postulación. Te contactamos en las próximas horas.
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {resultado && !resultado.ok && (
        <div className="rounded-lg border border-red-900/60 bg-red-950/30 px-4 py-3">
          {resultado.motivo === "duplicado" && "Ya recibimos una postulación con estos datos."}
          {resultado.motivo === "datos" && "Revisá tu nombre y tu teléfono."}
          {resultado.motivo === "red" && "No se pudo enviar. Probá de nuevo en un minuto."}
        </div>
      )}

      <label className="block">
        <span className="block font-semibold">Nombre</span>
        <input className={input} value={f.nombre} onChange={set("nombre")} placeholder="Nombre y apellido" />
      </label>

      <label className="block">
        <span className="block font-semibold">Teléfono</span>
        <input className={input} value={f.telefono} onChange={set("telefono")} inputMode="tel" placeholder="3772 123456" />
      </label>

      <label className="block">
        <span className="block font-semibold">Email</span>
        <span className="mb-2 block text-sm text-[#5C6168]">Opcional</span>
        <input className={input} value={f.email} onChange={set("email")} inputMode="email" placeholder="tu@email.com" />
      </label>

      <label className="block">
        <span className="block font-semibold">Con quién trabajás</span>
        <span className="mb-2 block text-sm text-[#5C6168]">
          A qué te dedicás y qué tipo de empresas conocés
        </span>
        <textarea className={`${input} min-h-28 resize-y`} value={f.contexto} onChange={set("contexto")} />
      </label>

      <button
        type="button"
        onClick={enviar}
        disabled={!completo || enviando}
        className="w-full rounded-lg bg-[#2D9CDB] px-5 py-4 font-extrabold text-[#0B0B0B] transition-opacity disabled:opacity-30"
      >
        {enviando ? "Enviando" : "Enviar postulación"}
      </button>
    </div>
  )
}

const input =
  "w-full rounded-lg border border-[#242424] bg-[#0B0B0B] px-4 py-3 text-[#F2F4F6] " +
  "placeholder:text-[#3f4348] focus:border-[#2D9CDB] focus:outline-none focus:ring-1 focus:ring-[#2D9CDB]"
