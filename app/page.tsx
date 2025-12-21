import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Code2, ArrowRight, Sparkles } from "lucide-react"
import { TechMarquee } from "@/components/tech-marquee"
import { FeatureCards } from "@/components/feature-cards"
import { AIAgentDemo } from "@/components/ai-agent-demo"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-mono text-lg font-semibold">DevShare Lite</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/home">Sign In</Link>
            </Button>
            <Button asChild className="active:scale-95 transition-transform">
              <Link href="/home">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 md:py-20">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
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
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto h-12 px-8 bg-card/50 backdrop-blur active:scale-95 transition-transform"
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          <div className="pt-8 animate-fade-in-up [animation-delay:600ms]">
            <p className="text-sm text-muted-foreground mb-4">Trusted by developers worldwide</p>
            <TechMarquee />
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* AI Demo Section */}
      <section className="container py-20 md:py-32 bg-muted/30">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              Coming Soon: Agentic AI
            </div>
            <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">AI That Understands Your Code</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Get intelligent suggestions, code reviews, and optimizations powered by advanced AI agents.
            </p>
          </div>

          <AIAgentDemo />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 md:py-32">
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

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-8 md:py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-mono font-semibold">DevShare Lite</span>
            </div>
            <p className="text-sm text-muted-foreground">Built with Next.js and Tailwind CSS</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
