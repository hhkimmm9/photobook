import { Schema, model, models } from "mongoose"
import { IComment } from "@/interfaces"

const commentSchema = new Schema<IComment>({
  photoId: { type: Schema.Types.String, ref: "Photo", required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Comment = models.Comment || model<IComment>("Comment", commentSchema)

export default Comment