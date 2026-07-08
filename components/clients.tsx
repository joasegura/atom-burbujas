"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import AutoScroll from "embla-carousel-auto-scroll"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import {
  clients,
  getLogoChipClassName,
  getLogoChipStyle,
  getLogoImageStyle,
  getLogoTextClassName,
  type Client,
} from "@/lib/clients"
import { cn } from "@/lib/utils"

function ClientLogo({
  client,
  textClassName,
  maxZoom,
}: {
  client: Client
  textClassName?: string
  // El chip chico no aguanta el zoom calibrado para el área grande: se recorta el logo.
  maxZoom?: number
}) {
  if (client.logoTreatment === "text-fallback") {
    return (
      <span className={cn("font-bold tracking-tight text-center", getLogoTextClassName(client), textClassName)}>
        {client.fallbackText}
      </span>
    )
  }
  const zoom = maxZoom && client.logoZoom ? Math.min(client.logoZoom, maxZoom) : client.logoZoom
  return (
    <img
      src={client.logoUrl || "/placeholder.svg"}
      alt={client.name}
      className="max-w-full max-h-full object-contain"
      style={getLogoImageStyle(zoom)}
    />
  )
}

function ClientCard({ client }: { client: Client }) {
  // El banner solo se muestra cuando la captura cargó con éxito; mientras tanto
  // (o si el archivo no existe) todas las tarjetas usan el mismo layout de logo.
  const [coverReady, setCoverReady] = useState(false)
  const cover = client.images?.[0]

  useEffect(() => {
    if (!cover) return
    const img = new Image()
    img.onload = () => setCoverReady(true)
    img.onerror = () => setCoverReady(false)
    img.src = cover
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [cover])

  const hasCover = !!cover && coverReady

  return (
    <div className="h-full flex flex-col bg-background/5 border border-border/30 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      {hasCover ? (
        <>
          <div className="h-40 sm:h-44 overflow-hidden">
            <img
              src={cover}
              alt={`Captura del sitio de ${client.name}`}
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          </div>
          <div
            className={cn(
              "relative z-10 -mt-7 ml-5 w-14 h-14 shrink-0 rounded-xl flex items-center justify-center p-2 overflow-hidden shadow-lg",
              getLogoChipClassName(client),
            )}
            style={getLogoChipStyle(client)}
          >
            <ClientLogo client={client} textClassName="text-[10px] leading-tight" maxZoom={1.4} />
          </div>
        </>
      ) : (
        <div
          className={cn(
            "h-40 sm:h-44 flex items-center justify-center p-6 overflow-hidden",
            getLogoChipClassName(client),
          )}
          style={getLogoChipStyle(client)}
        >
          <ClientLogo client={client} textClassName="text-xl" />
        </div>
      )}

      <div className={cn("flex flex-col flex-1 p-5", hasCover ? "pt-3" : "pt-5")}>
        <h3 className="text-xl font-bold text-secondary-foreground mb-2">{client.name}</h3>

        <span className="inline-block w-fit px-4 py-1.5 bg-background/10 rounded-full text-xs text-secondary-foreground/80 border border-border/30 mb-3">
          {client.industry}
        </span>

        <p className="text-sm leading-relaxed text-secondary-foreground/70 line-clamp-3 mb-4">{client.description}</p>

        <div className="flex-1" />

        {client.projectUrl && (
          <Button
            size="sm"
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-fit group"
          >
            <a href={client.projectUrl} target="_blank" rel="noopener noreferrer" draggable={false}>
              Ver página web
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

export function Clients() {
  return (
    <section id="clientes" className="py-24 sm:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">
            Clientes que <span className="font-black">confían en</span>{" "}
            <span className="font-bold tracking-tight">atom</span>
            <span className="font-bold text-primary">.</span>
          </h2>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            Sitios, sistemas y soluciones a medida que ya están funcionando.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Carousel
            opts={{ align: "start", loop: true, skipSnaps: true }}
            plugins={[
              AutoScroll({
                speed: 0.8,
                startDelay: 0,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent className="-ml-6 cursor-grab active:cursor-grabbing">
              {clients.map((client) => (
                <CarouselItem key={client.name} className="pl-6 basis-auto">
                  <div className="h-full w-[280px] sm:w-[320px] lg:w-[360px]">
                    <ClientCard client={client} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
