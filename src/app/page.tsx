import { QuantumNav } from "@/components/FutureComplete/QuantumNav"
import { Quantum4DHero } from "@/components/FutureComplete/Quantum4DHero"
import { TimeTravel } from "@/components/MindControl/TimeTravel"
import { GravityDefyingServices } from "@/components/MindControl/GravityDefyingServices"
import { QuantumContact } from "@/components/FutureComplete/QuantumContact"
import { ThoughtInterface } from "@/components/MindControl/ThoughtInterface"
import { EvolvingAI } from "@/components/MindControl/EvolvingAI"

export default function Home() {
  return (
    <>
      <QuantumNav />
      <ThoughtInterface />
      <EvolvingAI />
      <main className="relative bg-white">
        <div id="origin">
          <Quantum4DHero />
        </div>
        <div id="timeline">
          <TimeTravel />
        </div>
        <div id="services">
          <GravityDefyingServices />
        </div>
        <div id="connect">
          <QuantumContact />
        </div>
      </main>
    </>
  )
}