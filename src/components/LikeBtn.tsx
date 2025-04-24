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
    onSuccess: (data) => {
      console.log(data);
      toast.success("Liked post");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error liking post");
    },
  });
};

const LikeBtn: React.FC<PostProps> = ({ like, postid }) => {
  const [newLike, setLike] = useState(like); // Local state for like count
  const [isLiked, setIsLiked] = useState(false); // Track if the user has liked the post
  const { mutate: likePost } = useLikePost();
  
  const handleLike = (e: React.MouseEvent<SVGGElement>) => {
    e.stopPropagation(); // Prevent event bubbling

    // Optimistically update the like count
    const updatedLikeCount = isLiked ? newLike - 1 : newLike + 1;
    setLike(updatedLikeCount); // Update the local state
    setIsLiked(!isLiked); // Toggle the like state

    // Send the POST request to the server
    likePost(
      postid , // Pass the post ID to the mutation function
      {
        // Handle success and error cases
        onSuccess: () => {
          toast.success("Like successful");
        },
        onError: () => {
          // Revert the optimistic update in case of an error
          setLike(newLike); // Revert to the previous like count
          setIsLiked(isLiked); // Revert the like state
          toast.error("Error liking post");
        },
      }
    );
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