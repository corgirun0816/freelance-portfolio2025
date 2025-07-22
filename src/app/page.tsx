import { Spatial3DNav } from "@/components/Spatial3DNav"
import { Spatial3DHero } from "@/components/Spatial3DHero"
import { Spatial3DServices } from "@/components/Spatial3DServices"
import { Spatial3DContact } from "@/components/Spatial3DContact"
import { Spatial3DBackground } from "@/components/Spatial3DBackground"

export default function Home() {
  return (
    <>
      <Spatial3DBackground />
      <Spatial3DNav />
      <main className="relative">
        <div id="hero">
          <Spatial3DHero />
        </div>
        <div id="services">
          <Spatial3DServices />
        </div>
        <div id="contact">
          <Spatial3DContact />
        </div>
      </main>
    </>
  )
}