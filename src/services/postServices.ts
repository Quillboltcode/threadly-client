import axios from 'axios';
import { Post } from '../types/post';
import toast from 'react-hot-toast';


const url = import.meta.env.VITE_API_URL ? 'http://localhost:8500/api' : 'https://api.example.com';
// const url = 'http://localhost:8500/api';

export interface CreatePostData {
  content: string;
  file?: any[];
  attachmentType?: string;
}

export class PostService  {
  
  // 
/**
 * Constructs and returns HTTP headers for API requests.
 * 
 * @param {boolean} requiresAuth - Indicates if the request requires authentication.
 * @param {boolean} isFormData - Indicates if the content type should be 'multipart/form-data'.
 * @returns {Record<string, string>} - An object containing the appropriate headers.
 * @throws {Error} - Throws an error if authentication is required but no token is found.
 */private static getHeaders(requiresAuth: boolean = false, isFormData: boolean = false): Record<string, string> {
    const headers: Record<string, string> = {};
    
    if (isFormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }
    
    if (requiresAuth) {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }



  // api/posts?page=1&limit=10
  static async getPosts(page = 1, limit = 10): Promise<Post[]> {
    const response = await axios.get(`${url}/posts?page=${page}&limit=${limit}`);
    
    const posts = response.data.posts.map((post: any) => ({
      id: post._id,
      content: post.content,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      image: post.image,
      like: post.likeCount,
      commentcount: post.commentCount,
      author: {
        id: post.author._id,
        firstname: post.author.firstName,
        lastname: post.author.lastName,
        username: post.author.username,
        email: post.author.email ?? '', // if email is optional or missing
        avatar: post.author.avatar,
      },
       // optional: include if needed
    })) as Post[];
    // console.log(posts);
    return posts;
  }
  

  static async getSinglePost(id: string): Promise<any>{
    if (!id) {
      throw new Error('Post ID is required');
    }

    try {
      const response = await axios.get(`${url}/posts/single/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Axios error")
        console.error(error.response?.data);
      } else {
        console.error(error);
      }

      throw error;
    }
  }

  //Create post api with auth-header
  static async createPost(formData: FormData): Promise<any> {
    const response = await axios.post(`${url}/posts`, formData, {
      headers: PostService.getHeaders(true, true),
    });
    
    return response.data;
  }

  //Update post api with auth-header
  static async updatePost(id: string, post: any): Promise<any>{
    const response = await axios.put(`${url}/posts/${id}`, post,{
      headers: PostService.getHeaders(true, true),
    });
    return response.data;
  }

  //Delete post api with auth-header
  static async  deletePost(id: string): Promise<any>{
    const response = await axios.delete(`${url}/posts/${id}`,{
      headers: PostService.getHeaders(true, false),  
    });
    return response.data;
  }
  // Get popular tag to display on right side bar
  static async getCommonTags(): Promise<any>{
    try {
      const response = await axios.get(`${url}/posts/tags`);
      if (Array.isArray(response.data)) {
        return response.data.map((tagData: any) => ({
          tag: tagData.tag,
          count: tagData.count,
        }));
      } else {
        console.error('Unexpected response format:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  }

  static async likePost(id: string): Promise<any> {
    if (!id) {
      throw new Error('Post ID is required');
    }

    const content = JSON.stringify  ({
      id : id,
      liked : true
  })
    try {
      const response = await axios.post(`${url}/posts/${id}/like`, content
        , {
        headers: PostService.getHeaders(true, false),
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error liking post", error.response?.data);
      } else {
        console.error("Error liking post", error);
      }

      throw error;
    }
  }
}
