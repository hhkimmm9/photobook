"use client"

import album_list from "@/json/album_list.json"
import { IAlbum } from "@/interfaces"
import { usePathname } from "next/navigation"
import { useState, useEffect, FormEvent } from "react"
import Image from "next/image"
import CommentContainer from "@/app/(components)/(comments)/CommentContainer"

const MASTER_PWD = "test123"

const Page = () => {
  const pathname = usePathname()
  const [state, setState] = useState({
    hasAccess: true,
    album: null as IAlbum | null,
    pwd: ""
  })

  useEffect(() => {
    if (state.hasAccess) {
      album_list.albums.find(album => {
        if (album.url === pathname) {
          setState({ ...state, album })
        }
      })  
    }
  }, [state.hasAccess])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.pwd === MASTER_PWD) {
      setState({ ...state, hasAccess: true })
    }
  }

  return !state.hasAccess ? (
    <div className="flex justify-center h-full">
      <form onSubmit={handleSubmit} className="w-64 flex flex-col gap-4 items-center justify-center">
        <input
          type="password"
          value={state.pwd}
          placeholder="Password"
          onChange={e => setState({ ...state, pwd: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md outline-none border-none"
        />
        <button type="submit" className="w-full p-2 bg-stone-500 text-white rounded-md font-medium">
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div className="pb-8">
      <div className="text-center mb-8">
        <h1 className="font-bold text-2xl text-gray-800">{state.album?.name}</h1>
        <p className="text-sm text-gray-500">{state.album?.date}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {state.album?.images.map((image, index) => (
          <div key={index} className="relative">
            <Image 
              src={image.url} alt={`image-${index}`} 
              width={256} height={192}
              className="w-full h-auto rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => {
                const img = new window.Image()
                img.src = image.url
                const viewer = window.open("", "_blank")
                viewer?.document.write(img.outerHTML)
                viewer?.document.close()
              }}
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              Click to enlarge
            </div>
          </div>
        ))}
      </div>

      <CommentContainer />
    </div>
  )
}

export default Page
