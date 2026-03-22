import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Only add Google provider if credentials are available
const providers = []

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

// Fallback to credentials provider for demo mode
if (providers.length === 0) {
  console.warn(
    "[NextAuth] Warning: Google OAuth credentials not configured. Falling back to demo mode. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in environment variables."
  )
}

const handler = NextAuth({
  providers,
  secret: process.env.NEXTAUTH_SECRET,
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
