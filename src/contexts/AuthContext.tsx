import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { authApi, LoginCredentials } from '../services/authService';
// Remove the useNavigate import as we'll handle navigation differently
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials, redirectUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  // Remove useNavigate() call since it's causing the error
  
  // Query for fetching current user
  const { 
    data: userData, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    // Only try to fetch if we have a token
    enabled: !!localStorage.getItem('auth_token'),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const user = (userData as any)?.user || userData;
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Save token to localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('loggedInUsers', JSON.stringify(data.user));
      // Update user data in the cache
      queryClient.setQueryData(['currentUser'], data.user);
      // Instead of using navigate, we'll handle redirects in the component calling login
    },
  });
  
  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear user from cache
      queryClient.setQueryData(['currentUser'], null);
      queryClient.clear();
      // Instead of redirecting here, we'll handle it in the component using logout
      window.location.href = '/login'; // Fallback for navigation
    },
  });

  // Handle token expiration or unauthorized responses
  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem('auth_token');
      queryClient.setQueryData(['currentUser'], null);
      window.location.href = '/login'; // Using window.location as a fallback
    };

    // Add a response interceptor - implement as needed
    // This is a simplified example
    
    return () => {
      // Cleanup
    };
  }, [queryClient]);

  const login = async (credentials: LoginCredentials, redirectUrl = '/profile') => {
    const result = await loginMutation.mutateAsync(credentials);
    // Use window.location for navigation after login if needed
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
    // return result;
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    // Navigation is handled in the mutation success callback
  };

  const value = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    error: (loginMutation.error || error) as Error | null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};