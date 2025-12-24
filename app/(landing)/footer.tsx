import Link from "next/link";
import { Code2, Github, Twitter, Linkedin, Mail, Instagram } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Agentic AI", href: "#agentic_ai" },
        { name: "Showcase", href: "#" },
        { name: "Pricing", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Community", href: "#" },
        { name: "API Reference", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Identity */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-mono text-xl font-bold tracking-tight">
                DevShare Forum
              </span>
            </div>
            <p className="text-pretty text-sm leading-6 text-muted-foreground max-w-xs">
              The AI-powered platform for modern developers to share code, 
              collaborate on projects, and build the future together.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/sangoonthego" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/ntngoc2002/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/_sango.dono_/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Nav Links Groups */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8 space-y-2">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  {footerSections[0].title}
                </h3>
                <ul role="list" className="mt-6 space-y-2">
                  {footerSections[0].links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  {footerSections[1].title}
                </h3>
                <ul role="list" className="mt-6 space-y-2">
                  {footerSections[1].links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  {footerSections[2].title}
                </h3>
                <ul role="list" className="mt-6 space-y-2">
                  {footerSections[2].links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-1 border-t pt-4 sm:mt-20 lg:mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} DevShare Forum, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Developed by</span>
            <Link href="https://github.com/sangoonthego" target="_blank" className="font-medium hover:text-primary underline underline-offset-4">
              Nguyen Tuan Ngoc
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
