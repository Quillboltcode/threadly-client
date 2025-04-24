import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { User } from "../types/user";
import { UserService } from "../services/userServices";


// Query key constants
const PROFILE_QUERY_KEY = ['user', 'profile'];

/**
 * Hook to update the current user profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedData: Partial<User>) => UserService.updateProfile(updatedData),
    onSuccess: () => {
      // Invalidate and refetch the user profile after a successful update
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
    onError: (error: Error) => {
      // Handle error (e.g., show a toast notification or log the error)
      console.error("Failed to update profile:", error.message);
    },
  });
};