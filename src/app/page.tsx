import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServiceSections } from "@/components/ServiceSections"
import { Footer } from "@/components/Footer"
import { InteractiveGraphBackground } from "@/components/InteractiveGraphBackground"

export default function Home() {
  return (
    <>
      <InteractiveGraphBackground />
      <Navigation />
      <main>
        <HeroSection />
        <ServiceSections />
      </main>
      <Footer />
    </>
  )
}