import React from 'react';
import { FaShareAlt, FaHeart, FaComment, FaEllipsisH, FaArrowLeft } from 'react-icons/fa';
import { useGetSinglePost } from '../hooks/useGetSinglePost'; // Import your custom hook
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router';
import { formatRelativeTime }from "../utils/formatRelativeTime";

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId:string }>();  
  if (!postId){
    return <div className="text-red-400">Invalid post ID</div>;
  }
  // Fetch post data using your custom hook
  const { data, isLoading, isError, error } = useGetSinglePost(postId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="text-red-400">Error loading post: {error?.message || 'Unknown error'}</div>;
  }

  const post = data;

  return (
    <div className="bg-[#1E1F22] text-white p-4 rounded-lg">
      {/* Back button*/}
      <div className="mb-4">
        <button onClick={() => window.history.back()} 
        className="bg-[#3B3C43] text-white py-2 px-4 rounded-lg">
          <FaArrowLeft className="mr-2" /> 
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <img
          src={post.author.avatar}
          alt="Author Avatar"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <span className="font-semibold text-white">{post.author.firstName+' '+post.author.lastName}</span>
          <p className="text-sm text-gray-400">@{post.author.username}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-300">{post.content}</p>
      </div>

      {/* Media Section */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {post.image.map((media:any, index: number) => (
          <img
            key={index}
            src={import.meta.env.VITE_APP_UPLOAD+'/'+media}
            alt={`Media ${index + 1}`}
            className="w-full h-auto rounded-lg overflow-clip "
          />
        ))}
      </div>

      {/* Meta Information */}
      <div className="flex flex-row items-center justify-between text-sm text-gray-400 mb-4">
        <div className="border-line border-gray-700">
          <span>{formatRelativeTime(post.createdAt)}</span>
          <span className="ml-2">·</span>
          <span>Everybody can reply</span>
        </div>
        <div>
          <span className="mr-2">{post.repostsCount} reposts</span>
          <span className="mr-2">{post.quotesCount} quotes</span>
          <span>{post.likesCount} likes</span>
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="flex items-center gap-4 mb-4">
        <button className="flex items-center gap-2 hover:text-blue-500">
          <FaComment /> Write your reply
        </button>
        <button className="flex items-center gap-2 hover:text-blue-500">
          <FaShareAlt /> Share
        </button>
        <button className="flex items-center gap-2 hover:text-blue-500">
          <FaHeart /> Like
        </button>
        <button className="hover:text-blue-500">
          <FaEllipsisH />
        </button>
      </div>

      {/* Comments Section */}
      <div>
        {post.comments.map((comment: any, index: number) => (
          <div key={index} className="flex gap-2 mb-4">
            <img
              src={comment.author.avatar}
              alt="Comment Author Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.author.name}</span>
                <span className="text-sm text-gray-400">@{comment.author.username}</span>
                <span className="text-xs text-gray-400 ml-2">· {comment.createdAt.toLocaleString()}</span>
              </div>
              <p className="text-gray-300 mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;