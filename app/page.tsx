import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Marquee } from "@/components/marquee"
import { Services } from "@/components/services"
import { Industries } from "@/components/industries"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Marquee />
      <Services />
      <Industries />
      <Stats />
      <CTA />
      <Footer />
    </main>
  )
}
