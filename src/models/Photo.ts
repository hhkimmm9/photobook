import { Schema, model, models } from "mongoose"
import { IPhoto } from "@/interfaces"
import Comment from "./Comment"

const photoSchema = new Schema<IPhoto>({
  filename: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  format: { type: String, required: true },
  comments: [{
    type: Comment.schema,
    required: true
  }],
  createdAt: { type: Date, default: Date.now },
})

const Photo = models.Photo || model<IPhoto>("Photo", photoSchema)

export default Photo