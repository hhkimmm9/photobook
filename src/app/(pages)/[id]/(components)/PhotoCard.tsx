"use client"

import { useEffect, useState, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { IPhoto, IComment } from "@/interfaces";
import CommentContainer from "@/app/(pages)/[id]/(components)/CommentContainer";

const NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "de6ndbmhd";

const fetchComments = async (photoId: string): Promise<IComment[]> => {
  try {
    const res = await fetch(`/api/comments?photoId=${photoId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Error fetching comments");
    }

    const { comments } = await res.json();
    return comments;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getTopComment = (comments: IComment[]): IComment | null => {
  return comments.length
    ? comments.reduce((topComment, currentComment) =>
        currentComment.vote > topComment.vote ? currentComment : topComment
      )
    : null;
};

const handleImageClick = (filename: string) => {
  const img = new window.Image();
  img.src = `https://res.cloudinary.com/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1/photobook-9mo4/${filename}`;
  img.style.maxWidth = "95vw";
  img.style.maxHeight = "95vh";
  const viewer = window.open("", "_blank");
  viewer?.document.write(img.outerHTML);
  viewer?.document.close();
};

interface PhotoCardProps {
  photo: IPhoto;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  const [flip, setFlip] = useState(false);
  const [topComment, setTopComment] = useState<IComment | null>(null);

  const loadComments = useCallback(async () => {
    const fetchedComments = await fetchComments(photo._id);
    setTopComment(getTopComment(fetchedComments));
  }, [photo._id]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return (
    <div className="h-[32rem]">
      { !flip ? (
        <div className="flex flex-col gap-3">
          <div className="p-4 flex flex-col bg-stone-50">
            {/* photos */}
            <div className="relative">
              <CldImage 
                src={`/photobook-9mo4/${photo.filename}`}
                alt={`photo-${photo._id}`}
                width="420" height="480"
                crop={{ type: "auto", source: true }}
                className="w-full h-auto cursor-pointer"
                onClick={() => handleImageClick(photo.filename)}
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs text-white cursor-pointer">
                Click to enlarge
              </div>
            </div>
            {/* top comment */}
            <div className="h-full pt-8 pb-4 flex justify-center items-center text-xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
              {topComment?.text ?? "No comments available yet"}
            </div>
          </div>

          {/* chat bubble */}
          <div className="mx-2 flex justify-end">
            <button
              onClick={() => setFlip(true)}
              className="p-2 rounded-full font-medium text-white bg-stone-500"
            >
              <HiChatBubbleBottomCenterText className="text-xl" />
            </button>
          </div>
        </div>
      ) : (
        <CommentContainer photoId={photo._id} toggleShowPhoto={() => setFlip(false)} />
      )}
    </div>
  )
};

export default PhotoCard;
