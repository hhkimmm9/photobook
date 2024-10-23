import { IComment } from "@/interfaces"
import { timeSince } from "@/utils/functions"
import { useState } from "react"
import { FaRegTrashCan, FaCheck, FaXmark } from "react-icons/fa6"

type TCommentProps = {
  comment: IComment
}

const Comment = ({ comment } : TCommentProps) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")

  const handleDelete = async (
    e: React.FormEvent<HTMLFormElement>,
    password: string
  ) => {
    e.preventDefault()

    if (passwordInput.length === 0) {
      const inputTag = document.getElementById("passwordInputTag")
      if (inputTag) inputTag.focus()
      return
    }

    if (password !== passwordInput) {
      setPasswordInput("")
      return
    }

    try {
      await fetch(`/api/comments/${comment._id}`, {
        method: "DELETE",
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="
      p-3 py-2 rounded-lg
      border border-dashed border-lime-400
    ">
      {/* first row */}
      <div className="flex items-center justify-between whitespace-nowrap">
        <span className="text-lime-400">{ comment.writer }</span>
        <span className="text-sm text-zinc-500">
          { timeSince(new Date(comment.createdAt).valueOf()) } ago
        </span>
      </div>

      {/* second row */}
      <p className="text-lime-400">{ comment.comment }</p>

      {/* third row */}
      <div className="h-8 mb-1">
        {/* first row - right */}
        { showPasswordInput ? (
          <>
            <form
              onSubmit={(e) => handleDelete(e, comment.password)}
              className="flex gap-4 justify-between items-center"
            >
              <input id="password" type="password" value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="
                  w-full p-2 bg-black
                  border-b border-dashed border-lime-400 outline-none
                  text-lime-400
              "/>

              <div className="flex gap-2 pt-2">
                {/* cancel button */}
                <FaXmark
                  onClick={() => setShowPasswordInput(false)}
                  className="text-lg text-lime-400 cursor-pointer"
                />

                {/* submit button */}
                <button type="submit">
                  <FaCheck
                    className="text-lg text-lime-400 cursor-pointer"
                  />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div onClick={() => {}} className="h-full flex justify-end items-center">
            <FaRegTrashCan onClick={() => setShowPasswordInput(true)}
              className="text-lime-400 cursor-pointer"  
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment