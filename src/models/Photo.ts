import { Schema, model } from "mongoose"
import { IPhoto } from "@/interfaces"

const photoSchema = new Schema<IPhoto>({
  
})

const Photo = model<IPhoto>("Photo", photoSchema)

export default Photo