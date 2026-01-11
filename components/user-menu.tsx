"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { LogOut } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  plan: "free" | "pro" | "premium"
  avatar?: string
}

interface UserMenuProps {
  user: UserProfile
  onLogout?: () => void
  onNavigate?: (page: any) => void
}

export default function UserMenu({ user, onLogout, onNavigate }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold hover:bg-accent transition"
      >
        {user.name.charAt(0).toUpperCase()}
      </button>

      {isOpen && (
        <Card className="absolute right-0 bottom-20 w-64 p-0 shadow-xl z-50 bg-card">
          <div className="p-4 border-b border-border">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="p-2">
            <button
              onClick={onLogout}
              className="w-full px-4 py-2 text-left hover:bg-red-100 dark:hover:bg-red-950 rounded-md transition text-red-600 text-sm flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </Card>
      )}
    </div>
  )
}
