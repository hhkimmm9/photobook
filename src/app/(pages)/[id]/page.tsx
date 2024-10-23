"use client"

import { IAlbum } from "@/interfaces"
import album_list from "@/app/json/album_list.json"
import { usePathname } from "next/navigation"
import { useState, useEffect, FormEvent } from "react"
import Image from "next/image"

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
    <div className="">
      <div>
        <h1 className="font-medium text-lg">{ state.album?.name }</h1>
        <p className="text-sm text-zinc-700">{ state.album?.date }</p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <Image 
          src={state.album?.thumbnailImage || "/images/default-thumbnail.png"} 
          alt="thumbnail" 
          width={256} 
          height={192} 
          className="w-full cursor-pointer"
          onClick={() => {
            const img = new window.Image()
            img.src = state.album?.thumbnailImage || "/default-thumbnail.jpg"
            const viewer = window.open("", "_blank")
            viewer?.document.write(img.outerHTML)
            viewer?.document.close()
          }}
        />
        <Image 
          src={state.album?.thumbnailImage || "/images/default-thumbnail.png"} 
          alt="thumbnail" 
          width={256} 
          height={192} 
          className="w-full cursor-pointer"
          onClick={() => {
            const img = new window.Image()
            img.src = state.album?.thumbnailImage || "/default-thumbnail.jpg"
            const viewer = window.open("", "_blank")
            viewer?.document.write(img.outerHTML)
            viewer?.document.close()
          }}
        />
        <Image 
          src={state.album?.thumbnailImage || "/images/default-thumbnail.png"} 
          alt="thumbnail" 
          width={256} 
          height={192} 
          className="w-full cursor-pointer"
          onClick={() => {
            const img = new window.Image()
            img.src = state.album?.thumbnailImage || "/default-thumbnail.jpg"
            const viewer = window.open("", "_blank")
            viewer?.document.write(img.outerHTML)
            viewer?.document.close()
          }}
        />
        <Image 
          src={state.album?.thumbnailImage || "/images/default-thumbnail.png"} 
          alt="thumbnail" 
          width={256} 
          height={192} 
          className="w-full cursor-pointer"
          onClick={() => {
            const img = new window.Image()
            img.src = state.album?.thumbnailImage || "/default-thumbnail.jpg"
            const viewer = window.open("", "_blank")
            viewer?.document.write(img.outerHTML)
            viewer?.document.close()
          }}
        />
      </div>
    </div>
  )
}

export default Page
