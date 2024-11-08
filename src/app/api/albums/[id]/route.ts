import { NextResponse, type NextRequest } from "next/server";
import { connectToDB } from "@/utils/db";
import { Album } from "@/models";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  
  try {
    await connectToDB();
    console.log("Connected to DB");

    const album = await Album.findOne({ _id: id }).exec();
    console.log("Albums fetched", album);

    return NextResponse.json({ album }, { status: 200 });
  } catch (error) {
    console.error("Error fetching albums", error);
    return NextResponse.json({ message: "Error fetching albums", error }, { status: 500 });
  }
}