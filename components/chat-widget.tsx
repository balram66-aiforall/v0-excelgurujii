"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, MessageCircle } from "lucide-react"
import { useExcelGuruAI } from "@/hooks/use-excel-guru-ai"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const ParsedContent = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g)

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={idx} className="font-bold">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <span key={idx}>{part}</span>
      })}
    </>
  )
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hey there! 👋 I'm EXCEL GURUJI, your friendly Excel mentor! Ready to turn you into a spreadsheet superhero? 🦸\n\nAsk me anything about Excel—from basic cell navigation to complex formulas. What would you like to learn today? ✨",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
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
        content: "😅 Oops! I hit a small snag. Try asking again, or ask me something about Excel concepts!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="glass-card p-4 flex flex-col h-full w-full animate-fade-in overflow-hidden">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10 flex-shrink-0">
        <MessageCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white leading-tight">Ask GURUJI Anything</h3>
          <p className="text-xs text-slate-400">Your personal Excel mentor</p>
        </div>
        <span className="text-xl">💬</span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain mb-4 pr-2 pb-6 space-y-3" ref={messagesContainerRef}>
        {messages.map((message, idx) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-slide-in`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div
              className={`px-4 py-3 rounded-2xl text-sm transition-all duration-200 ${
                message.role === "user"
                  ? "bg-emerald-600 text-white rounded-br-none shadow-lg hover:shadow-xl hover:bg-emerald-700 max-w-2xl"
                  : "bg-emerald-100 text-slate-900 rounded-bl-none shadow-lg hover:shadow-xl hover:bg-emerald-50 max-w-2xl"
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap break-words">
                <ParsedContent text={message.content} />
              </p>
              <p className={`text-xs mt-1 opacity-50 ${message.role === "user" ? "text-white" : "text-slate-600"}`}>
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-emerald-100 text-slate-900 px-4 py-3 rounded-2xl rounded-bl-none shadow-lg">
              <div className="flex gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-slate-600 animate-bounce"
                  style={{ animationDuration: "1.4s" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-slate-600 animate-bounce"
                  style={{ animationDelay: "0.2s", animationDuration: "1.4s" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-slate-600 animate-bounce"
                  style={{ animationDelay: "0.4s", animationDuration: "1.4s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 border-t border-white/10 pt-3 flex-shrink-0">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Guruji anything about Excel…"
          disabled={isLoading}
          className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:border-emerald-400/50 focus:bg-white/20 rounded-xl transition-all duration-200 resize-none min-h-[50px] max-h-[120px]"
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 rounded-xl px-4 font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
