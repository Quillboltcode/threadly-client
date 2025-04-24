import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { PostService } from "../services/postServices";
import toast from "react-hot-toast";

export interface PostProps {
  like: number; // Initial like count passed as a prop
  postid: string; // ID of the post
}

// Custom hook for liking a post
export const useLikePost = () => {
  return useMutation({
    mutationFn: PostService.likePost,
  });
};

const LikeBtn: React.FC<PostProps> = ({ like: initialLike, postid }) => {
  const [newLike, setLike] = useState(initialLike);
  const [isLiked, setIsLiked] = useState(false);
  const { mutateAsync: likePost } = useLikePost();

  const handleLike = async (e: React.MouseEvent<SVGGElement>) => {
    e.stopPropagation();

    const previousLike = newLike;
    const previousIsLiked = isLiked;

    // Optimistic update
    const updatedLike = isLiked ? newLike - 1 : newLike + 1;
    setLike(updatedLike);
    setIsLiked(!isLiked);

    try {
      const data = await likePost(postid);
      // Update state with server's response
      setLike(data.likeCount);
      // Determine isLiked based on the server's response
      if (data.likeCount > previousLike) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      toast.success(data.message);
    } catch (error) {
      // Revert on error
      setLike(previousLike);
      setIsLiked(previousIsLiked);
      toast.error("Error liking post");
    }
  };

  return (
    <div className="flex items-center">
      <FaHeart
        onClick={handleLike}
        className={`mr-1 cursor-pointer ${
          isLiked ? "text-red-500" : "hover:text-red-500"
        }`}
      />
      <span>{newLike}</span>
    </div>
  );
};

export default LikeBtn;