import Navbar from "./navbar"
import Hero from "./landing_Components/hero"
import { Pricing } from "./landing_Components/pricing"

export default function Home() {
  return (
    <div className="bg-black w-full">

    <Navbar/>
    <Hero/>
    <Pricing/>

    </div>
  )
}
