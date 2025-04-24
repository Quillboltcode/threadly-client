import React from "react";
import { FaRegCalendarAlt, FaRegImage, FaRegFileAlt, FaRegSmile } from "react-icons/fa";
import { Post } from "../types/post";

interface CommentBoxProps {
    post: Post;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    onClose:() => void;
}

const CommentBox: React.FC<CommentBoxProps> = ( { post, onChange, onSubmit, onClose }) => {
  const avatarsrc = post.author.avatar.startsWith('/uploads/')
  ? `${import.meta.env.VITE_APP_UPLOAD}${post.author.avatar}`
  : post.author.avatar || '/assets/default-avatar.png';

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
    e.stopPropagation();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md backdrop-filter bg-opacity-40 z-50" onClick={handleOutsideClick}>
    <div className="max-w-md w-full bg-[#1E1F22] text-white rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between text-sm text-blue-400 font-semibold">
        <button onClick={onClose}
        className="hover:underline">Cancel</button>
        <button onClick={onSubmit}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-full text-white text-sm">
          Reply
        </button>
      </div>

      {/* User Info + Message */}
      <div className="flex items-start gap-3">
        <img
          src={avatarsrc}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-white">{post.author.username}</span>
          <p className="text-gray-300 mt-1">
            {post.content}
          </p>
        </div>
      </div>

      {/* Reply Input */}
      <div className="relative">
        <textarea
          placeholder="Write your reply"
          className="w-full bg-[#2C2F33] border-none text-white placeholder-gray-400 focus:ring-0 focus:outline-none resize-none rounded-lg px-3 py-2 pr-10"
          rows={3}
          onChange={onChange}
        />
        <FaRegCalendarAlt className="absolute bottom-3 left-3 text-gray-400 w-5 h-5" />
      </div>

      {/* Footer Icons */}
      <div className="flex items-center justify-between text-gray-400">
        <div className="flex items-center gap-3">
          <FaRegImage className="w-5 h-5 cursor-pointer" />
          <FaRegFileAlt className="w-5 h-5 cursor-pointer" />
          <FaRegSmile className="w-5 h-5 cursor-pointer" />
        </div>
        <span className="text-sm text-gray-500">English</span>
      </div>
    </div>
  </div>
  );
};

export default CommentBox;
