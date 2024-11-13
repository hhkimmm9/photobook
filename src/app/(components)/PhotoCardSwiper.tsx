"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"

import PhotoCard from "@/app/(pages)/[id]/(components)/PhotoCard"
import { IPhoto } from "@/interfaces"

interface PhotoCardSwiperProps {
  albumId: string | undefined
}

const PhotoCardSwiper = ({ albumId }: PhotoCardSwiperProps) => {
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(`/api/photos?albumId=${albumId}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        })

        if (!res.ok) {
          console.error("Error fetching photos")
          return
        }

        const { photos }: { photos: IPhoto[] } = await res.json()
        setPhotos(photos)
      } catch (error) {
        console.error("Error fetching photos", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [albumId])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => {}}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {photos.map((photo, index) => (
        <SwiperSlide key={index}>
          <PhotoCard photo={photo} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default PhotoCardSwiper