import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostService,CreatePostData } from "../services/postServices";



export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const data = await PostService.getPosts();
      return data;
    },
    placeholderData : keepPreviousData,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

interface UseCreatePostOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useCreatePost = (options: UseCreatePostOptions = {}) => {
  const queryClient = useQueryClient();
  
  const createPostMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return PostService.createPost(formData);
    },
    onSuccess: (data) => {
      // Invalidate posts query to refresh the feed
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error: Error) => {
      if (options.onError) {
        options.onError(error);
      }
    }
  });
  
  // Helper function to prepare FormData
  const prepareFormData = (data: CreatePostData): FormData => {
    const formData = new FormData();
    
    if (data.content) {
      formData.append('content', data.content);
    }
    
    if (data.file) {
      formData.append('file', data.file);
      
      if (data.attachmentType) {
        formData.append('attachmentType', data.attachmentType);
      }
    }
    
    return formData;
  };
  
  const createPost = (data: CreatePostData) => {
    const formData = prepareFormData(data);
    return createPostMutation.mutate(formData);
  };
  
  return {
    createPost,
    isPending: createPostMutation.isPending,
    isError: createPostMutation.isError,
    error: createPostMutation.error,
    isSuccess: createPostMutation.isSuccess,
    data: createPostMutation.data
  };
};


