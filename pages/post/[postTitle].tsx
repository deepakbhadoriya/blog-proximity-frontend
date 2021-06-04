import React from "react";
import axios from "axios";

import SinglePost from "../../components/SinglePost";
import baseUrl from "../../config/baseUrl";
import { PostTS } from "../../utils/tsInterfaces";

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
