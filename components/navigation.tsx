"use client"
import { Home, BookOpen, Trophy } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  avatar?: string
}

interface NavigationProps {
  currentPage: "home" | "lesson" | "challenges"
  onNavigate: (page: any) => void
  user?: UserProfile
  onLogout?: () => void
}

export default function Navigation({ currentPage, onNavigate, user, onLogout }: NavigationProps) {
  const navItems = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "lesson" as const, label: "Lesson", icon: BookOpen },
    { id: "challenges" as const, label: "Challenges", icon: Trophy },
  ]

  return (
    /* Fixed navigation with proper z-index and pointer-events to ensure buttons are clickable */
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-black/40 border-t border-white/10 z-50 pointer-events-auto">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-20">
        <div className="flex items-center justify-around flex-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 relative z-50 ${
                currentPage === id
                  ? "text-emerald-400 bg-emerald-500/20 transform scale-105"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
