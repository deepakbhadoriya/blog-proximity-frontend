export interface PostTS {
  _id: string;
  title: string;
  description: string;
  user: { _id: string; name: string };
  createdAt: string;
  category: { _id: string; name: string };
  thumbnailUrl: string;
}

export interface PostsTS {
  posts: PostTS[];
  currentPage: string;
  totalPosts: string;
}

export interface UserTS {
  date: string;
  email: string;
  name: string;
  _id: string;
}

export interface CategoryTS {
  name: string;
  _id: string;
  createdAt: string;
  user: UserTS;
}
