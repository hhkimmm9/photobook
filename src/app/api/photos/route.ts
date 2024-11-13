import { NextResponse, type NextRequest } from "next/server";
import { connectToDB } from "@/utils/db";
import { Photo } from "@/models";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const albumId = searchParams.get("albumId");

  if (!albumId) {
    return NextResponse.json({ message: "albumId is required" }, { status: 400 });
  }

  try {
    await connectToDB();
    console.log("Connected to DB");

    const photos = await Photo.find({ albumId }).exec();
    console.log("Photos fetched", photos);

    return NextResponse.json({ photos }, { status: 200 });
  } catch (error) {
    console.error("Error fetching photos", error);
    return NextResponse.json({ message: "Error fetching photos" }, { status: 500 });
  }
}