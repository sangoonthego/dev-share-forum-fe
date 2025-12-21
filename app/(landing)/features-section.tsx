import { FeatureCards } from "@/components/feature-cards";

export function FeaturesSection() {
  return (
    <section id="features" className="container py-20 md:py-32">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to collaborate
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Powerful features designed for modern developers who want to share, learn, and build together.
          </p>
        </div>
        <FeatureCards />
      </div>
    </section>
  );
}