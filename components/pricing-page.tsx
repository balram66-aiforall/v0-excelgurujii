"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { SUBSCRIPTION_PLANS } from "@/lib/products"

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Simple, Honest Pricing</h1>
          <p className="text-lg opacity-90">Choose your path to becoming an Excel superhero</p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="inline-flex rounded-lg border border-border bg-background p-1">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-6 py-2 rounded-md font-medium transition ${
              billingPeriod === "monthly" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-6 py-2 rounded-md font-medium transition ${
              billingPeriod === "yearly" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
            }`}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition ${plan.id === "premium" ? "ring-2 ring-accent shadow-lg scale-105" : ""}`}
            >
              {plan.id === "premium" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-4xl font-bold">
                    {plan.priceInCents === 0 ? "Free" : `$${(plan.priceInCents / 100).toFixed(2)}`}
                  </div>
                  {plan.priceInCents > 0 && <div className="text-sm text-muted-foreground">per month</div>}
                </div>

                <Button
                  className={`w-full ${
                    plan.id === "free"
                      ? "bg-secondary text-foreground hover:bg-secondary/80"
                      : "bg-primary hover:bg-accent text-primary-foreground"
                  }`}
                >
                  {plan.id === "free" ? "Get Started" : "Coming Soon"}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4 text-left">
          <div className="bg-secondary/30 p-6 rounded-lg">
            <p className="font-semibold mb-2">Can I switch plans anytime?</p>
            <p className="text-muted-foreground">Upgrade or downgrade whenever you want.</p>
          </div>
          <div className="bg-secondary/30 p-6 rounded-lg">
            <p className="font-semibold mb-2">Do you offer refunds?</p>
            <p className="text-muted-foreground">Yes, we offer a 30-day money-back guarantee on paid plans.</p>
          </div>
          <div className="bg-secondary/30 p-6 rounded-lg">
            <p className="font-semibold mb-2">Is there a free trial?</p>
            <p className="text-muted-foreground">Start with our free Beginner plan—no credit card required!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
