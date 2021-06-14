export interface PostTS {
  _id: string;
  title: string;
  description: string;
  user: { _id: string; name: string };
  createdAt: string;
  category: CategoryTS[];
  thumbnailUrl: string;
}

export interface PostsTS {
  posts: PostTS[];
  currentPage: string;
  totalPosts: string;
  totalPages: string;
}

export interface UserTS {
  avatar?: string;
  date?: string;
  email?: string;
  name: string;
  _id?: string;
  bio?: string;
}

export interface CategoryTS {
  name: string;
  _id: string;
  createdAt: string;
  user: UserTS;
}
