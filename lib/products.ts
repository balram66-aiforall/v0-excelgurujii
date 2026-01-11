export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  priceInCents: number
  billingPeriod: "monthly" | "yearly"
  features: string[]
  limits: {
    dailyLessons: number
    weeklyCharlenges: number
    chatMessages: number
    maxCourseLevel: string
  }
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Beginner",
    description: "Start your Excel journey for free",
    priceInCents: 0,
    billingPeriod: "monthly",
    features: [
      "Access to basic daily lessons",
      "Limited chat with GURUJI (5 messages/day)",
      "Basic progress tracking",
      "Community support",
    ],
    limits: {
      dailyLessons: 1,
      weeklyCharlenges: 0,
      chatMessages: 5,
      maxCourseLevel: "Basics",
    },
  },
  {
    id: "pro",
    name: "Pro Learner",
    description: "Unlock the full learning experience",
    priceInCents: 999, // $9.99/month
    billingPeriod: "monthly",
    features: [
      "Unlimited daily lessons",
      "Weekly challenges with real-world scenarios",
      "Unlimited chat with GURUJI",
      "Detailed progress analytics",
      "Certificate of completion",
      "Access to all course levels",
      "Priority support",
    ],
    limits: {
      dailyLessons: 999,
      weeklyCharlenges: 4,
      chatMessages: 999,
      maxCourseLevel: "Advanced",
    },
  },
  {
    id: "premium",
    name: "Excel Master",
    description: "VIP experience with personalized guidance",
    priceInCents: 2499, // $24.99/month
    billingPeriod: "monthly",
    features: [
      "Everything in Pro Learner",
      "Live group sessions (2x per month)",
      "1-on-1 mentoring sessions",
      "Custom learning roadmap",
      "Early access to new content",
      "Exclusive templates library",
      "VIP support (24/7)",
    ],
    limits: {
      dailyLessons: 999,
      weeklyCharlenges: 999,
      chatMessages: 999,
      maxCourseLevel: "Expert",
    },
  },
]
