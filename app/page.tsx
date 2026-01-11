"use client"

import { useState } from "react"
import HomePage from "@/components/home-page"
import DailyLessonPage from "@/components/daily-lesson-page"
import WeeklyChallengesPage from "@/components/weekly-challenges-page"
import Navigation from "@/components/navigation"

type PageType = "home" | "lesson" | "challenges"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")

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
      <main className="flex-1 relative overflow-hidden">{renderPage()}</main>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  )
}
