"use client"

import { useState, useEffect, useCallback } from "react"
import CommentItem from "./CommentItem"
import AddCommentForm from "./AddCommentForm"
import { IComment } from "@/interfaces"

interface ICommentContainerProps {
  photoId: string
  toggleShowPhoto: () => void
}

const CommentContainer = ({ photoId, toggleShowPhoto }: ICommentContainerProps ) => {
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?photoId=${photoId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })

      if (!res.ok) {
        throw new Error("Failed to fetch comments")
      }

      const { comments } = await res.json()
      setComments(comments)
    } catch (error) {
      console.error("Error fetching comments", error)
    }
  }, [photoId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const toggleFormAndFetchComments = async () => {
    await fetchComments()
    setShowForm(prev => !prev)
  }

  return (
    <>
      {!showForm ? (
        <div className="h-[29rem]">
          <div className="h-full flex flex-col bg-white">
            <div className="flex justify-center items-center p-3 grow">
              {comments.length === 0 ? (
              <div className="text-center text-gray-500">
                You can be the first one to leave a comment on this lovely photo!
              </div>
              ) : (
              <div className="w-full overflow-y-auto space-y-4">
                {comments.map(comment => (
                  <CommentItem key={comment._id} comment={comment} />
                ))}
              </div>
              )}
            </div>
            
            <div className="grid grid-cols-2">
              <button
                type="button"
                onClick={toggleShowPhoto}
                className="py-2 font-semibold text-gray-700 bg-white  hover:bg-gray-200"
              >
                Flip
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="py-2 font-semibold text-white bg-stone-500 hover:bg-stone-600"
              >
                Add a comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AddCommentForm photoId={photoId} setShowForm={toggleFormAndFetchComments} />
      )}
    </>
  )
}

export default CommentContainer
