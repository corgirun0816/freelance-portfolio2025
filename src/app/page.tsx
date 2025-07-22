import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServicesSection } from "@/components/ServicesSection"
import { Background3D } from "@/components/Background3D"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Background3D />
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