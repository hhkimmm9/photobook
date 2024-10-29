"use client"

import { useEffect, useState, FormEvent } from "react"
import album_list from "@/json/album_list.json"
import { IAlbum } from "@/interfaces"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import 'swiper/css'
import { usePathname } from "next/navigation"
import PhotoCard from "./PhotoCard"

const ITS_OKAY_TO_BE_EXPOSED = "cheese"

const Page = () => {
  const pathname = usePathname()
  const [state, setState] = useState({
    hasAccess: true,
    album: null as IAlbum | null,
    pwd: "",
    warningMessage: ""
  })

  useEffect(() => {
    if (state.hasAccess) {
      album_list.albums.find(album => {
        if (album.path === pathname) {
          setState({ ...state, album })
        }
      })  
    }
  }, [state.hasAccess, pathname])

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
        <h1 className="font-bold text-2xl text-gray-800">{state.album?.title}</h1>
        <p className="text-sm text-gray-500">{state.album?.date}</p>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {state.album?.photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <PhotoCard photo={photo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Page
