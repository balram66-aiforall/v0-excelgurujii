import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const action = url.searchParams.get("action")

  // Handle session endpoint
  if (action === "session" || url.pathname.includes("/session")) {
    return NextResponse.json({
      user: null,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })
  }

  // Handle signin page
  if (action === "signin" || url.pathname.includes("/signin")) {
    return NextResponse.json({
      message: "Demo auth - credentials not required",
    })
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 })
}

export async function POST(request: Request) {
  const url = new URL(request.url)

  // Handle signin requests
  if (url.pathname.includes("/signin")) {
    const body = await request.json().catch(() => ({}))
    return NextResponse.json({
      ok: true,
      user: {
        id: "demo-user",
        email: body.email || "demo@example.com",
        name: body.name || "Excel Learner",
      },
    })
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 })
}
