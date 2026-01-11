"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface Lesson {
  id: string
  title: string
  concept: string
  example: string
  task: string
  hint?: string
  solution: string
  reflection: string
}

const LESSONS: Lesson[] = [
  {
    id: "lesson-1",
    title: "Understanding Cells - The Building Blocks",
    concept:
      "A cell is like a single box in a grid where you store one piece of data. Think of it like a mailbox! Each mailbox has an address (A1, B2, etc.). This address helps us find and talk about each cell.",
    example:
      'Cell A1 contains "John", B1 contains "30", C1 contains "Engineer". Together, they form a row of data about a person.',
    task: "In column A, type: Name | In column B, type: Age | In column C, type: Job",
    solution: "Simply select the cells and type the values in each cell.",
    reflection: "Was this confusing? Want to try a harder version?",
    hint: "Select cell A1 first, type your text, press Tab to move to B1, repeat!",
  },
  {
    id: "lesson-2",
    title: "The Magic of SUM - Addition Made Easy",
    concept:
      'The SUM function is like a magical calculator for Excel. Instead of adding manually, you tell Excel: "Hey, add all these cells together!" The formula looks like =SUM(A1:A5), which means "add cells A1 through A5."',
    example: "If you have sales numbers in A1(100), A2(200), A3(150), then =SUM(A1:A3) gives you 450 instantly!",
    task: "Create a simple list of 3 numbers and use =SUM to add them. Type the formula in the cell below.",
    solution: "Enter =SUM(A1:A3) in cell A4 to see the total.",
    reflection: "Did you see the result appear? Magical, right? 🎉",
    hint: "Type the = sign first, then SUM, then open parenthesis, select your range, close parenthesis!",
  },
  {
    id: "lesson-3",
    title: "AVERAGE - Finding the Middle Ground",
    concept:
      "AVERAGE calculates the middle value. It's perfect for understanding trends. Formula: =AVERAGE(range). If you have test scores, AVERAGE shows your typical performance.",
    example: "Test scores: 85, 90, 78. Average = (85+90+78)÷3 = 84.33",
    task: "Create 4 test scores and calculate the average using =AVERAGE()",
    solution: "Type =AVERAGE(A1:A4) to get your average score.",
    reflection: "Cool! Now you can track your progress over time. Want to try MIN and MAX next?",
    hint: "Make sure your numbers are in a continuous range for AVERAGE to work properly.",
  },
]

export default function DailyLessonPage() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [taskAnswer, setTaskAnswer] = useState("")
  const [showSolution, setShowSolution] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [taskAttempted, setTaskAttempted] = useState(false)

  const lesson = LESSONS[currentLessonIndex]

  const handleComplete = () => {
    setTaskAttempted(true)
    setCompleted(true)
  }

  const handleNext = () => {
    if (currentLessonIndex < LESSONS.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      setTaskAnswer("")
      setShowSolution(false)
      setCompleted(false)
      setTaskAttempted(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-background via-background to-secondary/20 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground pt-8 pb-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold opacity-90">
              Lesson {currentLessonIndex + 1} of {LESSONS.length}
            </span>
            <div className="flex-1 h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all"
                style={{ width: `${((currentLessonIndex + 1) / LESSONS.length) * 100}%` }}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-balance">{lesson.title}</h1>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Concept */}
        <Card className="mb-6 border-2 border-primary/20">
          <CardHeader className="bg-secondary/20">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl">📖</span>
              Concept Explanation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-foreground/80 leading-relaxed mb-3">{lesson.concept}</p>
            <p className="text-sm text-primary font-semibold">💡 Think of it this way: {lesson.example}</p>
          </CardContent>
        </Card>

        {/* Practical Example */}
        <Card className="mb-6 border-2 border-accent/20">
          <CardHeader className="bg-accent/10">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl">📝</span>
              Practical Example
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm mb-3">
              <p className="mb-2">{lesson.example}</p>
            </div>
          </CardContent>
        </Card>

        {/* Mini Task */}
        <Card className="mb-6 border-2 border-accent/30 bg-gradient-to-r from-accent/5 to-secondary/5">
          <CardHeader className="bg-accent/10">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🎯</span>
              Your Mini Task
            </CardTitle>
            <CardDescription>Time to practice what you learned!</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-foreground/80 mb-4">{lesson.task}</p>

            {!taskAttempted && (
              <div className="space-y-3">
                <textarea
                  value={taskAnswer}
                  onChange={(e) => setTaskAnswer(e.target.value)}
                  placeholder="Describe what you tried or paste your result here..."
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-24 resize-none"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleComplete}
                    disabled={!taskAnswer.trim()}
                    className="flex-1 bg-primary hover:bg-accent text-primary-foreground"
                  >
                    Check My Answer
                  </Button>
                  <Button onClick={() => setShowSolution(!showSolution)} variant="outline" className="flex-1">
                    {showSolution ? "Hide Hint" : "Need a Hint?"}
                  </Button>
                </div>
              </div>
            )}

            {showSolution && !completed && (
              <div className="mt-4 p-4 bg-secondary/20 rounded-lg border-l-4 border-primary">
                <p className="text-sm font-semibold text-primary mb-2">💡 Hint:</p>
                <p className="text-sm text-foreground/80">{lesson.hint || "You're on the right track! Try again!"}</p>
              </div>
            )}

            {completed && (
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <p className="font-semibold text-green-700 mb-2">🎉 Great Work!</p>
                  <p className="text-sm text-green-600">
                    Your answer shows you're getting it! Here's the complete solution:
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-semibold mb-2">✓ Solution:</p>
                  <p className="text-sm text-foreground/80">{lesson.solution}</p>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-primary hover:bg-accent text-primary-foreground flex items-center justify-center gap-2"
                >
                  {currentLessonIndex < LESSONS.length - 1 ? "Next Lesson" : "Finish Learning Path"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reflection Prompt */}
        {completed && (
          <Card className="bg-accent/5 border-2 border-accent/30">
            <CardContent className="pt-6">
              <p className="text-sm text-foreground/80">
                <strong>Reflection:</strong> {lesson.reflection}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
