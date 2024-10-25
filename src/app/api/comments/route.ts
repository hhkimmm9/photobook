import { NextResponse, type NextRequest } from "next/server"
import { connectToDB } from "@/utils/db"
import Comment from "@/models/Comment"

export async function GET(req: NextRequest) {
  try {
    await connectToDB()
    
    const searchParams = req.nextUrl.searchParams
    const albumId = searchParams.get("albumId")

    if (!albumId) {
      return NextResponse.json({ message: "Album ID is required" }, { status: 400 })
    }

    const comments = await Comment.find({ albumId: albumId })
    return NextResponse.json({ comments }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Error fetching comments", error }, { status: 500 })
  }
}