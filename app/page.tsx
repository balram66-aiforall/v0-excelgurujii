"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import HomePage from "@/components/home-page"
import DailyLessonPage from "@/components/daily-lesson-page"
import WeeklyChallengesPage from "@/components/weekly-challenges-page"
import Navigation from "@/components/navigation"
import AuthPage from "@/components/auth-page"

type PageType = "home" | "lesson" | "challenges"

export default function Page() {
  const { data: session } = useSession()
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [user, setUser] = useState<any>(null)
  const [isReady, setIsReady] = useState(false)

  // If session exists, use it. Otherwise, check for local user state
  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name || "Excel Learner",
        email: session.user.email,
        avatar: session.user.image,
      })
    }
    // Mark as ready after checking session (whether authenticated or not)
    setIsReady(true)
  }, [session])

  // Show auth page if not authenticated
  if (!user && isReady) {
    return <AuthPage onAuthSuccess={setUser} />
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
