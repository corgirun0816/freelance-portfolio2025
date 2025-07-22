import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServicesSection } from "@/components/ServicesSection"
import { AboutSection } from "@/components/AboutSection"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
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