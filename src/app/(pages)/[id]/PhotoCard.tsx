import { IPhoto } from '@/interfaces'
import { CldImage } from 'next-cloudinary'
import CommentContainer from "@/app/(pages)/[id]/(comments)/CommentContainer"

interface PhotoCardProps {
  photo: IPhoto;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  return (
    <div className="p-4 shadow-xl bg-stone-50">
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
        <div className="absolute bottom-6 left-6 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          Click to enlarge
        </div>
      </div>

      <CommentContainer />
    </div>
  )
}

export default PhotoCard