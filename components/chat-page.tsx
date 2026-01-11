"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, MessageCircle } from "lucide-react"
import { useExcelGuruAI } from "@/hooks/use-excel-guru-ai"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hey there! 👋 I'm EXCEL GURUJI, your friendly Excel mentor! Ready to turn you into a spreadsheet superhero? 🦸\n\nAsk me anything about Excel—from basic cell navigation to complex formulas. I'm here to explain concepts, help you debug issues, or motivate you when you're stuck.\n\nWhat would you like to learn today? ✨",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { generateResponse } = useExcelGuruAI()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await generateResponse(inputValue, messages)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "😅 Oops! I hit a small snag. Let me get back in character and help you out. Try asking again, or ask me something about Excel concepts!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 pb-24 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground pt-6 pb-4 px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <MessageCircle className="w-6 h-6" />
          <div>
            <h1 className="text-2xl font-bold">Chat with GURUJI 💬</h1>
            <p className="text-xs opacity-90">Your personal Excel mentor is here 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto max-w-4xl mx-auto w-full px-4 py-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <Card
                className={`max-w-2xl ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary/30 text-foreground"
                }`}
              >
                <CardContent className="pt-4">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-secondary/30">
                <CardContent className="pt-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-border sticky bottom-0 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
              placeholder="Ask me anything about Excel... 📊"
              disabled={isLoading}
              className="flex-1 bg-background border-2 border-border focus:border-primary"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-primary hover:bg-accent text-primary-foreground px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
