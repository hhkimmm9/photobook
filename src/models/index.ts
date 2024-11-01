import { Schema, model, models } from "mongoose"
import { IAlbum, IPhoto, IComment } from "@/interfaces"

export const Album = models.Album || model<IAlbum>(
  "Album", new Schema<IAlbum>({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    thumbnailImage: { type: String },
    description: { type: String },
    password: { type: String },
    path: { type: String, required: true },
    photos: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Photo",
      required: true 
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  })
)

export const Comment = models.Comment || model<IComment>(
  "Comment", new Schema<IComment>({
    photoId: { type: Schema.Types.String, ref: "Photo", required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  })
)

export const Photo = models.Photo || model<IPhoto>(
  "Photo", new Schema<IPhoto>({
    albumId: { type: String, required: true },
    filename: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    format: { type: String, required: true },
    comments: [{
      type: Comment.schema,
      required: true
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  })
)