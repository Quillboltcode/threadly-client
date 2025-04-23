import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { PostService } from "../services/postServices";
import { toast } from "react-hot-toast"
// Custom Hook for Update and Delete Mutations
export const usePostMutations = () => {
    // Mutation for updating a post
    const queryClient = useQueryClient();
    const updatePostMutation = useMutation({
      mutationFn: ({ id, post }: { id: string; post: any }) => PostService.updatePost(id, post),
      onSuccess: (data) => {
        console.log("Post updated successfully:", data);
        toast.success("Post updated successfully");
        // Optimistically update the cache
        queryClient.setQueryData(["post", data.id], data.post);
      },
      onError: (error: any) => {
        console.error("Error updating post:", error.response?.data || error.message);
        toast.error("Error updating post");
      },
    });
  
    // Mutation for deleting a post
    const deletePostMutation = useMutation({
      mutationFn: (id: string) => PostService.deletePost(id),
      onSuccess: (data) => {
        console.log("Post deleted successfully:", data);
        toast.success("Post deleted successfully");
      },
      onError: (error: any) => {
        console.error("Error deleting post:", error.response?.data || error.message);
        toast.error("Error deleting post");
      },
    });
  
    return { updatePostMutation, deletePostMutation };
  };