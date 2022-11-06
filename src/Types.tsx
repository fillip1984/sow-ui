export interface Base {
  id: number;
}

export interface Post extends Base {
  title: string;
  shortDescription: string;
  contents: string;
  author: Author;
  comments?: Comment[];
  tags?: Tag[];
}

export interface Author extends Base {
  firstName: string;
  lastName: string;
  preferredName?: string;
  bio: string;
  posts: Post[];
}

export interface Comment extends Base {
  text: string;
  post: Post;
}

export interface Tag extends Base {
  name: string;
  description: string;
  posts: Post[];
}
