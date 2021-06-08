import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import baseUrl from "../config/baseUrl";
import { PostsTS } from "../utils/tsInterfaces";

const InfiniteScrollPosts = dynamic(
  () => import("../components/InfiniteScrollPosts")
);

const postLimit = 10;

const Home = ({ posts }: { posts: PostsTS }) => {
  const [localPosts, setLocalPosts] = useState(posts);

  const fetchMorePost = async () => {
    try {
      const res: { data: PostsTS } = await axios.get(
        `${baseUrl}/post?limit=${postLimit}&page=${
          parseInt(localPosts.currentPage) + 1
        }`
      );
      const apiPostsData = res.data;
      const apiPosts = res.data.posts;
      setLocalPosts({
        ...apiPostsData,
        posts: [...localPosts.posts, ...apiPosts],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <h1>Home Page</h1>
        </div>
      </div>
      <InfiniteScrollPosts postData={localPosts} next={fetchMorePost} />
    </div>
  );
};

export const getStaticProps = async () => {
  try {
    const res: { data: Object } = await axios.get(
      `${baseUrl}/post?limit=${postLimit}&page=1`
    );
    return { props: { posts: res.data } };
  } catch (error) {
    return { notFound: true };
  }
};

export default Home;
