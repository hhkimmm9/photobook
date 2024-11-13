import { NextResponse, type NextRequest } from "next/server";
import { connectToDB } from "@/utils/db";
import { Photo, Comment } from "@/models";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const photoId = searchParams.get("photoId");

  try {
    await connectToDB();
    console.log("Connected to DB");

    if (photoId) {
      try {
        const comments = await Comment.find({ photoId });
        console.log("Comments found:", comments);
  
        return NextResponse.json({ comments }, { status: 200 });
      } catch (error) {
        console.error("Error fetching comments with given photoId", error);
        return NextResponse.json({ message: "Error fetching comments with given photoId", error }, { status: 500 });
      }
    }

    const comments = await Comment.find();
    console.log("Comments found:", comments);

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments", error);
    return NextResponse.json({ message: "Error fetching comments", error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const photoId = searchParams.get("photoId");
  
  const { username, text, password } = await req.json();
  
  try {
    await connectToDB();
    console.log("Connected to DB");

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return NextResponse.json({ message: "Photo not found" }, { status: 404 });
    }
    console.log("Photo found:", photo);

    const newComment = new Comment({
      photoId,
      username,
      text,
      // TODO: password hashing
      password,
      vote: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const createdComment = await newComment.save();
    console.log("New comment created:", createdComment);

    return NextResponse.json({ createdComment }, { status: 201 });
  } catch (error) {
    console.error("Error adding a comment", error);
    return NextResponse.json({ message: "Error adding a comment to a photo", error }, { status: 500 });
  }
}