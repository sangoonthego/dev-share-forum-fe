<<<<<<< HEAD
// import { Header } from "./header"
// import { Hero } from "./hero"
// import { CommunityPulseSection } from "./community-pulse-section"
// import { LeadingVoicesSection } from "./leading-voices-section"
// import { DevShareNumbersSection } from "./devshare-numbers-section"
// import { ExperienceAgentSection } from "./experience-agent-section"
// import { FeaturesSection } from "./features-section"
// import { AIDemoSection } from "./ai-demo-section"
// import { CTASection } from "./cta-section"
// import { Footer } from "./footer"

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen">
//       <Header />
//       <main>
//         <Hero />
//         <CommunityPulseSection />
//         <LeadingVoicesSection />
//         <DevShareNumbersSection />
//         <ExperienceAgentSection />
//         <FeaturesSection />
//         <AIDemoSection />
//         <CTASection />
//       </main>
//       <Footer />
//     </div>
//   )
// }
=======
import { Header } from "./(landing)/header"
import { Hero } from "./(landing)/hero"
import { CommunityPulseSection } from "./(landing)/community-pulse-section"
import { LeadingVoicesSection } from "./(landing)/leading-voices-section"
import { DevShareNumbersSection } from "./(landing)/devshare-numbers-section"
import { ExperienceAgentSection } from "./(landing)/experience-agent-section"
import { FeaturesSection } from "./(landing)/features-section"
import { AIDemoSection } from "./(landing)/aidemo-section"
import { CTASection } from "./(landing)/cta-section"
import { Footer } from "./(landing)/footer"
import { CommunityVoicesSection } from "./community-voices-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CommunityPulseSection />
        <LeadingVoicesSection />
        <DevShareNumbersSection />
        <ExperienceAgentSection />
        <FeaturesSection />
        <CommunityVoicesSection />
        <AIDemoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
>>>>>>> 77e8011b079c598a43d6343e7de0df80116b7430
