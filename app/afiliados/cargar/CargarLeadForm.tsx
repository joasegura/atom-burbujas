"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const PRODUCTOS = [
  { id: "desarrollo", label: "Desarrollo a medida", desc: "Software propio, integraciones, automatización" },
  { id: "nexus", label: "Nexus", desc: "Gestión para PyMEs: stock, ventas, logística" },
  { id: "movi", label: "MoviTracker", desc: "Seguimiento de cargas para transportistas" },
  { id: "otro", label: "Otro", desc: "Web, e-commerce, o algo que no entra arriba" },
];

const HABILITADO = false;

type Chequeo = { estado: string; desde?: string; vence?: string } | null;

const vacio = {
  empresa: "", cuit: "", contacto: "", telefono: "",
  email: "", producto: "", rol: "referido", notas: "",
};

export default function CargarLeadForm() {
  const codigo = useSearchParams().get("v")?.trim().toLowerCase() ?? "";

  const [f, setF] = useState(vacio);
  const [chequeo, setChequeo] = useState<Chequeo>(null);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{ ok: boolean; motivo?: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const set = (k: keyof typeof vacio) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value }));

  // Chequeo de cartera mientras escribe: evita que dos vendedores carguen
  // la misma empresa y se peleen después por la comisión.
  useEffect(() => {
    clearTimeout(timer.current);
    if (!HABILITADO || f.empresa.trim().length < 3) {
      setChequeo(null);
      return;
    }
    timer.current = setTimeout(async () => {
      const { data } = await supabase.rpc("chequear_empresa", {
        p_empresa: f.empresa,
        p_telefono: f.telefono || null,
        p_cuit: f.cuit || null,
      });
      setChequeo((data as Chequeo) ?? null);
    }, 550);
    return () => clearTimeout(timer.current);
  }, [f.empresa, f.telefono, f.cuit]);

  const tomado = chequeo?.estado === "tomado";
  const completo =
    f.empresa.trim().length > 2 &&
    f.contacto.trim().length > 2 &&
    f.telefono.replace(/\D/g, "").length >= 8 &&
    f.producto !== "";

  async function enviar() {
    if (!completo || enviando) return;
    if (!HABILITADO) {
      setResultado({ ok: false, motivo: "proximamente" });
      return;
    }
    setEnviando(true);
    const { data, error } = await supabase.rpc("cargar_lead", {
      p_codigo: codigo,
      p_empresa: f.empresa,
      p_contacto: f.contacto,
      p_telefono: f.telefono,
      p_producto: f.producto,
      p_rol: f.rol,
      p_cuit: f.cuit || null,
      p_email: f.email || null,
      p_notas: f.notas || null,
    });
    setEnviando(false);
    setResultado(error ? { ok: false, motivo: "red" } : (data as { ok: boolean; motivo?: string }));
    if (data?.ok) {
      setF(vacio);
      setChequeo(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (!codigo) {
    return (
      <Marco>
        <h1 className="text-2xl font-extrabold tracking-tight">Falta tu link</h1>
        <p className="mt-3 text-[#8A8F96]">
          Los leads se cargan desde el link personal que te pasamos, así la comisión
          queda a tu nombre. Escribinos y te lo reenviamos.
        </p>
      </Marco>
    );
  }

  return (
    <Marco>
      <header className="mb-8">
        <p className="text-sm text-[#5C6168]">Atom Soluciones IT</p>
        <h1 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight">
          Cargar un lead
        </h1>
        <p className="mt-3 text-[#8A8F96]">
          Queda reservado a tu nombre por 90 días desde que lo cargás.
        </p>
      </header>

      {resultado?.ok && (
        <Aviso tono="ok">
          Lead cargado. Ya te lo reservamos y el equipo lo contacta en las próximas horas.
        </Aviso>
      )}
      {resultado && !resultado.ok && (
        <Aviso tono="error">
          {resultado.motivo === "duplicado" && "Esta empresa ya está en cartera. No se puede cargar de nuevo."}
          {resultado.motivo === "vendedor" && "Tu link no está activo. Escribinos para reactivarlo."}
          {resultado.motivo === "datos" && "Revisá el nombre de la empresa y el teléfono."}
          {resultado.motivo === "red" && "No se pudo guardar. Probá de nuevo en un minuto."}
          {resultado.motivo === "proximamente" && "Todavía no está activo. Muy pronto vas a poder cargar leads acá."}
        </Aviso>
      )}

      <div className="space-y-6">
        <Campo label="Empresa" hint="Como figura en la factura, si lo sabés">
          <input className={input} value={f.empresa} onChange={set("empresa")} placeholder="Transportes del Litoral" />
          {tomado && (
            <p className="mt-2 text-sm text-[#E0A458]">
              Ya está en cartera desde el {chequeo?.desde}. Si no avanza, se libera el {chequeo?.vence}.
            </p>
          )}
          {chequeo?.estado === "libre" && (
            <p className="mt-2 text-sm text-[#2D9CDB]">Libre. La podés cargar.</p>
          )}
        </Campo>

        <Campo label="CUIT" hint="Opcional, pero es lo que mejor evita duplicados">
          <input className={input} value={f.cuit} onChange={set("cuit")} inputMode="numeric" placeholder="30-71234567-4" />
        </Campo>

        <Campo label="Contacto">
          <input className={input} value={f.contacto} onChange={set("contacto")} placeholder="Nombre y cargo" />
        </Campo>

        <Campo label="Teléfono">
          <input className={input} value={f.telefono} onChange={set("telefono")} inputMode="tel" placeholder="3772 123456" />
        </Campo>

        <Campo label="Email" hint="Opcional">
          <input className={input} value={f.email} onChange={set("email")} inputMode="email" placeholder="contacto@empresa.com.ar" />
        </Campo>

        <Campo label="Qué necesita">
          <div className="grid gap-2">
            {PRODUCTOS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setF((s) => ({ ...s, producto: p.id }))}
                className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                  f.producto === p.id
                    ? "border-[#2D9CDB] bg-[#2D9CDB]/10"
                    : "border-[#242424] hover:border-[#3a3a3a]"
                }`}
              >
                <span className="block font-semibold">{p.label}</span>
                <span className="mt-0.5 block text-sm text-[#5C6168]">{p.desc}</span>
              </button>
            ))}
          </div>
        </Campo>

        <Campo label="Tu rol" hint="Define la comisión: traerlo no paga lo mismo que cerrarlo">
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "referido", label: "Lo traigo" },
              { id: "cierre", label: "Lo cierro yo" },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setF((s) => ({ ...s, rol: r.id }))}
                className={`rounded-lg border px-4 py-3 font-semibold transition-colors ${
                  f.rol === r.id
                    ? "border-[#2D9CDB] bg-[#2D9CDB]/10"
                    : "border-[#242424] hover:border-[#3a3a3a]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </Campo>

        <Campo label="Contexto" hint="Opcional. Qué le duele, con quién hablaste, cuándo vuelve">
          <textarea className={`${input} min-h-28 resize-y`} value={f.notas} onChange={set("notas")} />
        </Campo>

        <button
          type="button"
          onClick={enviar}
          disabled={!completo || enviando || tomado}
          className="w-full rounded-lg bg-[#2D9CDB] px-5 py-4 font-extrabold text-[#0B0B0B] transition-opacity disabled:opacity-30"
        >
          {enviando ? "Guardando" : "Cargar lead"}
        </button>
      </div>
    </Marco>
  );
}

const input =
  "w-full rounded-lg border border-[#242424] bg-[#0B0B0B] px-4 py-3 text-[#F2F4F6] " +
  "placeholder:text-[#3f4348] focus:border-[#2D9CDB] focus:outline-none focus:ring-1 focus:ring-[#2D9CDB]";

function Marco({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-[#F2F4F6] antialiased">
      <div className="mx-auto max-w-lg px-5 py-12">{children}</div>
    </main>
  );
}

function Campo({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-semibold">{label}</span>
      {hint && <span className="mb-2 block text-sm text-[#5C6168]">{hint}</span>}
      <div className={hint ? "" : "mt-2"}>{children}</div>
    </label>
  );
}

function Aviso({ tono, children }: { tono: "ok" | "error"; children: React.ReactNode }) {
  const c = tono === "ok"
    ? "border-[#2D9CDB]/40 bg-[#2D9CDB]/10"
    : "border-red-900/60 bg-red-950/30";
  return <div className={`mb-8 rounded-lg border ${c} px-4 py-3`}>{children}</div>;
}
