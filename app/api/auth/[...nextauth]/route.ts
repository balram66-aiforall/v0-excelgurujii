import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

// Always have at least one provider (Credentials for demo mode)
const providers = [
  CredentialsProvider({
    name: "Demo",
    credentials: {
      email: { label: "Email", type: "email" },
      name: { label: "Name", type: "text" },
    },
    async authorize(credentials) {
      // Demo mode - accept any credentials
      if (credentials?.email) {
        return {
          id: "demo-user",
          email: credentials.email,
          name: credentials.name || "Excel Learner",
        }
      }
      return null
    },
  }),
]

// Add Google provider if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
  console.log("[NextAuth] Google OAuth configured successfully")
} else {
  console.warn(
    "[NextAuth] Google OAuth not configured. Using demo mode. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in environment variables to enable real authentication."
  )
}

const handler = NextAuth({
  providers,
  secret: process.env.NEXTAUTH_SECRET || "demo-secret-key-change-in-production",
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || ""
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
