"use client"

import { useState } from "react"
import { X, ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {
  getLogoChipClassName,
  getLogoChipStyle,
  getLogoImageStyle,
  getLogoTextClassName,
  type Client,
} from "@/lib/clients"
import { cn } from "@/lib/utils"

interface ClientModalProps {
  client: Client | null
  onClose: () => void
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <div className="aspect-video rounded-xl overflow-hidden border border-border/30">
      <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setFailed(true)} />
    </div>
  )
}

export function ClientModal({ client, onClose }: ClientModalProps) {
  return (
    <Dialog open={!!client} onOpenChange={(open) => !open && onClose()}>
      {client && (
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

          <div className="flex items-center gap-4 mb-6 pr-12">
            <div
              className={cn(
                "w-20 h-20 shrink-0 rounded-xl flex items-center justify-center p-3 overflow-hidden",
                getLogoChipClassName(client),
              )}
              style={getLogoChipStyle(client)}
            >
              {client.logoTreatment === "text-fallback" ? (
                <span
                  className={cn("text-sm font-bold tracking-tight text-center leading-tight", getLogoTextClassName(client))}
                >
                  {client.fallbackText}
                </span>
              ) : (
                <img
                  src={client.logoUrl || "/placeholder.svg"}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                  style={getLogoImageStyle(client.logoZoom)}
                />
              )}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-secondary-foreground">{client.name}</DialogTitle>
              <span className="inline-block mt-2 px-4 py-1.5 bg-background/10 rounded-full text-xs text-secondary-foreground/80 border border-border/30">
                {client.industry}
              </span>
            </div>
          </div>

          {client.images && client.images.length > 0 && (
            <div className={`grid gap-3 mb-6 ${client.images.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
              {client.images.map((src, i) => (
                <ProjectImage key={src} src={src} alt={`${client.name} - captura ${i + 1}`} />
              ))}
            </div>
          )}

          <p className="text-secondary-foreground/80 text-sm leading-relaxed mb-6">{client.description}</p>

          {client.challenge && (
            <p className="text-secondary-foreground/70 text-sm leading-relaxed mb-6">{client.challenge}</p>
          )}

          {client.stack && client.stack.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {client.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-background/10 rounded-full text-sm text-secondary-foreground/80 border border-border/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {client.projectUrl && (
            <a
              href={client.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
            >
              Visitar sitio
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </DialogContent>
      )}
    </Dialog>
  )
}
