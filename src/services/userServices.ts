import axios from "axios";
import { User } from "../types/user";

const url = import.meta.env['VITE_API_URL'] ? 'http://localhost:8500/api' : 'https://api.example.com';

export class UserService {
    private static getHeaders(requiresAuth: boolean = false, isFormData: boolean = false): Record<string, string> {
        const headers: Record<string, string> = {};
        if (requiresAuth) {
          const token = localStorage.getItem('auth_token');
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        }
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }
        if (isFormData) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        return headers;
    }
    // api/users/profile already exist in useAuth context and will be used there

    // api/users/profile
    // 
    static async updateProfile(user: Partial<User>):Promise<any>{
        const response = await axios.put(`${url}/users/profile`, user,{
            headers: this.getHeaders(true, true),
        });
        return response.data;
    }

    //api/users/{id}
    static async getUser(id: string):Promise<any>{
        const response = await axios.get(`${url}/users/${id}`,{
            headers: this.getHeaders(true, false),
        });
        return response.data;
    }
    //api/users/follow/{id}
    static async followUser(id: string):Promise<any>{
        const response = await axios.post(`${url}/users/follow/${id}`,{
            headers: this.getHeaders(true, false),
        });
        return response.data;
    }
    //api/users/suggestions
    static async getSuggestions():Promise<any>{
        const response = await axios.get(`${url}/users/suggestions`,{
            headers: this.getHeaders(true, false),
        });
        return response.data;
    }

}




