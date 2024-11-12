import { Album } from "@/models";
import verifyPassword from "@/utils/bcrypt";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("POST request received");

  const searchParams = req.nextUrl.searchParams;
  const { pwdInput, albumId } = await req.json();
  const albumPassword = searchParams.get("albumPassword") === "true";

  console.log("Request body:", { pwdInput, albumId });
  console.log("Album password from search params:", albumPassword);

  if (albumPassword) {
    try {
      const album = await Album.findById(albumId);
      console.log("Album found:", album);

      if (!album) {
        console.log("Album not found");
        return NextResponse.json({ success: false }, { status: 404 });
      }

      const hashedPassword = album.password;
      const match = await verifyPassword(pwdInput, hashedPassword);

      console.log("Password match result:", match);

      if (match) {
        return NextResponse.json({ success: true }, { status: 200 });
      } else {
        return NextResponse.json({ success: false }, { status: 401 });
      }
    } catch (error) {
      console.error("Error verifying album password", error);
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } else {
    console.log("No album password provided, checking admin password");

    if (pwdInput === process.env.ADMIN_PASSWORD) {
      console.log("Admin password match");
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.log("Admin password mismatch");
      return NextResponse.json({ success: false }, { status: 401 });
    }
  }
}