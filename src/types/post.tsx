export interface Post {
    id: string;
    content: string;
    tag: string[];
    createdAt: string;
    updatedAt: string;
    image: string[]|null;
    like: number;   
    share: number;
    comment: number;
    author :{
      name: string
      email: string
      avatar: string
    }
}

export const sanitizePost = (post:any ) => {
  return {
    id: post._id?.toString() || "unknow-id",
    content: post.content || " No content available",
    tag: Array.isArray(post.tag) ? post.tag : [],
    createdAt: post.createdAt?.toString() || "Unknown date", // Convert createdAt to string
    updatedAt: post.updatedAt?.toString() || "Unknown date", // Convert updatedAt to string
    image: Array.isArray(post.image) ? post.image : [], // Ensure images are an array
    like: typeof post.like === "number" ? post.like : 0, // Ensure like is a number
    comment: typeof post.comment === "number" ? post.comment : 0, // Ensure comment is a number
    share: typeof post.share === "number" ? post.share : 0, // Ensure share is a number
    author: {
      name: post.author?.name || "Unknown Author", // Ensure author name exists
      email: post.author?.email || "Unknown Email", // Ensure author email exists
      avatar: post.author?.avatar || "https://via.placeholder.com/150", // Provide a default avatar
    },
  };
};
  
