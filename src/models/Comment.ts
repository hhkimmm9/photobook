import { Schema, model } from "mongoose"
import { IComment } from "@/interfaces"

const commentSchema = new Schema<IComment>({
  username: { type: String, required: true },
  // albumId: { type: Schema.Types.String, ref: "Album", required: true },
  albumId: { type: String, required: true },
  comment: { type: String, required: true },
  password: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now }
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true }
})

const Comment = model<IComment>("Comment", commentSchema)

export default Comment