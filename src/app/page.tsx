import { PhysicsNav } from "@/components/PhysicsNav"
import { DynamicHero } from "@/components/DynamicHero"
import { DynamicServices } from "@/components/DynamicServices"
import { InteractiveContact } from "@/components/InteractiveContact"
import { FluidBackground } from "@/components/FluidBackground"

export default function Home() {
  return (
    <>
      <FluidBackground />
      <PhysicsNav />
      <main className="relative bg-white/50">
        <DynamicHero />
        <DynamicServices />
        <InteractiveContact />
      </main>
    </>
  )
}