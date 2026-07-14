"use client"

import { X, Check, ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {
  clients,
  getLogoChipClassName,
  getLogoChipStyle,
  getLogoImageStyle,
  getLogoTextClassName,
  type Client,
} from "@/lib/clients"
import type { Service } from "@/lib/services"
import { openWhatsApp } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

interface ServiceModalProps {
  service: Service | null
  onClose: () => void
}

function RelatedClientChip({ client }: { client: Client }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-10 h-10 shrink-0 rounded-lg flex items-center justify-center p-1.5 overflow-hidden",
          getLogoChipClassName(client),
        )}
        style={getLogoChipStyle(client)}
      >
        {client.logoTreatment === "text-fallback" ? (
          <span className={cn("text-[8px] font-bold tracking-tight text-center leading-tight", getLogoTextClassName(client))}>
            {client.fallbackText}
          </span>
        ) : (
          <img
            src={client.logoUrl || "/placeholder.svg"}
            alt={client.name}
            className="max-w-full max-h-full object-contain"
            style={getLogoImageStyle(client.logoZoom ? Math.min(client.logoZoom, 1.4) : undefined)}
          />
        )}
      </div>
      <span className="text-xs text-secondary-foreground/70">{client.name}</span>
    </div>
  )
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const relatedClients =
    service?.relatedClientIds
      ?.map((id) => clients.find((client) => client.id === id))
      .filter((client): client is Client => !!client) ?? []

  const handleCta = () => {
    if (!service) return
    if (service.ctaAction === "contact") {
      onClose()
      // Espera a que Radix libere el scroll del body antes de scrollear.
      setTimeout(() => {
        document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })
      }, 350)
    } else {
      openWhatsApp(`Hola, me interesa el servicio de ${service.title}`)
    }
  }

  return (
    <Dialog open={!!service} onOpenChange={(open) => !open && onClose()}>
      {service && (
        <DialogContent
          showCloseButton={false}
          className="bg-secondary text-secondary-foreground border border-border/30 rounded-3xl p-6 sm:p-10 max-w-2xl sm:max-w-2xl max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors group"
          >
            <X className="h-5 w-5 text-secondary-foreground/70 group-hover:text-primary" />
          </button>

          <div className="mb-8 pr-12">
            <DialogTitle className="text-2xl font-bold text-secondary-foreground mb-2">{service.title}</DialogTitle>
            <p className="text-secondary-foreground/70 leading-relaxed">{service.tagline}</p>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wide text-primary mb-3">Ideal para</h4>
            <ul className="space-y-2">
              {service.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-secondary-foreground/80">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wide text-primary mb-3">Qué incluye</h4>
            <ul className="space-y-2">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-secondary-foreground/80">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wide text-primary mb-3">Cómo trabajamos</h4>
            <ol className="space-y-4">
              {service.process.map((phase, index) => (
                <li key={phase.step} className="flex items-start gap-4">
                  <span className="w-7 h-7 shrink-0 rounded-full bg-primary/15 text-primary text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-secondary-foreground">{phase.step}</p>
                    <p className="text-sm leading-relaxed text-secondary-foreground/70">{phase.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {relatedClients.length > 0 && (
            <div className="mb-8 pt-6 border-t border-border/30">
              <p className="text-sm text-secondary-foreground/60 mb-3">Ya lo hicimos para:</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {relatedClients.map((client) => (
                  <RelatedClientChip key={client.id} client={client} />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleCta}
            className="inline-flex w-fit items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
          >
            {service.ctaLabel ?? "Solicitar propuesta"}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </DialogContent>
      )}
    </Dialog>
  )
}
