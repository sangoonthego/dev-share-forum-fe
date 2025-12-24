"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Code2, CheckCircle, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate sending reset link
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <div className="p-8 md:p-12">
          {!submitted ? (
            <>
              {/* Logo & Welcome */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Code2 className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-black">DevShare</span>
                </div>
                <h1 className="text-2xl font-black mb-2">Reset Password</h1>
                <p className="text-muted-foreground">
                  Enter your email and we'll send you a link to reset your password
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <Button type="submit" disabled={isLoading} className="w-full h-11 text-base font-semibold">
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="text-center mt-6 pt-6 border-t">
                <Link
                  href="/auth/login"
                  className="text-sm text-primary hover:underline font-medium flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center animate-fade-in">
                    <CheckCircle size={32} className="text-green-600 dark:text-green-500" />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black mb-2">Check Your Email</h2>
                  <p className="text-muted-foreground">
                    We've sent a password reset link to <span className="font-semibold text-foreground">{email}</span>
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                  <p>The link will expire in 24 hours. If you don't see the email, check your spam folder.</p>
                </div>

                <Link href="/auth/login">
                  <Button className="w-full h-11 text-base font-semibold">Return to Login</Button>
                </Link>

                <button
                  onClick={() => {
                    setSubmitted(false)
                    setEmail("")
                  }}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Didn't receive an email? Try again
                </button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
