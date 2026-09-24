import type React from "react"
import Link from "next/link"

// Chrome común a todas las políticas: el índice y cada política por producto comparten
// la misma cáscara para que se lean como un mismo cuerpo de documentos.
export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary text-secondary-foreground antialiased">
      <header className="border-b border-border/15">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="inline-flex items-baseline gap-1">
            <span className="text-xl font-semibold tracking-tight text-secondary-foreground">atom</span>
            <span className="text-xl font-semibold text-primary">.</span>
          </Link>
          <Link
            href="/"
            className="text-[15px] text-secondary-foreground/60 underline-offset-8 transition-colors hover:text-secondary-foreground hover:underline"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/15">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-secondary-foreground/50">
            © 2025 Atom Soluciones IT. Todos los derechos reservados.
          </p>
          <Link
            href="/privacidad"
            className="text-sm text-secondary-foreground/60 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Todas las políticas
          </Link>
        </div>
      </footer>
    </div>
  )
}
