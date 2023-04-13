import Navbar from "./navbar"
import Hero from "./landing_Components/hero"
import { Pricing } from "./landing_Components/pricing"
import { SecondaryFeatures } from "./landing_Components/SecondaryFeatures"
import Footer from "./landing_Components/footer"
import { PrimaryFeatures } from "./landing_Components/PrimaryFeatures"
import { Newsletter } from "./landing_Components/Newsletter"
import { Screencasts } from "./landing_Components/screencasts"

export default function Home() {
  return (
    <div className="bg-white w-full">

      <Navbar />
      <Hero />
      <main>
        <PrimaryFeatures />
        <div className="bg-white">
          <SecondaryFeatures />
          <Screencasts />
          <Pricing />
          <div className="p-32 rounded-lg">
            <Newsletter />
          </div>
        </div>   
      </main>
      <Footer />

    </div>
  )
}
