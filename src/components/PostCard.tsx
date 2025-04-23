import React from "react";
import toast from "react-hot-toast";
import { FaComment, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Post } from "../types/post";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import CommentModel from "./CommentModel";
import LikeBtn from "./LikeBtn";
import { usePostMutations } from "../hooks/useMuPost";


const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [CommentBoxOpen, setCommentBoxOpen] = React.useState(false);
  const authorEmail = post.author.email?.toLowerCase() || `@${post.author.name.toLowerCase().replace(/\s+/g, '_')}.threadly.social`;
  const { isAuthenticated, user } = useAuth();
  const { updatePostMutation, deletePostMutation } = usePostMutations();
  const navigate = useNavigate();
  
  console.log(post.commentcount)

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`)
  }
  // Check if the current user is the author of the post
  const isAuthor = user?._id === post.author.id;
  // console.log(isAuthor);
  // Function to handle actions requiring authentication
  const requireAuth = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to perform this action.");
      navigate("/login"); // Redirect to login page
    }
  };
  // Function to handle update post
  // Handle Edit Post
  const handleEditPost = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to edit a post.");
      navigate("/login");
      return;
    }

    const updatedPostData = {
      content: "Updated content", // Replace with actual updated content
      tag: ["updatedTag"], // Replace with actual updated tags
    };

    updatePostMutation.mutate({ id: post.id, post: updatedPostData });
  };

  // Handle Delete Post
  const handleDeletePost = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to delete a post.");
      navigate("/login");
      return;
    }

    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate(post.id);
    }
  };


  return (
    <div className="bg-gray-800 cursor-pointer p-4 min-w-100 w-full rounded-lg mb-4 shadow-lg overflow-visible container" onClick={() => handlePostClick(post.id)}>
      {/* Author Details */}
      <div className="flex items-center mb-2">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full mr-2 overflow-hidden"
        />
        <div>
          <span className="font-bold text-white">{post.author.name}</span>
          <span className="text-gray-400 block text-sm">{authorEmail}</span>
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
              src={import.meta.env.VITE_APP_UPLOAD + "/" + img}
              alt={`Post image ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '../assets/fallback.png'; // Replace with fallback image
              }}
            />
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-3 text-gray-400">
        <LikeBtn postid={post.id} like={post.like} />
        <div onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the parent onClick
          if (!isAuthenticated) {
            requireAuth();
          } else {
            setCommentBoxOpen(!CommentBoxOpen);
          }
        }}
          className="flex items-center mr-5">
          <FaComment className="mr-1 cursor-pointer hover:text-blue-500" />
          <span>{post.commentcount}</span>
        </div>

          {/* Edit and Delete Buttons */}
          {isAuthor && (
              <div className="flex gap-2">
              {/* Edit Button */}
              <button
                className="flex items-center gap-1 px-2 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering parent onClick
                  handleEditPost();
                }}
              >
                <FaEdit className="text-sm" /> {/* Edit Icon */}
                <span className="text-xs">Edit</span>
              </button>

              {/* Delete Button */}
              <button
                className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering parent onClick
                  handleDeletePost();
                }}
              >
                <FaTrash className="text-sm" /> {/* Delete Icon */}
                <span className="text-xs">Delete</span>
              </button>
            </div>
          )}
        
      </div>
      {CommentBoxOpen && isAuthenticated &&
        <CommentModel post={post}
          onSubmit={() => {
            setCommentBoxOpen(false);
          }}
          onClose={() => setCommentBoxOpen(false)}
          onChange={() => {
            // handle input change
          }} />}
    </div>
  );
};

export default PostCard;




