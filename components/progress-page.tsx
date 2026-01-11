"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Award, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface ProgressStats {
  lessonsCompleted: number
  challengesCompleted: number
  conceptsMastered: string[]
  streakDays: number
  badges: string[]
}

export default function ProgressPage() {
  const [stats] = useState<ProgressStats>({
    lessonsCompleted: 3,
    challengesCompleted: 1,
    conceptsMastered: ["Cells & Grid", "SUM Function", "AVERAGE Function"],
    streakDays: 7,
    badges: ["Data Organizer", "Formula Finder", "Quick Learner"],
  })

  const learningData = [
    { day: "Mon", time: 15 },
    { day: "Tue", time: 25 },
    { day: "Wed", time: 20 },
    { day: "Thu", time: 30 },
    { day: "Fri", time: 35 },
    { day: "Sat", time: 28 },
    { day: "Sun", time: 40 },
  ]

  const skillsData = [
    { skill: "Formulas", level: 65 },
    { skill: "Functions", level: 55 },
    { skill: "Data Entry", level: 85 },
    { skill: "Formatting", level: 45 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-primary text-accent-foreground pt-8 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Your Progress 📈</h1>
          </div>
          <p className="text-sm opacity-90">You're on an amazing learning journey!</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-1">{stats.lessonsCompleted}</p>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
                <p className="text-xs mt-2 text-foreground/60">🎯 Keep up the momentum!</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent mb-1">{stats.challengesCompleted}</p>
                <p className="text-sm text-muted-foreground">Challenges Done</p>
                <p className="text-xs mt-2 text-foreground/60">💪 You're crushing it!</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-secondary mb-1">{stats.streakDays}</p>
                <p className="text-sm text-muted-foreground">Day Streak 🔥</p>
                <p className="text-xs mt-2 text-foreground/60">Never stop learning!</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-100/20 to-amber-100/10 border-2 border-amber-200/30">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-700 mb-1">{stats.conceptsMastered.length}</p>
                <p className="text-sm text-muted-foreground">Concepts Mastered</p>
                <p className="text-xs mt-2 text-foreground/60">⭐ You're brilliant!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Time Chart */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Learning Time This Week
            </CardTitle>
            <CardDescription>Minutes spent learning Excel each day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={learningData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `2px solid var(--color-primary)`,
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value} min`, "Time"]}
                />
                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skills Progress */}
        <Card className="mb-8 border-2 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Skills Development
            </CardTitle>
            <CardDescription>Your proficiency level in different Excel areas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" />
                <YAxis dataKey="skill" type="category" width={100} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `2px solid var(--color-accent)`,
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value}%`, "Progress"]}
                />
                <Bar dataKey="level" fill="var(--color-accent)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Concepts Mastered */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Concepts You've Mastered
            </CardTitle>
            <CardDescription>These topics are now second nature to you!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {stats.conceptsMastered.map((concept, idx) => (
                <div key={idx} className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="font-semibold text-primary flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    {concept}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="border-2 border-amber-200/30 bg-gradient-to-r from-amber-50/30 to-amber-50/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              Your Badges
            </CardTitle>
            <CardDescription>Achievements earned along your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {stats.badges.map((badge, idx) => (
                <div key={idx} className="text-center p-4 bg-background/50 rounded-lg border-2 border-amber-200/50">
                  <p className="text-3xl mb-2">🎖️</p>
                  <p className="font-semibold text-sm">{badge}</p>
                  <p className="text-xs text-muted-foreground mt-1">Badge Earned</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* GURUJI's Wisdom */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <CardContent className="pt-6">
            <p className="flex items-start gap-3 text-sm">
              <span className="text-2xl">💎</span>
              <span>
                <strong className="text-primary">GURUJI's Wisdom:</strong> Look at you go! From zero to hero in just{" "}
                {stats.streakDays} days! Every lesson completed is proof that you're capable of amazing things. The
                journey to Excel mastery isn't a sprint—it's a beautiful marathon. And you're crushing it! 🚀
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
