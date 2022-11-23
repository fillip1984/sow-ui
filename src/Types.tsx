export interface Base {
  id: number;
}

export interface PostSummary extends Base {
  title: string;
  shortDescription: string;
  author: AuthorSummary;
  topic: TopicSummary;
  commentCount: number;
  tags?: TagSummary[];
}

export interface PostDetail extends PostSummary {
  contents: string;
  comments?: CommentSummary[];
}

export interface AuthorSummary extends Base {
  fullNameFirstThenLast: string;
  fullNameLastCommaFirst: string;
  firstName: string;
  lastName: string;
  preferredName?: string;
  bio: string;
  // posts?: Post[];
}

export interface TopicSummary extends Base {
  name: string;
}

export interface TopicDetail extends TopicSummary {
  description: string;
}

export interface TopicFull extends TopicDetail {
  posts?: PostSummary[];
}

export interface TagSummary extends Base {
  name: string;
  //   description: string;
  //   posts: Post[];
}

export interface CommentSummary extends Base {
  text: string;
  //post: Post;
}

// export interface Post extends Base {
//   title: string;
//   shortDescription: string;
//   contents: string;
//   author: Author;
//   topic: Topic;
//   comments?: Comment[];
//   tags?: Tag[];
// }

// export interface Author extends Base {
//   firstName: string;
//   lastName: string;
//   preferredName?: string;
//   fullNameFirstThenLast: string;
//   fullNameLastCommaFirst: string;
//   bio: string;
//   posts?: Post[];
// }

// export interface Topic extends Base {
//   name: string;
//   description: string;
//   posts?: Post[];
// }

// export interface Comment extends Base {
//   text: string;
//   post: Post;
// }

// export interface Tag extends Base {
//   name: string;
//   description: string;
//   posts: Post[];
// }
