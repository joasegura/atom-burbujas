"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Servicios",
    href: "#servicios",
    submenu: [
      { name: "Sitios y Portales", href: "#sitios" },
      { name: "Sistemas a Medida", href: "#sistemas" },
      { name: "Consultoría", href: "#consultoria" },
    ],
  },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Industrias", href: "#industrias" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const primaryText = scrolled ? "text-foreground" : "text-white"
  const mutedText = scrolled ? "text-foreground/80" : "text-white/80"
  const hoverText = scrolled ? "hover:text-foreground" : "hover:text-white"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.open("https://wa.me/5493772617109", "_blank", "noopener,noreferrer")
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-card/95 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-1 group">
            <span className={cn("text-3xl font-bold tracking-tight leading-none", primaryText)}>atom</span>
            <span className="text-3xl font-bold leading-none text-primary">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors",
                    mutedText,
                    hoverText,
                  )}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="h-4 w-4" />}
                </Link>

                {item.submenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-card rounded-lg shadow-xl border border-border p-2 min-w-[200px]">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              onClick={handleContactClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
            >
              Contacto
            </Button>
          </div>

          <button className={cn("lg:hidden p-2", primaryText)} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-card/95 backdrop-blur-md">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-2 text-sm font-medium transition-colors",
                      mutedText,
                      hoverText,
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="pl-4">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-foreground/60 hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4">
                <Button
                  onClick={handleContactClick}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-full"
                >
                  Contacto
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
