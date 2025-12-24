"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  const width = useTransform(smoothScrollY, [0, 100], ["100%", "70%"]);
  const borderRadius = useTransform(smoothScrollY, [0, 100], ["40px", "40px"]);
  const paddingX = useTransform(smoothScrollY, [0, 100], ["24px", "32px"]);
  const shadow = useTransform(
    smoothScrollY,
    [0, 100],
    ["none", "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"]
  );

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Agentic AI", href: "#agentic_ai" },
    { name: "CTA", href: "#cta" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-0 md:p-2 pointer-events-none">
      <motion.header
        style={{
          width,
          borderRadius,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          boxShadow: shadow,
          marginTop: useTransform(smoothScrollY, [0, 100], ["15px", "0px"]),
        }}
        className={cn(
          "pointer-events-auto flex h-14 items-center justify-between border transition-colors duration-500",
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "max-w-7xl" 
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-mono text-lg font-semibold hidden md:block">Dev Share Forum</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild className="active:scale-95 transition-transform rounded-full">
            <Link href="/home">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.header>
    </div>
  );
}
