"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Instagram, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navigation = {
  servicios: [
    { name: "Sitios y Portales", href: "#sitios" },
    { name: "Sistemas a Medida", href: "#sistemas" },
    { name: "Consultoría y Acompañamiento", href: "#consultoria" },
  ],
  empresa: [
    { name: "Nosotros", href: "#nosotros" },
    { name: "Industrias", href: "#industrias" },
  ],
  recursos: [
    { name: "Casos de éxito", href: "#" },
    { name: "Preguntas frecuentes", href: "#" },
  ],
}

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Aquí puedes agregar la lógica de suscripción cuando tengas el endpoint
      console.log("Suscripción:", email)
      alert(`¡Gracias por suscribirte! Te enviaremos novedades a ${email}`)
      setEmail("")
    }
  }

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-12 border-b border-border/30 mb-12">
          <div>
            <h3 className="text-xl font-bold text-secondary-foreground mb-2">Suscribite para recibir novedades</h3>
            <p className="text-secondary-foreground/60">Recibí las últimas tendencias en tecnología y desarrollo.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-3 w-full lg:w-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              required
              className="bg-background/10 border-border/30 text-secondary-foreground placeholder:text-secondary-foreground/40 max-w-xs"
            />
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo and description */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-1 mb-6">
              <span className="text-2xl font-bold text-secondary-foreground">atom</span>
              <span className="text-2xl font-bold text-primary">.</span>
            </Link>
            <p className="text-secondary-foreground/70 mb-6 max-w-xs">
              Soluciones tecnológicas que impulsan el crecimiento de tu organización.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-secondary-foreground/70 group-hover:text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-secondary-foreground/70 group-hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Servicios</h4>
            <ul className="space-y-3">
              {navigation.servicios.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {navigation.empresa.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@atomsolucionesit.com.ar"
                  className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  info@atomsolucionesit.com.ar
                </a>
              </li>
              <li>
                <a
                  href="tel:+5493772617109"
                  className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +54 9 3772-617109
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <MapPin className="h-4 w-4 text-primary" />
                Argentina
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/60">
            © 2025 Atom Soluciones IT. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="#" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
              Políticas de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
