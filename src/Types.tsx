export interface Base {
  id: number;
}

// Pattern for entity types goes:
// 1) Summary, what data is necessary to show something on a list
//   Name, Description, commentCount (as opposed to pulling in a full comment array), ...
//   for arrays other 1:1 entities we pull in summaries of them as well
// 2) Detail, all data that is necessary to show / edit an entity
//   Extends summary, still pulling summaries on 1:1 to prevent circular references

export interface AuthorSummary extends Base {
  firstName: string;
  lastName: string;
  preferredName?: string;
  fullNameFirstThenLast: string;
  fullNameLastCommaFirst: string;
  bio: string;
}

export interface AuthorDetail extends AuthorSummary {
  posts?: PostSummary[];
}

export interface CommentSummary extends Base {
  content: string;
}

export interface CommentDetail extends CommentSummary {
  post: PostSummary;
}

export interface PostSummary extends Base {
  title: string;
  shortDescription: string;
  author: AuthorSummary;
  commentCount: number;
  tags?: TagSummary[];
  topic: TopicSummary;
}

export interface PostDetail extends PostSummary {
  contents: string;
  comments?: CommentSummary[];
}

export interface TagSummary extends Base {
  name: string;
  description: string;
}

export interface TagDetail extends TagSummary {
  posts: PostSummary[];
}

export interface TopicSummary extends Base {
  name: string;
  description: string;
}

export interface TopicDetail extends TopicSummary {
  posts?: PostSummary[];
}
