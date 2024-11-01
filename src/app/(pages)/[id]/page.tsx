"use client"

import { useParams } from "next/navigation"
import { useState, useEffect, FormEvent } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import 'swiper/css'
import PhotoCard from "./(components)/PhotoCard"
import CommentContainer from "./(components)/CommentContainer"
import { IAlbum, IPhoto } from "@/interfaces"

const ITS_OKAY_TO_BE_EXPOSED = "cheese"

const Page = () => {
  const params = useParams()

  const [state, setState] = useState({
    hasAccess: true,
    pwd: "",
    warningMessage: ""
  })
  const [album, setAlbum] = useState<IAlbum>()
  const [photos, setPhotos] = useState<IPhoto[]>()

  useEffect(() => {
    const fetchAlbumAndPhotos = async () => {
      try {
        const [albumResponse, photosResponse] = await Promise.all([
          fetch(`/api/albums/${params.id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
          }),
          fetch(`/api/photos?albumId=${params.id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
          })
        ])

        const { album } = await albumResponse.json()
        const { photos } = await photosResponse.json()

        setAlbum(album)
        setPhotos(photos)
      } catch (error) {
        console.error("Error fetching album or photos", error)
      }
    }

    if (state.hasAccess) fetchAlbumAndPhotos()
  }, [params.id, state.hasAccess])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.pwd === ITS_OKAY_TO_BE_EXPOSED) {
      setState({ ...state, hasAccess: true })
    } else {
      setState({ ...state, pwd: "", warningMessage: "Incorrect password" })
    }
  }

  return !state.hasAccess ? (
    // Password form
    <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
      <form onSubmit={handleSubmit} className="w-64 flex flex-col gap-4 items-center justify-center">
        <input
          type="password"
          value={state.pwd}
          placeholder="Password"
          onChange={e => setState({ ...state, pwd: e.target.value, warningMessage: "" })}
          className="w-full p-2 border border-gray-300 rounded-md outline-none border-none"
        />
        <button type="submit" className="w-full p-2 bg-stone-500 text-white rounded-md font-medium">
          Submit
        </button>
        <div className="h-4 mt-2 px-1 text-sm text-red-600">{state.warningMessage}</div>
      </form>
    </div>
  ) : (
    <div className="pb-8">
      {/* Album title and date */}
      <div className="text-center mb-8">
        <h1 className="font-bold text-2xl text-gray-800">{album?.title}</h1>
        <p className="text-sm text-gray-500">{new Date(album?.date ?? "").toDateString()}</p>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {photos?.map((photo, index) => (
          <SwiperSlide key={index}>
            { 1 ? (
              <PhotoCard photo={photo} topComment={photo.comments[0]} />
            ) : (
              <CommentContainer comments={photo.comments} flipCard={() => {}} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Page
