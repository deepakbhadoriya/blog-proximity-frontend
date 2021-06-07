import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import baseUrl from "../../config/baseUrl";
import { PostTS } from "../../utils/tsInterfaces";

const SinglePost = dynamic(() => import("../../components/SinglePost"));

const Post = ({ post }: { post: PostTS }) => (
  <SinglePost className="container" post={post} />
);

export const getServerSideProps = async (context: any) => {
  const { postId } = context.query;
  try {
    const res: { data: PostTS } = await axios.get(`${baseUrl}/post/${postId}`);
    return { props: { post: res.data } };
  } catch (error) {
    return { notFound: true };
  }
};

export default Post;
