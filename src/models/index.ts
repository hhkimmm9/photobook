import { Schema, model, models } from "mongoose";
import { IAlbum, IPhoto, IComment } from "@/interfaces";

const commonSchemaFields = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

const commentSchema = new Schema<IComment>({
  photoId: { type: Schema.Types.String, ref: "Photo", required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  password: { type: String, required: true },
  vote: { type: Number, default: 0 },
  ...commonSchemaFields,
});

const photoSchema = new Schema<IPhoto>({
  albumId: { type: String, required: true },
  filename: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  format: { type: String, required: true },
  comments: [{
    type: commentSchema,
    required: true
  }],
  ...commonSchemaFields,
});

const albumSchema = new Schema<IAlbum>({
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
  ...commonSchemaFields,
});

export const Comment = models.Comment || model<IComment>("Comment", commentSchema);
export const Photo = models.Photo || model<IPhoto>("Photo", photoSchema);
export const Album = models.Album || model<IAlbum>("Album", albumSchema);