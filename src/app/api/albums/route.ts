import { NextResponse, type NextRequest } from "next/server";
import { connectToDB } from "@/utils/db";
import { Album, Photo } from "@/models";
import cloudinary from "@/utils/cloudinaryConfig";
import { Readable } from 'stream';
import { Schema } from "mongoose";

export async function GET() {
  try {
    await connectToDB();
    console.log("Connected to DB");

    const albums = await Album.find({}).exec();
    console.log("Albums fetched", albums);

    return NextResponse.json({ albums }, { status: 200 });
  } catch (error) {
    console.error("Error fetching albums", error);
    return NextResponse.json({ message: "Error fetching albums", error }, { status: 500 });
  }
}

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
      const uploadStream = cloudinary.uploader.upload_stream({
        resource_type: 'image', folder: 'photobook-9mo4' }, (error, result) => {
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

    // Step 1: Create the album without photos to get the albumId
    const createdAlbum = new Album({
      title,
      thumbnailImage: thumbnailUpload,
      description,
      password,
      path,
      photos: [], // Initially, no photos
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedAlbum = await createdAlbum.save();
    const albumId = savedAlbum._id;
    console.log("Album created", savedAlbum);
    
    // Step 2: Upload photos to Cloudinary and save to Photo collection
    const photoIds = await Promise.all(photos.map(async (photo) => {
      return new Promise<Schema.Types.ObjectId>(async (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'photobook-9mo4' }, async (error, result) => {
          if (error) {
            console.error("Photo upload error", error);
            reject(error);
          }
          if (result) {
            try {
              const newPhoto = new Photo({
                albumId,
                filename: result.display_name,
                type: result.resource_type,
                url: result.secure_url,
                format: result.format,
                comments: [],
                createdAt: new Date(result.created_at),
                updatedAt: new Date(result.created_at)
              });
              const savedPhoto = await newPhoto.save();
              resolve(savedPhoto._id);
            } catch (saveError) {
              reject(saveError);
            }
          } else {
            reject(new Error("Upload failed, result is undefined"));
          }
        });
        const nodeStream = await blobToStream(photo);
        nodeStream.pipe(uploadStream);
      });
    }));
    console.log("Photos uploaded and saved to Photo collection", photoIds);

    // Step 3: Update the album with the list of photo IDs
    savedAlbum.photos = photoIds;
    await savedAlbum.save();
    console.log("Album updated with photos", savedAlbum);

    return NextResponse.json({ savedAlbum }, { status: 200 });
  } catch (error) {
    console.error("Error creating album", error);
    return NextResponse.json({ message: "Error creating album", error }, { status: 500 });
  }
}