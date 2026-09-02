import type { Metadata } from "next"
import { Suspense } from "react"
import CargarLeadForm from "./CargarLeadForm"

export const metadata: Metadata = {
  title: "Cargar un lead | Atom Soluciones IT",
  robots: { index: false, follow: false },
}

export default function CargarPage() {
  return (
    <Suspense fallback={null}>
      <CargarLeadForm />
    </Suspense>
  )
}
