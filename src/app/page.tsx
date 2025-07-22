import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServicesSection } from "@/components/ServicesSection"
import { GeometricBackground } from "@/components/GeometricBackground"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <GeometricBackground />
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