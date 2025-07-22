import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServicesSection } from "@/components/ServicesSection"
import { AboutSection } from "@/components/AboutSection"
import { Footer } from "@/components/Footer"
import { ThreeBackground } from "@/components/ThreeBackground"

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
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}