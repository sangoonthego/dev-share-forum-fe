"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" // 1. Import useRouter
import { Github, Chrome, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("") 
  
  const router = useRouter() 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    setTimeout(() => {
      if (email === "host@gmail.com" && password === "host") {
        console.log("Login Success!")
        router.push("/home") 
      } else {
        setError("Email hoặc mật khẩu không đúng!")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <div className="p-8 md:p-12">
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
              {isLoading ? "Checking..." : "Sign In"}
            </Button>
          </form>

          {/* Social Auth & Links*/}
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
