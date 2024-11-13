"use client"

import { useState } from "react"

const WARNING_MESSAGE_MISSING_INPUTS = "Please enter a username and password"
const WARNING_MESSAGE_TEXT_LENGTH_LIMIT = "Comment must be less than 128 characters"

const AddCommentForm = ({ photoId, setShowForm }: { photoId: string, setShowForm: () => void }) => {
  const [formData, setFormData] = useState({ text: "", username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [warningMessage, setWarningMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setWarningMessage(null)

    if (!formData.username || !formData.password) {
      setWarningMessage(WARNING_MESSAGE_MISSING_INPUTS)
      setLoading(false)
      return
    }

    if (formData.text.length > 128) {
      setWarningMessage(WARNING_MESSAGE_TEXT_LENGTH_LIMIT)
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`/api/comments?photoId=${photoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        throw new Error("Failed to post comment")
      }

      // const { createdComment } = await res.json()
      // console.log(createdComment)
      setShowForm()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to post comment")
      console.error(error)
    } finally {
      setLoading(false)
      setFormData({ text: "", username: "", password: "" })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full h-[29rem] flex flex-col justify-between bg-white">
      <div className="p-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="bg-stone-50 border rounded-lg p-2 w-full outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-stone-50 border rounded-lg p-2 w-full outline-none"
          />
        </div>
        
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          className="bg-stone-50 border rounded-lg p-2 w-full outline-none h-72"
        />

        <div className="flex justify-between items-center">
          <p className="text-red-500 text-sm ml-1 truncate">{warningMessage}</p>
          <p className={formData.text.length > 128 ? "text-red-500" : ""}>
            {formData.text.length}/128
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <button
          type="button"
          onClick={() => setShowForm()}
          className="py-2 font-semibold text-gray-700 bg-white  hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="py-2 font-semibold text-white bg-stone-500 hover:bg-stone-600"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}

export default AddCommentForm