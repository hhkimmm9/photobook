"use client"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import 'swiper/css'

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

import Link from "next/link"
import PasswordForm from '@/app/(components)/PasswordForm';
import PhotoCard from "./(components)/PhotoCard"
import CommentContainer from "./(components)/CommentContainer"
import { FaCoffee } from "react-icons/fa"
import {
  HiArrowsRightLeft,
  HiChevronLeft,
  HiEnvelope
} from "react-icons/hi2"

import { IAlbum, IPhoto } from "@/interfaces"

const Page = () => {
  const params = useParams()

  const notify = () => toast("Woohoo! You liked this album! Now, how about treating me to a coffee? ☕️", {
    autoClose: false,
    closeOnClick: true
  });

  const [state, setState] = useState({
    hasAccess: false,
    showPhoto: true
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

    fetchAlbumAndPhotos()
  }, [params.id])

  const sendCopyRequest = () => {
    window.location.href = `
      mailto:harrisonkim911@gmail.com?
      subject=Request for a copy of ${album?.title}&
      body=I love this album!: ${window.location.href}
    `

    notify()
  }

  return !state.hasAccess ?
    <PasswordForm
      hasAccess={() => setState({ ...state, hasAccess: true })}
      albumId={album?._id}
    />
  : (
    <>
      <>
        <Link href="/" className='flex justify-start mb-4'>
          <HiChevronLeft className="text-xl transition-transform duration-200 hover:scale-150" />
        </Link>

        {/* Album title and date */}
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl text-gray-800">{album?.title}</h1>
          <p className="text-sm text-gray-500">{new Date(album?.date ?? "").toDateString()}</p>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => {setState({ ...state, showPhoto: true })}}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {photos?.map((photo, index) => (
            <SwiperSlide key={index}>
              { state.showPhoto ? (
                <PhotoCard
                  photo={photo}
                  showPhoto={() => setState({ ...state, showPhoto: !state.showPhoto})}
                />
              ) : (
                <CommentContainer
                  photoId={photo._id}
                  showPhoto={() => setState({ ...state, showPhoto: !state.showPhoto})}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="shake mt-4 grid justify-items-center space-y-4">
          <HiArrowsRightLeft className="text-2xl" />
          <p className="text-lg">Swipe to see more photos</p>
        </div>

        <div className='mt-4 flex justify-center'>
          <div className="w-min flex gap-2">
            <button type="button" onClick={() => sendCopyRequest()}
              className="
                w-full p-2 bg-stone-500 text-white rounded-full font-medium
            ">
            <HiEnvelope className="text-xl" />
            </button>

            <button type="button" onClick={() => window.open("https://www.paypal.me/harrisonkim911/2", "_blank")}
              className="w-full p-2 bg-stone-500 text-white rounded-full font-medium"
            >
              <FaCoffee className="w-5" />
            </button>
          </div>
        </div>
      </>

      <ToastContainer
        position="bottom-center"
        autoClose={false}
        closeOnClick
      />
    </>
  )
}

export default Page
