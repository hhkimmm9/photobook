import PasswordFormWrapper from "@/app/(components)/PasswordFormWrapper";
import PhotoCardSwiper from "@/app/(components)/PhotoCardSwiper";
import Instruction from './(components)/Instruction';

import { IAlbum } from "@/interfaces"

const fetchAlbum = async (albumId: string): Promise<IAlbum | null> => {
  const res = await fetch(`${process.env.BASE_URL}/api/albums/${albumId}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  })

  if (!res.ok) {
    console.error("Error fetching album")
    return null
  }
  const { album }: { album: IAlbum } = await res.json()

  return album
}
interface PageProps {
  params: { id: string }
}

const Page = async ({ params }: PageProps) => {
  const album = await fetchAlbum(params.id)

  if (!album) {
    return <div>Error loading album</div>;
  }

  return (
    <PasswordFormWrapper albumId={album._id}>
      <div className="mb-6 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>
        <h2 className="font-semibold text-3xl text-stone-900">{album.title}</h2>
        <p className="mt-3 text-sm text-stone-600">{new Date(album.date).toDateString()}</p>
      </div>

      <PhotoCardSwiper albumId={album._id} />

      <Instruction albumTitle={album.title} />
    </PasswordFormWrapper>
  )
}

export default Page
