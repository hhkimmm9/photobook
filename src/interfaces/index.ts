// import { Schema, Document } from "mongoose"
import { Document } from "mongoose"

// export interface IComment extends Document {
export interface IComment {
  _id: string
  username: string
  // albumId: Schema.Types.ObjectId
  albumId: string
  comment: string
  password: string
  // createdAt: Date
  // updatedAt: Date
  createdAt: string
  updatedAt: string
}
// export interface IAlbum extends Document{
export interface IAlbum{
  _id: string
  title: string
  // date: Date
  date: string
  thumbnailImage: string
  description: string
  // photos: Schema.Types.ObjectId[]
  photos: {
    _id: string
    filename: string
    type: string
    uploadedDate: string
  }[]
  path: string
  // createdAt: Date
  // updatedAt: Date
  createdAt: string
  updatedAt: string
}
export interface IPhoto extends Document {
  _id: string
  
}
