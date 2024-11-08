import { NextResponse, type NextRequest } from "next/server"
import { connectToDB } from "@/utils/db"
import { Comment } from '@/models'

export async function GET(req: NextRequest, params: { id: string }) {
  try {
    await connectToDB()
    console.log("Connected to database")

    const photoId = req.nextUrl.searchParams.get('photoId');
    console.log(photoId)
    if (photoId) {
      try {
        const comments = await Comment.find({ photoId })
        console.log("Comments fetched for photoId:", photoId, comments)
        return NextResponse.json({ comments }, { status: 200 })
      } catch (error) {
        console.error("Error fetching comments for photoId:", photoId, error)
        return NextResponse.json({ message: "Error fetching comments", error }, { status: 500 })
      }
    }

    const comment = await Comment.find({ _id: params.id })
    console.log("Comment fetched for id:", params.id, comment)
    if (!comment) {
      console.log("Comment not found for id:", params.id)
      return NextResponse.json({ message: "Comment not found" }, { status: 404 })
    }

    return NextResponse.json({ comment }, { status: 200 });
  } catch (error) {
    console.error("Error connecting to database or fetching comment:", error)
    return NextResponse.json({ message: "Error connecting to database", error }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB()

    const id = params.id
    const body = await req.json()
    const updatedComment = await Comment.findByIdAndUpdate(id, body, { new: true })

    if (!updatedComment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 })
    }

    return NextResponse.json({ updatedComment }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Error updating comment", error }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB()

    const id = params.id
    const deletedComment = await Comment.findByIdAndDelete(id)

    if (!deletedComment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 })
    }

    return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 })
    } catch (error) {
    return NextResponse.json({ message: 'Error deleting comment', error }, { status: 500 })
  }
}