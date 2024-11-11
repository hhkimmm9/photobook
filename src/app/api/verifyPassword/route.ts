import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: true }, { status: 200 })
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}