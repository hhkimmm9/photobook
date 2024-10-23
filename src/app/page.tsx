import { IAlbum } from "@/interfaces"
import album_list from "@/json/album_list.json"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <ul className="flex flex-col gap-6">
        { album_list.albums.map((album: IAlbum) => (
          <li key={album.id}>
            <Link href={album.url} scroll={false}>
              <Image src={album.thumbnailImage} alt="thumbnail"
                width={1182} height={665}
                className="w-full"
              />
              <div className="p-3 shadow-md bg-white">
                <h2 className="font-medium text-lg">{ album.name }</h2>
                <p className="mt-8 text-end text-sm text-zinc-700">
                  { album.date }
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
