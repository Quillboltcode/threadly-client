// src/api/auth.ts - API client for authentication
import axios from 'axios';
import { User } from '../types/user';
// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}



export interface AuthResponse {
  user: User;
  token: string;
}

// Auth API functions
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    // Clear local token even if API call fails
    localStorage.removeItem('auth_token');
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/users/profile');
    return response.data;
  },
};