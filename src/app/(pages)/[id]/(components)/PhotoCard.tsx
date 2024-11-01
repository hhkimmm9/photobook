import { IPhoto, IComment } from "@/interfaces"
import { CldImage } from "next-cloudinary"

interface PhotoCardProps {
  photo: IPhoto
  topComment: IComment
}

const PhotoCard = ({ photo, topComment }: PhotoCardProps) => {
  return (
    <div className="p-4 shadow-xl bg-stone-50">
      {/* photos */}
      <div className="relative">
        <CldImage 
          src={`/photobook-9mo4/${photo.filename}`}
          alt={`photo-${photo._id}`}
          width="420" height="420"
          crop={{ type: "auto", source: true }}
          className="w-full h-auto shadow-lg cursor-pointer"
          onClick={() => {
            const img = new window.Image()
            img.src = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1/photobook-9mo4/${photo.filename}`
            img.style.maxWidth = "95vw"
            img.style.maxHeight = "95vh"
            const viewer = window.open("", "_blank")
            viewer?.document.write(img.outerHTML)
            viewer?.document.close()
          }}
        />
        <div className="
          absolute bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded
          bottom-2 left-2
        ">
          Click to enlarge
        </div>
      </div>
      <div className="min-h-24">
        {topComment?.text}
      </div>
    </div>
  )
}

export default PhotoCard