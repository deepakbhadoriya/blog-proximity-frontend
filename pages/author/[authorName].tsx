import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import baseUrl from "../../config/baseUrl";
import { PostsTS } from "../../utils/tsInterfaces";

const InfiniteScrollPosts = dynamic(
  () => import("../../components/InfiniteScrollPosts")
);

const postLimit = 10;

const AuthorPosts = ({
  posts,
  authorName,
  authorId,
}: {
  posts: PostsTS;
  authorName: string;
  authorId: string;
}) => {
  const [localPosts, setLocalPosts] = useState(posts);

  const fetchMorePost = async () => {
    try {
      const res: { data: PostsTS } = await axios.get(
        `${baseUrl}/post?user=${authorId}&limit=${postLimit}&page=${
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
          <h1>All posts by {authorName}</h1>
        </div>
      </div>
      <InfiniteScrollPosts postData={localPosts} next={fetchMorePost} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { authorId, authorName } = context.query;
  try {
    const res: { data: Object } = await axios.get(
      `${baseUrl}/post?user=${authorId}&limit=${postLimit}&page=1`
    );
    return { props: { posts: res.data, authorName, authorId } };
  } catch (error) {
    return { notFound: true };
  }
};

export default AuthorPosts;
