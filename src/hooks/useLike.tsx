import { useMutation } from "@tanstack/react-query"
import { PostService } from "../services/postServices"
import toast from "react-hot-toast"
export const useLikePost = () => {
    return useMutation({
        mutationFn: PostService.likePost,
        onSuccess: (data)=> {
            console.log(data);
            toast.success("Liked post");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Error liking post")
        },
        
    })
}