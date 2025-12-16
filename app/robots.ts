import type { MetadataRoute } from "next"

const baseUrl = "https://atomsolucionesit.com.ar"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}


