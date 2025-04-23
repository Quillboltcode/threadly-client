export interface Post {
    id: string;
    content: string;
    tag: string[];
    createdAt: string;
    updatedAt: string;
    image: string[]|null;
    like: number;   
    share: number;
    comment: string[];
    commentcount: number;
    author :{
      id: string | undefined;
      name: string;
      firstname: string;
      lastname: string;
      email: string;
      avatar: string;
    }
}


  
