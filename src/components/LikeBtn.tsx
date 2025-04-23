import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useLikePost } from "../hooks/useLike";
import axios from "axios";
import toast from "react-hot-toast";

export interface PostProps {
    like: number
    postid: string;
}

const LikeBtn:React.FC<PostProps> = ({ like ,postid}) => {
    const [ newlike ,setLike ] = useState(like);
    const [isLiked, setIsLiked] = useState(false); // Track if the user has liked the post
    // const [reload , setReload] = useState(false);
    const { mutate: likePost, isError, isSuccess } = useLikePost();
    
    useEffect(() => {
        const fetchLikeCount = async () => {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/single/${postid}`);
          setLike(response.data.likeCount);
        };
        fetchLikeCount();
      }, [postid]);

    const handleLike = (e: React.MouseEvent<SVGGElement>) => {
      // Optimistically update the like count
        if (!isLiked) {
          setLike(newlike + 1); // Increment the like count locally
        } else {
          setLike(newlike - 1); // Decrement the like count locally
        }
        setIsLiked(!isLiked); // Toggle the like state

        e.stopPropagation(); 
        likePost(postid);
        // setReload(!reload);
        isError && toast.error("Error liking post");
        isSuccess && toast.success("Like sucessfull");
    }
    return (
        <>
        <div className="flex items-center">
        <FaHeart 
        onClick={handleLike} 
         className="mr-1 cursor-pointer hover:text-red-500" />
        <span>{like}</span>
      </div>
      </>
    );   
}

export default LikeBtn;