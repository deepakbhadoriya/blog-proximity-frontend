import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import Head from "../../components/Head";
import baseUrl from "../../config/baseUrl";
import { PostsTS, CategoryTS } from "../../utils/tsInterfaces";

const InfiniteScrollPosts = dynamic(
  () => import("../../components/InfiniteScrollPosts")
);
const PaginationPosts = dynamic(
  () => import("../../components/PaginationPosts")
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
  const [scrollType, setScrollType] = useState("loading");

  const getCategory = async () => {
    try {
      const res: { data: CategoryTS } = await axios.get(
        `${baseUrl}/category/${categoryId}`
      );
      setScrollType(res.data.scrollType);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

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

  const handlePagination = async ({ selected }: any) => {
    try {
      const res: { data: PostsTS } = await axios.get(
        `${baseUrl}/post?category=${categoryId}&limit=${postLimit}&page=${
          selected + 1
        }`
      );
      const postsData = res.data;
      setLocalPosts(postsData);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head
        title="Category page"
        description="This is our category page of blog"
        keywords="blog, category, posts"
      />
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1>All posts from {categoryName}</h1>
          </div>
        </div>
        {scrollType === "infiniteScroll" && (
          <InfiniteScrollPosts postData={localPosts} next={fetchMorePost} />
        )}
        {scrollType === "pagination" && (
          <PaginationPosts
            postData={localPosts}
            handlePagination={handlePagination}
          />
        )}
        {scrollType === "loading" && <h2>Loading</h2>}
      </div>
    </>
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
