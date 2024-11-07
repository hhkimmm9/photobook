import { IComment } from '@/interfaces'
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa"

interface ICommentItemProps {
  comment: IComment
}

const CommentItem = ({ comment }: ICommentItemProps) => {
  const upvoteComment = async () => {
    console.log('up')
  }

  const downvoteComment = async () => {
    console.log('down')
  }

  return (
    <div key={comment._id} className="max-w-full p-4 grid grid-cols-6 items-start bg-white shadow-md rounded-lg mb-4 hover:shadow-lg transition-shadow duration-300">
      {/* comment text */}
      <div className="col-span-5 w-full flex flex-col pr-4">
        <p className="font-semibold text-lg text-gray-800">{comment.username}</p>
        <p className="break-words max-w-64 text-gray-600">{comment.text}</p>
      </div>

      {/* votes */}
      <div className='col-span-1 flex flex-col gap-3 items-center'>
        <div className='text-blue-500 text-sm cursor-pointer hover:text-blue-700 transition-colors duration-300' onClick={() => upvoteComment()}>
          <FaRegThumbsUp />
        </div>

        <div className="flex items-center justify-center border text-gray-800 rounded-full w-8 h-8 text-sm">
          {comment.vote}
        </div>
        
        <div className='text-red-500 text-sm cursor-pointer hover:text-red-700 transition-colors duration-300' onClick={() => downvoteComment()}>
          <FaRegThumbsDown />
        </div>
      </div>
    </div>
  )
}

export default CommentItem