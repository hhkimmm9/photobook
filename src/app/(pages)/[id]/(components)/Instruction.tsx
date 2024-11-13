"use client"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaCoffee } from "react-icons/fa"
import { HiEnvelope } from "react-icons/hi2"

const Instruction = ({ albumTitle }: { albumTitle: string | undefined }) => {
  const notify = () => toast("Woohoo! You liked this album! Now, how about treating me to a coffee? ☕️", {
    autoClose: false,
    closeOnClick: true
  });

  const sendCopyRequest = () => {
    window.location.href = `
      mailto:harrisonkim911@gmail.com?
      subject=Request for a copy of ${albumTitle}&
      body=I love this album!: ${window.location.href}
    `
    notify()
  }

  return (
    <>
      <div className="mt-6 grid justify-items-center space-y-4">
        <p className="text-lg">Swipe to see more photos</p>
      </div>

      <div className='mt-4 flex justify-center'>
        <div className="w-min flex gap-2">
          {/* request a copy */}
          <button
            type="button"
            onClick={() => sendCopyRequest()}
            className="w-full p-2 bg-stone-500 text-white rounded-full font-medium"
          >
            <HiEnvelope className="text-xl" />
          </button>

          {/* buy me a coffee */}
          <button
            type="button"
            onClick={() => window.open("https://www.paypal.me/harrisonkim911/2", "_blank")}
            className="w-full p-2 bg-stone-500 text-white rounded-full font-medium"
          >
            <FaCoffee className="w-5" />
          </button>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={false}
        closeOnClick
      />
    </>
  )
}

export default Instruction