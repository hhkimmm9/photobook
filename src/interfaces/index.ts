export interface IAlbum {
  id: number
  name: string
  date: string
  thumbnailImage: string
  url: string
  images: {
    id: number
    name: string
    url: string
  }[]
}
export interface IComment {
  _id: string
  writer: string
  comment: string
  password: string
  createdAt: string
  updatedAt: string
}