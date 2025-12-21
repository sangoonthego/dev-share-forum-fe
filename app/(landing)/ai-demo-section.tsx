import { Sparkles } from "lucide-react";
import { AIAgentDemo } from "@/components/agentic/ai-agent-demo";

export function AIDemoSection() {
  return (
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
  );
}