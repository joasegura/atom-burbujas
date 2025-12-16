import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = new URL("https://atomsolucionesit.com.ar")

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Atom Soluciones IT | Desarrollo Web, Sistemas a Medida y Consultoría Tecnológica",
    template: "%s | Atom Soluciones IT",
  },
  description:
    "Atom Soluciones IT desarrolla sitios web, portales, software a medida y brinda consultoría tecnológica para empresas, ONGs y organizaciones públicas en Argentina y LATAM.",
  keywords: [
    "desarrollo web",
    "sitios web",
    "software a medida",
    "sistemas a medida",
    "consultoría IT",
    "transformación digital",
    "Atom Soluciones IT",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Atom Soluciones IT | Tecnología que impulsa tu negocio",
    description:
      "Soluciones tecnológicas integrales: sitios web, sistemas a medida y consultoría IT para organizaciones que quieren crecer.",
    siteName: "Atom Soluciones IT",
    locale: "es_AR",
    images: [
      {
        url: "/modern-website-design-computer-screen-showing-resp.jpg",
        width: 1200,
        height: 630,
        alt: "Equipo de Atom Soluciones IT trabajando en soluciones tecnológicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atom Soluciones IT | Tecnología que impulsa tu negocio",
    description:
      "Desarrollo web, sistemas a medida y consultoría tecnológica para empresas y organizaciones.",
    images: ["/modern-website-design-computer-screen-showing-resp.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Atom Soluciones IT",
              url: siteUrl.toString(),
              logo: `${siteUrl.toString()}/favicon.ico`,
              description:
                "Empresa de tecnología especializada en desarrollo web, software a medida y consultoría IT para empresas, ONGs y organismos públicos.",
              sameAs: [],
              address: {
                "@type": "PostalAddress",
                addressCountry: "AR",
              },
            }),
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
