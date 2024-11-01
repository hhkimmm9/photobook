"use client"

import { IComment } from "@/interfaces"

interface ICommentContainerProps {
  comments: IComment[]
  flipCard: () => void
}

const CommentContainer = ({ comments, flipCard }: ICommentContainerProps ) => {
  return (
    <div className="min-h-24">
      {comments.map(comment => (
        <div key={comment._id} className="flex gap-2">
          <div className="text-xs font-medium">{comment.username}</div>
          <div className="text-xs">{comment.text}</div>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button onClick={flipCard} className="text-xs text-gray-500 hover:text-gray-700">
          {comments.length ? "Hide" : "Show"} comments
        </button>
      </div>
    </div>
  )
}

export default CommentContainer
