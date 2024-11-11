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
    <form onSubmit={handleSubmit} className="grid grid-rows-8 gap-4 w-full p-3">
      <div className="row-span-1 grid grid-cols-2 gap-2">
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
        className="row-span-5 bg-stone-50 border rounded-lg p-2 w-full outline-none"
      />

      <div className="row-span-1 flex justify-between items-center">
        <p className="text-red-500 text-sm ml-1">{warningMessage}</p>
        <p className={formData.text.length > 128 ? 'text-red-500' : ''}>
          {formData.text.length}/128
        </p>
      </div>

      <div className="row-span-1 grid grid-cols-2 gap-2">
        <button type="button"
          onClick={() => setShowForm()}
          className="border rounded-lg py-2 font-semibold text-gray-700 hover:bg-gray-200"
        >Cancel</button>

        <button type="submit" disabled={loading}
          className="bg-stone-500 text-white rounded-lg py-2 font-semibold hover:bg-stone-600"
        >{loading ? "Posting..." : "Post"}</button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}

export default AddCommentForm