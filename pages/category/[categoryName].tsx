import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import baseUrl from "../../config/baseUrl";
import { PostsTS } from "../../utils/tsInterfaces";

const InfiniteScrollPosts = dynamic(
  () => import("../../components/InfiniteScrollPosts")
);

const postLimit = 10;

const CategoryPosts = ({
  posts,
  categoryName,
  categoryId,
}: {
  posts: PostsTS;
  categoryName: string;
  categoryId: string;
}) => {
  const [localPosts, setLocalPosts] = useState(posts);

  const fetchMorePost = async () => {
    try {
      const res: { data: PostsTS } = await axios.get(
        `${baseUrl}/post?category=${categoryId}&limit=${postLimit}&page=${
          parseInt(localPosts.currentPage) + 1
        }`
      );
      const postsData = res.data;
      const posts = res.data.posts;
      setLocalPosts({ ...postsData, posts: [...localPosts.posts, ...posts] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <h1>All posts from {categoryName}</h1>
        </div>
      </div>
      <InfiniteScrollPosts postData={localPosts} next={fetchMorePost} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { categoryId, categoryName } = context.query;
  try {
    const res: { data: Object } = await axios.get(
      `${baseUrl}/post?category=${categoryId}&limit=${postLimit}&page=1`
    );
    return { props: { posts: res.data, categoryName, categoryId } };
  } catch (error) {
    return { notFound: true };
  }
};

export default CategoryPosts;
