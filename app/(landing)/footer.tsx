import Link from "next/link";
import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-mono font-semibold">DevShare Lite</span>
          </div>
          <p className="text-sm text-muted-foreground">Built with Next.js and Tailwind CSS</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}