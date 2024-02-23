export interface PostAuthor {
  id: number;
  fullName: string;
  age: number;
  email: string;
}

export interface PostResults {
  id: number;
  title: string;
  content: number;
  likes: number;
  createdAt: Date;
  author: PostAuthor;
}
