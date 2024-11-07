"use client"

import { useState } from "react"
import CommentItem from "./CommentItem"
import AddCommentForm from "./AddCommentForm"
import { IComment } from "@/interfaces"

interface ICommentContainerProps {
  comments: IComment[]
  photoId: string
  showPhoto: () => void
}

const CommentContainer = ({ comments, photoId, showPhoto }: ICommentContainerProps ) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="grid grid-rows-[1fr_auto] gap-8 h-full bg-white rounded-lg">
      {!showForm ? (
        // comments
        <div className="w-full overflow-y-auto p-3">
          {comments.map(comment => <CommentItem key={comment._id} comment={comment} />)}
        </div>
      ) : (
        // form to add a comment
        <AddCommentForm photoId={photoId} setShowForm={() => setShowForm(prev => !prev)} />
      )}

      {!showForm && (
        // buttons: see photo & add a comment
        <div className="grid grid-cols-2 gap-2 p-3">
          <button type="button" onClick={() => showPhoto()}
            className="border rounded-lg py-2 font-semibold text-gray-700
          ">Flip</button>
          <button
            className="bg-blue-500 text-white rounded-lg py-2 font-semibold"
            onClick={() => setShowForm(prev => !prev)}
          >Add a comment</button>
        </div>
      )}
    </div>
  )
}

export default CommentContainer
