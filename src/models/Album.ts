import { Schema, model, models } from "mongoose"
import { IAlbum } from "@/interfaces"
import Photo from "./Photo"

const albumSchema = new Schema<IAlbum>({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  thumbnailImage: { type: String },
  description: { type: String },
  password: { type: String },
  path: { type: String, required: true },
  photos: [{ 
    type: Photo.schema, 
    required: true 
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Album = models.Album || model<IAlbum>("Album", albumSchema);

export default Album;