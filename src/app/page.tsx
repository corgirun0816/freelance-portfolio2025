import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServicesSection } from "@/components/ServicesSection"
import { ParticleBackground } from "@/components/ParticleBackground"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navigation />
      <main>
        <HeroSection />
        <div id="services">
          <ServicesSection />
        </div>
      </main>
      <Footer />
    </>
  )
}