"use client";

import { useState, useEffect } from 'react';
import { IComment } from '@/interfaces';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

interface ICommentItemProps {
  comment: IComment;
}

const CommentItem = ({ comment }: ICommentItemProps) => {
  const [currentComment, setCurrentComment] = useState(comment);

  useEffect(() => {
    setCurrentComment(comment);
  }, [comment]);

  const voteComment = async (isUpvote: boolean) => {
    if (!currentComment || !currentComment._id) {
      console.error("Comment ID is missing");
      return;
    }
    
    try {
      const res = await fetch(`/api/comments/${currentComment._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote: currentComment.vote + (isUpvote ? 1 : -1) }),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${isUpvote ? 'upvote' : 'downvote'} a comment`);
      }

      const { updatedComment } = await res.json();
      setCurrentComment(updatedComment);
    } catch (error) {
      console.error(`Error ${isUpvote ? 'upvoting' : 'downvoting'} a comment`, error);
    }
  };

  return (
    <div className="
      max-w-full mb-4 p-4 grid grid-cols-6 items-start
      shadow-md rounded-lg bg-white
      hover:shadow-lg transition-shadow duration-300
    ">
      {/* comment text */}
      <div className="col-span-5 w-full flex flex-col pr-4">
        <p className="font-semibold text-lg text-gray-800">{currentComment.username}</p>
        <p className="break-words max-w-64 text-gray-600">{currentComment.text}</p>
      </div>

      {/* votes */}
      <div className="col-span-1 flex flex-col gap-3 items-center">
        <div onClick={() => voteComment(true)}
          className="text-blue-500 text-sm cursor-pointer hover:text-blue-700 transition-colors duration-300"
        >
          <FaRegThumbsUp />
        </div>

        <div className="flex items-center justify-center border text-gray-800 rounded-full w-8 h-8 text-sm">
          {currentComment.vote}
        </div>

        <div onClick={() => voteComment(false)}
          className="text-red-500 text-sm cursor-pointer hover:text-red-700 transition-colors duration-300"
        >
          <FaRegThumbsDown />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;