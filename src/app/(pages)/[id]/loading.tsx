"use client"

import { useEffect, useState } from "react"

const RotatePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < window.innerHeight) {
        setShowPrompt(true)
      } else {
        setShowPrompt(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial check

    const loadingTimeout = setTimeout(() => {
      setLoading(false)
    }, 3000) // 3 seconds delay

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(loadingTimeout)
    }
  }, [])

  return (
    !loading && showPrompt && (
      <div className="rotate-prompt">
        <div className="rotate-prompt-content">
          <p>For a better experience, please rotate your device to landscape mode</p>
        </div>
      </div>
    )
  )
}

export default RotatePrompt
