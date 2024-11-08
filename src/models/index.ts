import { Schema, model, models } from "mongoose";
import { IAlbum, IPhoto, IComment } from "@/interfaces";

// Common schema fields
const commonSchemaFields = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

// Comment Schema
const commentSchema = new Schema<IComment>({
  photoId: { type: Schema.Types.String, ref: "Photo", required: true, index: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  password: { type: String, required: true },
  vote: { type: Number, default: 0 },
  ...commonSchemaFields,
});

commentSchema.methods.incrementVote = function() {
  this.vote += 1;
  return this.save();
};

commentSchema.statics.findByPhotoId = function(photoId) {
  return this.find({ photoId });
};

// Photo Schema
const photoSchema = new Schema<IPhoto>({
  albumId: { type: String, required: true, index: true },
  filename: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  format: { type: String, required: true },
  ...commonSchemaFields,
});

// Album Schema
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

// Export models
export const Comment = models.Comment || model<IComment>("Comment", commentSchema);
export const Photo = models.Photo || model<IPhoto>("Photo", photoSchema);
export const Album = models.Album || model<IAlbum>("Album", albumSchema);