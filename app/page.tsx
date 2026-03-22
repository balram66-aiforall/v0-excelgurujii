"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import HomePage from "@/components/home-page"
import DailyLessonPage from "@/components/daily-lesson-page"
import WeeklyChallengesPage from "@/components/weekly-challenges-page"
import Navigation from "@/components/navigation"
import AuthPage from "@/components/auth-page"

type PageType = "home" | "lesson" | "challenges"

export default function Page() {
  const { data: session, status } = useSession()
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [user, setUser] = useState<any>(null)

  // If session exists, use it. Otherwise, check for local user state
  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name || "Excel Learner",
        email: session.user.email,
        avatar: session.user.image,
      })
    }
  }, [session])

  // Show auth page if not authenticated
  if (status === "unauthenticated" && !user) {
    return <AuthPage onAuthSuccess={setUser} />
  }

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case "lesson":
        return <DailyLessonPage />
      case "challenges":
        return <WeeklyChallengesPage />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="h-[100dvh] overflow-hidden bg-background flex flex-col">
      <main className="flex-1 relative overflow-hidden min-h-0">{renderPage()}</main>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  )
}
