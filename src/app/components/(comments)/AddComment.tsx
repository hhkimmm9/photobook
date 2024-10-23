"use client"

import { useState } from "react"

interface IAddCommentProps {
  hideAddComment: () => void;
}

const AddComment = ({ hideAddComment }: IAddCommentProps) => {
  const [formState, setFormState] = useState({
    writer: "",
    comment: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  }

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { writer, comment, password } = formState;

    if (!writer || !comment || !password) {
      // notifyInvalidComment()
      return
    }

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ writer, comment, password })
      })
  
      if (res.ok) {
        setFormState({ writer: '', comment: '', password: '' })
        // notifyCommentAdded()
      } else {
        // 
      }
    } catch (err: unknown) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={(e) => addComment(e)}>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3 flex flex-col">
          <input type="text" placeholder="Your name?"
            value={formState.writer} onChange={handleChange}
            className="
              p-2
              border-b border-dashed outline-none
          "/>
        </div>
        <div className="col-span-2 flex flex-col">
          <input type="password" placeholder="password?"
            value={formState.password} onChange={handleChange}
            className="
              p-2
              border-b border-dashed outline-none
          "/>
        </div>
      </div>
      
      <div className="mt-5 flex flex-col gap-2">
        <textarea name="content" value={formState.comment}
          onChange={handleChange}
          className="
            w-full h-28 p-2 rounded-md
            border
            outline-none resize-none overflow-auto
          "
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button onClick={() => hideAddComment()} className="
          py-3 rounded-md
          border border-dashed
        "> Actually, nvm </button>
        <button type="submit" className="
          py-3 rounded-md
          border border-dashed
        "> Add </button>
      </div>
    </form>
  )
}

export default AddComment