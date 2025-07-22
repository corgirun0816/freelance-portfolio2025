import { PhysicsNav } from "@/components/PhysicsNav"
import { VolvoxHero } from "@/components/VolvoxHero"
import { VolvoxServices } from "@/components/VolvoxServices"
import { Footer } from "@/components/Footer"
import { VolvoxBackground } from "@/components/VolvoxBackground"

export default function VolvoxPage() {
  return (
    <>
      <VolvoxBackground />
      <PhysicsNav />
      <main>
        <VolvoxHero />
        <VolvoxServices />
      </main>
      <Footer />
    </>
  )
}