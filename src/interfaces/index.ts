import { Schema, Document } from "mongoose"

export interface IComment extends Document {
  _id: string
  photoId: Schema.Types.ObjectId
  username: string
  text: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface IPhoto {
  filename: string
  type: string
  url: string
  format: string
  comments: IComment[]
  createdAt: Date
}

export interface IAlbum extends Document {
  _id: string
  title: string
  date: Date
  thumbnailImage: string
  description: string
  password: string
  path: string
  photos: IPhoto[]
  createdAt: Date
  updatedAt: Date
}
