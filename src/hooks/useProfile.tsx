import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { User } from "../types/user";
import { UserService } from "../services/userServices";


// Query key constants
const PROFILE_QUERY_KEY = ['user', 'profile'];

/**
 * Fetch the current user profile
 */
// export const useProfile = () => {
//   return useQuery({
//     queryKey: PROFILE_QUERY_KEY,
//     queryFn: UserService.getProfile,
//   });
// };

/**
 * Update the current user profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => UserService.updateProfile(user),
    onSuccess: () => {
      // Invalidate and refetch the user profile
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
};