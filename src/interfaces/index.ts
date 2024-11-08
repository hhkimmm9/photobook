import { Schema, Document } from "mongoose"

export interface IAlbum extends Document {
  _id: string
  title: string
  date: Date
  thumbnailImage: string
  description: string
  password: string
  path: string
  photos: Schema.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}
export interface IPhoto extends Document {
  _id: string
  albumId: string
  filename: string
  type: string
  url: string
  format: string
  createdAt: Date
  updatedAt: Date
}
export interface IComment extends Document {
  _id: string
  photoId: Schema.Types.ObjectId
  username: string
  text: string
  password: string
  vote: number
  createdAt: Date
  updatedAt: Date
}