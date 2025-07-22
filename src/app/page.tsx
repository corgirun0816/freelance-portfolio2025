import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServicesSection } from "@/components/ServicesSection"
import { ThreeBackground } from "@/components/ThreeBackground"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <ThreeBackground />
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