import { QuantumNav } from "@/components/FutureComplete/QuantumNav"
import { QuantumHero } from "@/components/FutureComplete/QuantumHero"
import { QuantumServices } from "@/components/FutureComplete/QuantumServices"
import { QuantumContact } from "@/components/FutureComplete/QuantumContact"

export default function Home() {
  return (
    <>
      <QuantumNav />
      <main className="relative bg-white">
        <div id="origin">
          <QuantumHero />
        </div>
        <div id="services">
          <QuantumServices />
        </div>
        <div id="connect">
          <QuantumContact />
        </div>
      </main>
    </>
  )
}