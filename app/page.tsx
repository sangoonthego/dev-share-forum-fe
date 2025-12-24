import { Header } from "./(landing)/header"
import { Hero } from "./(landing)/hero"
import { CommunityPulseSection } from "./(landing)/community-pulse-section"
import { LeadingVoicesSection } from "./(landing)/leading-voices-section"
import { DevShareNumbersSection } from "./(landing)/devshare-numbers-section"
import { ExperienceAgentSection } from "./(landing)/experience-agent-section"
import { FeaturesSection } from "./(landing)/features-section"
import { AIDemoSection } from "./(landing)/ai-demo-section"
import { CTASection } from "./(landing)/cta-section"
import { Footer } from "./(landing)/footer"
import { CommunityVoicesSection } from "./(landing)/community-voices-section"

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
        <AIDemoSection />
        <CommunityVoicesSection />
        {/* <CTASection /> */}
      </main>
      <Footer />
    </div>
  )
}
