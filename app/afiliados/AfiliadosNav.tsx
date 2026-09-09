"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// La página es larga y el único objetivo es que la persona se postule:
// el CTA tiene que estar siempre a un toque de distancia.
export function AfiliadosNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border/15 bg-secondary/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="inline-flex items-baseline gap-1">
          <span className="text-xl font-semibold tracking-tight text-secondary-foreground">atom</span>
          <span className="text-xl font-semibold text-primary">.</span>
        </Link>

        <a
          href="#sumarme"
          className="hidden text-[15px] text-secondary-foreground/60 underline-offset-8 transition-colors hover:text-secondary-foreground hover:underline sm:inline-block"
        >
          Quiero sumarme
        </a>
      </div>
    </header>
  )
}

// Barra fija sólo en mobile: en pantallas chicas el CTA del hero queda lejísimos.
export function AfiliadosMobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("sumarme")
      const pastHero = window.scrollY > 520
      const formOnScreen = form ? form.getBoundingClientRect().top < window.innerHeight : false
      setVisible(pastHero && !formOnScreen)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-border/15 bg-secondary/95 p-3 backdrop-blur-md transition-transform duration-300 sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href="#sumarme"
        className="block rounded-full bg-primary px-6 py-3.5 text-center text-[15px] font-medium text-primary-foreground"
      >
        Quiero sumarme
      </a>
    </div>
  )
}
