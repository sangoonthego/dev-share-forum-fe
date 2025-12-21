import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TechMarquee } from "@/components/tech-marquee";

export function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 md:py-20">
      <div className="mx-auto max-w-4xl space-y-8 text-center pt-5">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          AI-Powered Community Platform
        </div>

        <h1 className="font-mono text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-7xl animate-fade-in-up">
          Where Developers
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            Share Knowledge
          </span>
        </h1>

        <p className="text-lg text-muted-foreground text-pretty leading-relaxed sm:text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in-up [animation-delay:200ms]">
          Join a vibrant community of developers sharing code snippets, tutorials, and insights. Collaborate, learn,
          and grow together with intelligent AI assistance.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up [animation-delay:400ms]">
          <Button size="lg" asChild className="w-full sm:w-auto active:scale-95 transition-transform h-12 px-8">
            <Link href="/home">
              Start Sharing <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-12 px-8 bg-card/50 backdrop-blur active:scale-95 transition-transform">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>

        <div className="pt-8 animate-fade-in-up [animation-delay:600ms]">
          <p className="text-sm text-muted-foreground mb-4">Trusted by developers worldwide</p>
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}