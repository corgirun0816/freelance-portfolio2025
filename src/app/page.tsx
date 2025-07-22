import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServiceSections } from "@/components/ServiceSections"
import { Footer } from "@/components/Footer"
import { SimpleThreeBackground } from "@/components/SimpleThreeBackground"

export default function Home() {
  return (
    <>
      <SimpleThreeBackground />
      <Navigation />
      <main>
        <HeroSection />
        <ServiceSections />
      </main>
      <Footer />
    </>
  )
}