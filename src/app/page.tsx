"use client"

import { IAlbum } from "@/interfaces"
import album_list from "@/json/album_list.json"
import { CldImage } from 'next-cloudinary'
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <ul className="flex flex-col gap-6">
        { album_list.albums.map((album: IAlbum) => (
          <li key={album._id}>
            <Link href={album.path} scroll={false}>
              <CldImage
                src={`/photobook-9mo4/${album.thumbnailImage}`} alt="Thumbnail Image"
                width="420" height="420"
                crop={{
                  type: "auto",
                  source: true
                }}
                className="w-full"
              />
              <div className="p-3 shadow-md bg-white">
                <h2 className="font-medium text-lg">{album.title}</h2>
                <p className="mt-8 text-end text-sm text-zinc-700">
                  {album.date}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
