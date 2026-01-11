"use client"
import ChatWidget from "./chat-widget"

interface HomePageProps {
  onNavigate: (page: any) => void
}

const FloatingFormulas = () => {
  const formulas = [
    "=SUM(A1:A10)",
    '=IF(A1>10,"Yes","No")',
    "=VLOOKUP(A2,Sheet2!A:B,2,FALSE)",
    "=AVERAGE(B2:B15)",
    "=COUNT(C1:C20)",
    "=MAX(D1:D5)",
    "=CONCATENATE(A1,B1)",
    "=TODAY()",
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {formulas.map((formula, idx) => {
        const offset = idx % 4
        return (
          <div
            key={`${idx}-1`}
            className="absolute text-white font-mono text-xs md:text-sm whitespace-nowrap"
            style={{
              left: `${(idx * 12 + offset * 3) % 80}%`,
              top: `${(idx * 15 + offset * 5) % 100}%`,
              animation: `float-${idx % 3} ${25 + idx * 1.5}s infinite linear`,
              opacity: 0.25,
            }}
          >
            {formula}
          </div>
        )
      })}
      {formulas.map((formula, idx) => {
        const offset = (idx + 2) % 4
        return (
          <div
            key={`${idx}-2`}
            className="absolute text-white font-mono text-xs md:text-sm whitespace-nowrap"
            style={{
              left: `${(idx * 16 + offset * 4) % 85}%`,
              top: `${(idx * 20 + offset * 8) % 105}%`,
              animation: `float-${idx % 3} ${28 + idx * 1.8}s infinite linear`,
              animationDelay: `${idx * 0.5}s`,
              opacity: 0.25,
            }}
          >
            {formula}
          </div>
        )
      })}
    </div>
  )
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col pb-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-48 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent" />
      </div>

      <FloatingFormulas />

      <div className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-center mb-6 animate-fade-in gap-8 flex-shrink-0">
          <div className="flex-shrink-0">
            <img
              src="/images/e0316726-75da-482d-8e90.jpeg"
              alt="Excel Guruji"
              className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl"
            />
          </div>

          <div className="text-left flex-1">
            <h1 className="text-4xl md:text-5xl font-black text-white text-left tracking-wider mb-2">EXCEL GURUJI</h1>
            <p className="text-base md:text-lg text-emerald-300 font-semibold">
              Your friendly Excel mentor for complete beginners.
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-0 w-full flex flex-col">
          <ChatWidget />
        </div>
      </div>

      <div className="absolute bottom-24 right-4 text-xs text-white/60 pointer-events-none font-medium">
        Built through AI for All
      </div>
    </div>
  )
}
