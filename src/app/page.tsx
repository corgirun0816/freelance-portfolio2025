import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServiceSections } from "@/components/ServiceSections"
import { Footer } from "@/components/Footer"
import { SimpleGraphBackground } from "@/components/SimpleGraphBackground"

export default function Home() {
  return (
    <>
      <SimpleGraphBackground />
      <Navigation />
      <main>
        <HeroSection />
        <ServiceSections />
      </main>
      <Footer />
    </>
  )
}