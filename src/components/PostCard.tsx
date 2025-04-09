import React from "react";
import { FaComment, FaHeart, FaRetweet } from "react-icons/fa";
import { Post } from "../types/post";
import { formatDistanceToNow } from 'date-fns';
const PostCard: React.FC<{ post: Post }> = ({ post }) => {
    // Format the createdAt timestamp to a relative time
    // This will return "5 minutes ago", "2 hours ago", etc.
    // Or fall back to sometime ago
    const formatRelativeTime = (timestamp: string | Date) => {
      try {
        const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
        return formatDistanceToNow(date, { addSuffix: true }); 
      } catch (error) {
        return 'some time ago'; // Fallback if date parsing fails
      }
    };
  return (
    <div className="bg-gray-800 p-4 w-full rounded-lg mb-4 shadow-lg">
      {/* Author Details */}
      <div className="flex items-center mb-2">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <span className="font-bold text-white">{post.author.name}</span>
          <span className="text-gray-400 block text-sm">{post.author.email}</span>
          <span className="text-gray-400 block text-sm">{formatRelativeTime(post.createdAt)}</span>
        </div>
      </div>

      {/* Content */}
      <p className="mb-2 text-gray-300">{post.content}</p>

      {/* Tags */}
      <div className="flex gap-2 mb-2">
        {post.tag.map((t, index) => (
          <span
            key={index}
            className="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg"
          >
            #{t}
          </span>
        ))}
      </div>

      {/* Image Display */}
      {post.image && post.image.length > 0 && (
        <div className="flex gap-2 mb-2">
          {post.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Post image ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-3 text-gray-400">
        <div className="flex items-center">
          <FaHeart className="mr-1 cursor-pointer hover:text-red-500" />
          <span>{post.like}</span>
        </div>
        <div className="flex items-center">
          <FaComment className="mr-1 cursor-pointer hover:text-blue-500" />
          <span>{post.comment}</span>
        </div>
        <div className="flex items-center">
          <FaRetweet className="mr-1 cursor-pointer hover:text-green-500" />
          <span>{post.share}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;




