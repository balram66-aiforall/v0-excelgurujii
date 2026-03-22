"use client"

import type React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Chrome } from "lucide-react"

export default function AuthPage({ onAuthSuccess }: { onAuthSuccess: (user: any) => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState("")

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, email auth is a demo. In production, you'd implement proper backend auth.
    onAuthSuccess({
      name: name || email.split("@")[0],
      email,
    })
  }

  const handleGoogleAuth = async () => {
    setIsAuthenticating(true)
    setError("")
    try {
      await signIn("google", { redirect: true, callbackUrl: "/" })
    } catch (err) {
      setError("Failed to sign in with Google")
      console.error("Google sign-in error:", err)
      setIsAuthenticating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">EXCEL GURUJI</CardTitle>
          <CardDescription className="text-slate-300">
            {isLogin ? "Welcome back, spreadsheet hero!" : "Start your Excel journey today!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/20"
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/20"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/20"
              required
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 font-semibold"
            >
              <Mail className="w-4 h-4 mr-2" />
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/5 px-2 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div>
            <Button
              onClick={handleGoogleAuth}
              disabled={isAuthenticating}
              variant="outline"
              className="w-full bg-white/10 border border-white/20 hover:bg-white/20 text-white"
            >
              <Chrome className="w-4 h-4 mr-2" />
              {isAuthenticating ? "Signing in..." : "Google"}
            </Button>
          </div>

          {/* Toggle */}
          <p className="text-center text-sm text-slate-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
