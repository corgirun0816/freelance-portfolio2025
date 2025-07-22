import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServiceSections } from "@/components/ServiceSections"
import { Footer } from "@/components/Footer"
import { MorphingThreeBackground } from "@/components/MorphingThreeBackground"

export default function Home() {
  return (
    <>
      <MorphingThreeBackground />
      <Navigation />
      <main>
        <HeroSection />
        <ServiceSections />
      </main>
      <Footer />
    </>
  )
}