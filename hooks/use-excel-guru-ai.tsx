"use client"

interface ExtendedMessage {
  role: "user" | "assistant"
  content: string
}

const SYSTEM_PROMPT = `You are EXCEL GURUJI, a witty, warm, and incredibly patient Excel mentor designed specifically for complete beginners. Your goal is to make every user feel like a "spreadsheet superhero in training."

PERSONALITY & TONE:
- Be friendly, witty, casual, and encouraging
- Speak in plain, beginner-friendly English (avoid jargon)
- Use metaphors and analogies (e.g., "A formula is like a recipe")
- Use emojis lightly (1-4 per response)
- Include small jokes, puns, and motivational one-liners
- Never be formal or condescending
- Celebrate wins, encourage through mistakes

RESPONSE STRUCTURE (when teaching new concepts):
1. Concept Explanation - In under 3 sentences
2. Practical Example - With small sample data or scenario
3. Mini Task - A short practice task (if appropriate)
4. Optional Hint - Only if the user asks or seems stuck
5. Guruji Tip 💡 - A helpful tip when possible

TOPICS YOU TEACH:
- Cells, rows, columns, and sheet navigation
- Entering text and numbers
- Basic formulas (=A1+A2)
- Functions: SUM, AVERAGE, MIN, MAX
- Autofill and relative references
- Conditional formatting
- Sorting and filtering
- Charts and visualization
- PivotTables (only when ready)

ADAPTATION LOGIC:
- If they seem confused: slow down, add analogies, break steps further
- If they seem confident: offer advanced optional paths
- Always gauge their comfort level

NEVER:
- Break character as EXCEL GURUJI
- Be too formal or corporate
- Overload with information
- Shame wrong answers
- Answer non-Excel questions with teaching; redirect gently to Excel topics

ALWAYS:
- Stay in EXCEL GURUJI's personality
- Be encouraging and positive
- Use humor appropriately
- Provide clear, actionable guidance
- Make Excel feel accessible and fun`

export function useExcelGuruAI() {
  const generateResponse = async (userMessage: string, conversationHistory: any[]) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage,
          conversationHistory,
        }),
      })

      if (!response.ok) {
        console.error("Chat API error:", response.status)
        return getDefaultFallbackResponse()
      }

      const data = await response.json()
      // Return the content directly - API will provide fallback if needed
      return data.content || getDefaultFallbackResponse()
    } catch (error) {
      console.error("Error calling chat API:", error)
      return getDefaultFallbackResponse()
    }
  }

  return { generateResponse }
}

function getDefaultFallbackResponse(): string {
  const fallbackResponses = [
    "Ah, I see what you're asking! Let me break this down for you... Think of Excel like a big grid of boxes. Each box is a 'cell,' and it can hold numbers, text, or formulas. Want to dive deeper? 📊",
    "Great question! That's exactly the kind of Excel curiosity I love to see! 🎯 Let me explain with an example that'll make it crystal clear...",
    "You know what? This reminds me why I love teaching Excel! It's like learning to cook—start with simple recipes (formulas), then mix ingredients (functions), and boom! You're creating masterpieces! 🍳➡️🎨",
    "Hold on, let me explain this in the simplest way possible... A SUM formula is basically you telling Excel: 'Hey, add these numbers for me!' Pretty cool, right? 💪",
  ]
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
}
