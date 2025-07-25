import { LiquidGlassNav } from "@/components/LiquidGlassNav"
import { LiquidGlassHero } from "@/components/LiquidGlassHero"
import { LiquidGlassTimeline } from "@/components/LiquidGlassTimeline"
import { LiquidGlassServices } from "@/components/LiquidGlassServices"
import { LiquidGlassContact } from "@/components/LiquidGlassContact"

export default function Home() {
  return (
    <>
      <LiquidGlassNav />
      <main className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen">
        <div id="origin">
          <LiquidGlassHero />
        </div>
        <div id="timeline">
          <LiquidGlassTimeline />
        </div>
        <div id="services">
          <LiquidGlassServices />
        </div>
        <div id="connect">
          <LiquidGlassContact />
        </div>
      </main>
    </>
  )
}