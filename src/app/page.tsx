"use client"

import { IAlbum } from "@/interfaces"
import { CldImage } from 'next-cloudinary'
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Home() {
  const [albums, setAlbums] = useState<IAlbum[]>([])
  
  useEffect(() => {
    const fetchAlubms = async () => {
      try {
        const response = await fetch("/api/albums")
        const { albums } = await response.json()
        setAlbums(albums)
      } catch (error) {
        console.error("Error fetching albums", error)
      }
    }

    fetchAlubms()  
  }, [])
  
  return (
    <ul className="flex flex-col gap-6">
      { albums.map((album: IAlbum) => (
        <li key={album._id}>
          <Link href={album._id} scroll={false}>
            <CldImage
              src={album.thumbnailImage} alt="Thumbnail Image"
              width="420" height="480"
              crop={{
                type: "auto",
                source: true
              }}
              className="w-full p-3 bg-white"
            />
            <div className="p-2 pb-5 shadow-md bg-white text-center space-y-3" style={{ fontFamily: "'Dancing Script', cursive" }}>
              <h2 className="font-medium text-xl">{album.title}</h2>
              <p className="text-sm text-gray-700">
                {new Date(album.date).toDateString()}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
