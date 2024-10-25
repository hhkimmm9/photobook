import { Schema, model } from "mongoose"
import { IAlbum } from "@/interfaces"

const albumSchema = new Schema<IAlbum>({
  // title: { type: String, required: true },
  // date: { type: Date, default: Date.now },
  // thumbnailImage: { type: String },
  // description: { type: String },
  // photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }],
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now }
});

const Album = model<IAlbum>("Album", albumSchema);

export default Album;