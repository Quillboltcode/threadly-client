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
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
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
      data.file.forEach((file: any) => {
        formData.append('images', file);
      });
      
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

export const useUpdatePost = (options: UseCreatePostOptions = {}) => {
  const queryClient = useQueryClient();
  
  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: CreatePostData }) => {
      const formData = prepareFormData(data);
      return PostService.updatePost(id, formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', data.id] }); // If you have individual post queries
      options.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options.onError?.(error);
    }
  });

  const prepareFormData = (data: CreatePostData): FormData => {
    const formData = new FormData();
    
    if (data.content) formData.append('content', data.content);
    if (data.file) {
      data.file.forEach((file: any) => {
        formData.append('images', file);
      });
      if (data.attachmentType) formData.append('attachmentType', data.attachmentType);
    }
    
    return formData;
  };

  return {
    updatePost: (id: string, data: CreatePostData) => 
    updatePostMutation.mutate({ id, data }),
    isPending: updatePostMutation.isPending,
    isError: updatePostMutation.isError,
    error: updatePostMutation.error,
    isSuccess: updatePostMutation.isSuccess,
    data: updatePostMutation.data
  };
};
