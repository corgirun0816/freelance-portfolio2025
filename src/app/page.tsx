import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServicesSection } from "@/components/ServicesSection"
import { DynamicParticleBackground } from "@/components/DynamicParticleBackground"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <DynamicParticleBackground />
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