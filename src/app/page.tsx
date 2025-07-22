import { QuantumNav } from "@/components/FutureComplete/QuantumNav"
import { Quantum4DHero } from "@/components/FutureComplete/Quantum4DHero"
import { QuantumServices } from "@/components/FutureComplete/QuantumServices"
import { QuantumContact } from "@/components/FutureComplete/QuantumContact"

export default function Home() {
  return (
    <>
      <QuantumNav />
      <main className="relative bg-white">
        <div id="origin">
          <Quantum4DHero />
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