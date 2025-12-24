import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section id="cta" className="container py-20 md:py-32">
      <Card className="mx-auto max-w-4xl p-8 md:p-12 text-center space-y-6 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/20">
        <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">Ready to start sharing?</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Join thousands of developers already using DevShare Lite to collaborate and grow their skills.
        </p>
        <Button size="lg" asChild className="active:scale-95 transition-transform h-12 px-8">
          <Link href="/home">
            Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </Card>
    </section>
  );
}
