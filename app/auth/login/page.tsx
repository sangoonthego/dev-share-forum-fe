"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Github, Chrome, Code2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, loginWithOAuth } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login({ email, password })
      router.push("/home")
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Login failed"
      setError(errorMsg)
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = (provider: "google" | "github") => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <div className="p-8 md:p-10">
          <div className="flex items-center justify-start mb-6">
            <Link
              href="/"
              className="flex items-center text-muted-foreground hover:text-primary transition"
            >
            <Button size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm">Back</span>
            </Button>
            </Link>
          </div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-black">DevShare</span>
            </div>
            <h1 className="text-2xl font-black mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your DevShare account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/*  */}
            {error && (
              <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md border border-destructive/20 text-center">
                {error}
              </div>
            )}

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

          {/* Social Auth & Links*/}
          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 text-base font-medium gap-2 bg-transparent"
                onClick={() => handleOAuthLogin("github")}
              >
                <Github size={18} />
                GitHub
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 text-base font-medium gap-2 bg-transparent"
                onClick={() => handleOAuthLogin("google")}
              >
                <Chrome size={18} />
                Google
              </Button>
            </div>
          </div>

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
