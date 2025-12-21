import { Header } from "./(landing)/header";
import { Hero } from "./(landing)/hero";
import { FeaturesSection } from "./(landing)/features-section";
import { AIDemoSection } from "./(landing)/ai-demo-section";
import { CTASection } from "./(landing)/cta-section";
import { Footer } from "./(landing)/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <AIDemoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}