export interface Post {
    id: string;
    content: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    image: string[]|null;
    like: number;   
    comments: string[];
    commentcount: number;
    author :{
      id: string | undefined;
      username: string;
      firstname: string;
      lastname: string;
      email: string;
      avatar: string;
    }
}


  
