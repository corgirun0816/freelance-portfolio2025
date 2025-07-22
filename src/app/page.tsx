import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ServiceSections } from "@/components/ServiceSections"
import { Footer } from "@/components/Footer"
import { TransformingThreeBackground } from "@/components/TransformingThreeBackground"

export default function Home() {
  return (
    <>
      <TransformingThreeBackground />
      <Navigation />
      <main>
        <HeroSection />
        <ServiceSections />
      </main>
      <Footer />
    </>
  )
}