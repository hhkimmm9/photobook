import { connectToDB } from "@/utils/db";
import cloudinary from "@/utils/cloudinaryConfig";
import Album from "@/models/Album";
import { NextResponse, type NextRequest } from "next/server";
import { Readable } from 'stream';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    console.log("Connected to DB");

    const formData = await req.formData();
    console.log("Form data received");

    const title = formData.get('title') as string;
    const thumbnailImage = formData.get('thumbnailImage') as Blob;
    const description = formData.get('description') as string;
    const password = formData.get('password') as string;
    const path = title.toLowerCase().replace(/ /g, "-");
    const photos = formData.getAll('photos') as Blob[];
    
    console.log("Parsed form data", { title, description, password, path, photosCount: photos.length });

    // Helper function to convert Blob to Readable stream
    const blobToStream = async (blob: Blob): Promise<Readable> => {
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);
      return stream;
    };

    // Upload thumbnail image to Cloudinary
    const thumbnailUpload = await new Promise<string>(async (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'photobook-9mo4' }, (error, result) => {
        if (error) {
          console.error("Thumbnail upload error", error);
          reject(error);
        }
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Upload failed, result is undefined"));
        }
      });
      const nodeStream = await blobToStream(thumbnailImage);
      nodeStream.pipe(uploadStream);
    });
    console.log("Thumbnail uploaded", thumbnailUpload);

    // Upload photos to Cloudinary
    const photoObjects = await Promise.all(photos.map(async (photo) => {
      return new Promise<{
        filename: string,
        type: "image" | "video" | "raw" | "auto",
        url: string,
        format: string,
        comments: string[]
        created_at: string
      }>(async (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'photobook-9mo4' }, (error, result) => {
          if (error) {
            console.error("Photo upload error", error);
            reject(error);
          }
          if (result) {
            resolve({
              filename: result.display_name,
              type: result.resource_type,
              url: result.secure_url,
              format: result.format,
              comments: [],
              created_at: result.created_at
            });
          } else {
            reject(new Error("Upload failed, result is undefined"));
          }
        });
        const nodeStream = await blobToStream(photo);
        nodeStream.pipe(uploadStream);
      });
    }));
    console.log("Photos uploaded", photoObjects);

    const createdAlbum = new Album({
      title,
      thumbnailImage: thumbnailUpload,
      description,
      password,
      path,
      photos: photoObjects,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await createdAlbum.save();
    console.log("Album created", createdAlbum);

    return NextResponse.json({ createdAlbum }, { status: 200 });
  } catch (error) {
    console.error("Error creating album", error);
    return NextResponse.json({ message: "Error creating album", error }, { status: 500 });
  }
}