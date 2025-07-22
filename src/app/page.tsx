import { FutureNav } from "@/components/FutureNav"
import { FutureHero } from "@/components/FutureHero"
import { FutureServices } from "@/components/FutureServices"
import { FutureContact } from "@/components/FutureContact"
import { FutureBackground } from "@/components/FutureBackground"

export default function Home() {
  return (
    <>
      <FutureBackground />
      <FutureNav />
      <main className="relative">
        <FutureHero />
        <FutureServices />
        <FutureContact />
      </main>
    </>
  )
}