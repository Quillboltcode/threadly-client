import { useQuery } from "@tanstack/react-query";
import { PostService } from "../services/postServices";


export const useGetSinglePost = (id: string) => {
    return useQuery({
      queryKey: ['post', id], // Unique key for caching based on the post ID
      queryFn: () => PostService.getSinglePost(id), // Fetching function
      enabled: !!id, // Only enable the query if `id` is provided
      retry: 1, // Retry once if the request fails
      refetchOnWindowFocus: false, // Prevent unnecessary refetching when the window regains focus
      staleTime: 10 * 60 * 1000, // 5 minutes  
    });
  };