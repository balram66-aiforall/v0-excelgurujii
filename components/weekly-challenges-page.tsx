"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Trophy } from "lucide-react"

interface Challenge {
  id: string
  week: number
  title: string
  scenario: string
  tasks: string[]
  difficulty: "beginner" | "intermediate"
  reward: string
}

const CHALLENGES: Challenge[] = [
  {
    id: "week-1",
    week: 1,
    title: "Build Your First Data List",
    scenario:
      "You're starting a hobby collection tracker. Create a simple spreadsheet to track 5 items you love with basic information.",
    tasks: [
      "Create column headers: Item Name, Category, Date Added",
      "Add 3-4 entries with your favorite hobbies or items",
      "Use SUM to count how many items you have",
      "Use AVERAGE if you have prices or ratings",
    ],
    difficulty: "beginner",
    reward: "🏆 Data Organizer Badge",
  },
  {
    id: "week-2",
    week: 2,
    title: "Student Grade Tracker",
    scenario: "Track a student's test scores and calculate statistics to understand performance trends.",
    tasks: [
      "Create a Grade Tracker with columns: Subject, Test1, Test2, Test3, Average",
      "Add 4 subjects with 3 test scores each",
      "Use AVERAGE function to calculate the average for each subject",
      "Use SUM to find total points across all tests",
    ],
    difficulty: "beginner",
    reward: "📊 Grade Master Badge",
  },
  {
    id: "week-3",
    week: 3,
    title: "Budget Planner",
    scenario: "Create a monthly budget to track income and expenses.",
    tasks: [
      "Set up: Income, Expenses categories, amounts",
      "Use SUM to calculate total income and total expenses",
      "Calculate remaining balance with a formula",
      "Identify which expense category uses the most money",
    ],
    difficulty: "intermediate",
    reward: "💰 Finance Pro Badge",
  },
]

export default function WeeklyChallengesPage() {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null)

  const handleCompleteChallenge = (id: string) => {
    if (!completedChallenges.includes(id)) {
      setCompletedChallenges([...completedChallenges, id])
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-primary text-accent-foreground pt-8 pb-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Weekly Challenges</h1>
          </div>
          <p className="text-sm opacity-90">
            Completed: {completedChallenges.length} of {CHALLENGES.length}
          </p>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {CHALLENGES.map((challenge) => {
            const isCompleted = completedChallenges.includes(challenge.id)
            const isExpanded = expandedChallenge === challenge.id

            return (
              <Card
                key={challenge.id}
                className={`border-2 transition-all cursor-pointer ${
                  isCompleted ? "border-green-500/30 bg-green-50/30" : "border-primary/20 hover:border-primary/50"
                }`}
                onClick={() => setExpandedChallenge(isExpanded ? null : challenge.id)}
              >
                <CardHeader className={isCompleted ? "bg-green-50/20" : "bg-secondary/20"}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-primary" />
                        )}
                        <span className="text-xs font-semibold text-muted-foreground">Week {challenge.week}</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary font-semibold">
                          {challenge.difficulty}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <CardDescription className="text-sm mt-1">{challenge.scenario}</CardDescription>
                    </div>
                    <span className="text-2xl">{isCompleted ? "✅" : "🎯"}</span>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-6 border-t border-border">
                    <div className="mb-6">
                      <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                        <span className="text-lg">📋</span> Your Tasks:
                      </h4>
                      <ul className="space-y-2">
                        {challenge.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                            <span className="font-semibold text-primary min-w-6">{idx + 1}.</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-accent/10 rounded-lg mb-4 text-sm">
                      <p className="font-semibold text-accent mb-1">🏆 Reward:</p>
                      <p className="text-foreground/80">{challenge.reward}</p>
                    </div>

                    {!isCompleted && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCompleteChallenge(challenge.id)
                        }}
                        className="w-full bg-primary hover:bg-accent text-primary-foreground"
                      >
                        Mark as Completed
                      </Button>
                    )}

                    {isCompleted && (
                      <div className="p-3 bg-green-50/30 border border-green-500/30 rounded-lg">
                        <p className="text-sm font-semibold text-green-700">
                          ✨ Awesome job! You earned: {challenge.reward}
                        </p>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Encouragement Card */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <CardContent className="pt-6">
            <p className="flex items-start gap-3 text-sm">
              <span className="text-2xl">🚀</span>
              <span>
                <strong className="text-primary">GURUJI's Motivation:</strong> Each challenge you complete is proof that
                you're growing! You're not just learning Excel—you're building real-world skills that will make you
                unstoppable. Keep crushing it! 💪
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
