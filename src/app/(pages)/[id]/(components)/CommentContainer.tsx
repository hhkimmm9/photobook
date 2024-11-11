"use client"

import { useState, useEffect } from "react"
import CommentItem from "./CommentItem"
import AddCommentForm from "./AddCommentForm"
import { IComment } from "@/interfaces"

interface ICommentContainerProps {
  photoId: string
  showPhoto: () => void
}

const CommentContainer = ({ photoId, showPhoto }: ICommentContainerProps ) => {
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
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
    }

    fetchComments()
  }, [photoId])

  const hideFormThenFetchComments = async () => {
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
      setShowForm(prev => !prev)
    } catch (error) {
      console.error("Error fetching comments", error)
    }
  }

  return (
    <div className="grid grid-rows-[1fr_auto] gap-8 h-full bg-white rounded-lg">
      {!showForm ? (
        // comments
        <div className="w-full overflow-y-auto p-3">
          {comments.map(comment => <CommentItem key={comment._id} comment={comment} />)}
        </div>
      ) : (
        // form to add a comment
        <AddCommentForm photoId={photoId} setShowForm={hideFormThenFetchComments} />
      )}

      {!showForm && (
        // buttons: see photo & add a comment
        <div className="grid grid-cols-2 gap-2 p-3">
            <button type="button" onClick={() => showPhoto()}
            className="border rounded-lg py-2 font-semibold text-gray-700 hover:bg-gray-200"
            >Flip</button>
            <button
            className="bg-stone-500 text-white rounded-lg py-2 font-semibold hover:bg-stone-600"
            onClick={() => setShowForm(prev => !prev)}
            >Add a comment</button>
        </div>
      )}
    </div>
  )
}

export default CommentContainer
