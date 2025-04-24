// services/searchService.ts
import axios from 'axios';
import { Post } from '../types/post';

const API_URL = import.meta.env.VITE_API_URL;

class SearchService {
  static async searchPosts(query: string): Promise<Post[]> {
    const response = await axios.get(`${API_URL}/search/posts`, {
      params: { q: query },
    });

    const posts = response.data.map((post: any) => ({
      _id: post._id,
      content: post.content,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      image: post.image,
      likeCount: post.likeCount,// assuming share count is not provided in the response
      comment: post.comment,
      commentcount: post.commentCount,
      author: {
        id: post.author._id,
        firstname: post.author.firstname,
        lastname: post.author.lastname,
        username: post.author.username,
        email: post.author.email,
        avatar: post.author.avatar,
      },
    })) as Post[];
  
    return posts;
    // limit to 10 posts for performance
  }
}

export default SearchService;