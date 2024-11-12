"use client"

import { useState, useEffect } from "react"
import { CldImage } from "next-cloudinary"
import { HiChatBubbleBottomCenterText } from "react-icons/hi2"
import { IPhoto, IComment } from "@/interfaces"

interface PhotoCardProps {
  photo: IPhoto
  showPhoto: () => void
}

const PhotoCard = ({ photo, showPhoto }: PhotoCardProps) => {
  const [state, setState] = useState({
    comments: null as IComment[] | null
  })

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?photoId=${photo._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        const { comments } = await res.json()
        setState({ comments })
      } catch (error) {
        console.error("Error fetching comments", error)
      }
    }

    fetchComments()
  }, [photo._id])

  const getTopComment = (comments: IComment[]): IComment | null => {
    return comments.length ? comments.reduce((topComment, currentComment) => 
      currentComment.vote > topComment.vote ? currentComment : topComment
    ) : null;
  };

  const handleImageClick = (filename: string) => {
    const img = new window.Image();
    img.src = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1/photobook-9mo4/${filename}`;
    img.style.maxWidth = "95vw";
    img.style.maxHeight = "95vh";
    const viewer = window.open("", "_blank");
    viewer?.document.write(img.outerHTML);
    viewer?.document.close();
  };

  const topComment = getTopComment(state.comments ?? []);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* photo and top comment */}
      <div className="h-full p-4 flex flex-col bg-stone-50">
        {/* photos */}
        <div className="relative">
          <CldImage 
            src={`/photobook-9mo4/${photo.filename}`}
            alt={`photo-${photo._id}`}
            width="420" height="480"  // Adjusted height to maintain 7:8 aspect ratio
            crop={{ type: "auto", source: true }}
            className="w-full h-auto cursor-pointer"
            onClick={() => handleImageClick(photo.filename)}
          />
          <div className="
            absolute bottom-2 left-2 bg-black bg-opacity-50
            px-2 py-1 rounded text-xs text-white cursor-pointer
          ">
            Click to enlarge
          </div>
        </div>

        {/* top comment */} 
        <div className="flex-grow mt-4">
          <div className="h-full py-8 flex justify-center items-center text-2xl}" style={{ fontFamily: "'Dancing Script', cursive" }}>
            {topComment?.text ?? "No comments available yet"}
          </div>
        </div>
      </div>

      {/* actions icons */}
      <div className="mx-2 flex justify-end">
        <div className="flex gap-2">
          {/* share */}
          {/* <button onClick={() => {}} className="
            w-full p-2 bg-stone-500 text-white rounded-full font-medium
          ">
            <ShareIcon className="size-5" />
          </button> */}
          
          {/* see comments */}
          <button onClick={showPhoto} className="
            w-full p-2 bg-stone-500 text-white rounded-full font-medium
          ">
            <HiChatBubbleBottomCenterText className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;