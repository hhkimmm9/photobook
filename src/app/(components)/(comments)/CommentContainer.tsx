"use client"

import { useState, useEffect } from 'react'
import { IComment } from "@/interfaces"
import Comment from "@/app/(components)/(comments)/Comment"
import AddComment from "@/app/(components)/(comments)/AddComment"

const CommentContainer = () => {
  const [showAddComment, setShowAddComment] = useState(false)
  const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    if (showAddComment) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    }
  }, [showAddComment])

  useEffect(() => {
    const readComment = async () => {
      try {
        const res = await fetch("/api/comments?albumId=1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
  
        const { comments } = await res.json()
        setComments(comments)
      } catch (err) {
        console.error(err)
      }
    }
    readComment()
  }, [])

  const renderAddCommentButton = () => (
    <button onClick={() => setShowAddComment(true)}
      className="
        px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg transform transition-transform hover:scale-105
    "> Share your thoughts&nbsp;😎 </button>
  )

  return (
    <div className="w-full grid justify-items-center">
      <div className="
        grid justify-items-center
        max-w-md w-full mt-6 md:mt-10 p-5 space-y-6
        rounded-xl bg-white shadow-lg
        transform transition-transform
      ">
        {comments.length === 0 ? (
          <>
          { !showAddComment ? (
            <>
            <p className="mt-6 text-center text-gray-600">
              Be the first to leave a comment&nbsp;💬
            </p>
            { renderAddCommentButton() }
            </>
          ) : (
            <AddComment hideAddComment={() => setShowAddComment(false)} />
          )}
          </>
        ) : (
          <>
          <p className="text-lg font-semibold text-gray-700">Here&apos;s what others are saying...</p>
          { comments.map((comment: IComment) => (
            <div key={comment._id} className="space-y-3">
            <Comment comment={comment} />
            </div>
          ))}

          <hr className="w-full border-gray-300" />

          { !showAddComment ? (
            <div className="flex gap-3 justify-between items-center">
            <p className="text-gray-600">Want to add your thoughts?</p>
            <button onClick={() => setShowAddComment(true)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 whitespace-nowrap hover:bg-gray-100 transform transition-transform hover:scale-105"
            > Absolutely&nbsp;&nbsp;😎 </button>
            </div>
          ) : (
            <AddComment hideAddComment={() => setShowAddComment(false)} />
          )}
          </>
        )}
      </div>
    </div>
  )
}

export default CommentContainer
