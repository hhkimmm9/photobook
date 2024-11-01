import { NextResponse, type NextRequest } from "next/server"
import { connectToDB } from "@/utils/db"
import { Comment } from '@/models'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDB()

    const id = (await params).id
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDB()

    const id = (await params).id
    const deletedComment = await Comment.findByIdAndDelete(id)

    if (!deletedComment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 })
    }

    return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 })
    } catch (error) {
    return NextResponse.json({ message: 'Error deleting comment', error }, { status: 500 })
  }
}