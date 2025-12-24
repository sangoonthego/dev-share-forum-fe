"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Github, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Code2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <div className="p-8 md:p-12">
          {/* Logo & Welcome */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-black">DevShare</span>
            </div>
            <h1 className="text-2xl font-black mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your DevShare account</p>
          </div>

          {/* Social Auth */}
          <div className="space-y-3 mb-6">
            <Button variant="outline" className="w-full h-12 text-base font-medium gap-2 bg-transparent">
              <Github size={18} />
              Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full h-12 text-base font-medium gap-2 bg-transparent">
              <Chrome size={18} />
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-11 text-base font-semibold">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center mt-6">
            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline font-medium">
              Forgot your password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
