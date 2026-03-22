# NextAuth.js Google Sign-In Setup Guide

## What You Need to Do

You'll need to add 4 environment variables to your Vercel project. **This is completely free - no credit card required.**

### Step 1: Get Google OAuth Credentials (Free)

1. Go to https://console.cloud.google.com
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Click "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click it and press "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - For development: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://yourdomain.com/api/auth/callback/google`
   - Copy your **Client ID** and **Client Secret**

### Step 2: Generate NextAuth Secret

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Or generate it online at: https://generate-secret.vercel.app/32

This gives you your **NEXTAUTH_SECRET**

### Step 3: Add Environment Variables to Vercel

1. Go to your Vercel project settings
2. Navigate to **Settings > Environment Variables**
3. Add these 4 variables:

| Name | Value |
|------|-------|
| `NEXTAUTH_URL` | `http://localhost:3000` (for dev) or your production URL |
| `NEXTAUTH_SECRET` | The string you generated in Step 2 |
| `GOOGLE_CLIENT_ID` | Your Client ID from Step 1 |
| `GOOGLE_CLIENT_SECRET` | Your Client Secret from Step 1 |

### Step 4: Test It Out

1. Restart your development server
2. Go to your app and click "Google" on the auth page
3. You should be redirected to Google's sign-in
4. After signing in, you'll be logged in to the app!

## Troubleshooting

**"Google button does nothing"** → Make sure environment variables are set and dev server restarted

**"Invalid Client ID"** → Double-check the Client ID matches what's in Google Cloud Console

**"Redirect URI mismatch"** → Make sure the redirect URI in Google Console matches your app URL

## Questions?

All of this is free and doesn't require any payment. NextAuth.js is open-source and Google provides free OAuth credentials.
