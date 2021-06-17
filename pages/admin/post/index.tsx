import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import baseUrl from "../../../config/baseUrl";
import { PostsTS, PostTS, CategoryTS } from "../../../utils/tsInterfaces";

const PrivatePage = dynamic(
  () => import("../../../authentication/PrivatePage")
);
const InfiniteScrollPosts = dynamic(
  () => import("../../../components/InfiniteScrollPosts")
);

const postLimit = 10;

const index = ({ categories }: { categories: CategoryTS[] }) => {
  const postInitial = {
    title: "",
    description: "",
    thumbnailUrl: "",
    category: [],
  };

  const postsInitial = {
    posts: [],
    totalPosts: "0",
    totalPages: "0",
    currentPage: "1",
  };
  const [update, setUpdate] = useState(false);
  const [editPostId, setEditPostId] = useState(false as boolean | string);
  const [post, setPost] = useState(postInitial as PostTS);
  const [localPosts, setLocalPosts] = useState(postsInitial as PostsTS);

  const fetchMorePost = async () => {
    const page = parseInt(localPosts.currentPage);
    try {
      const res: { data: PostsTS } = await axios.get(
        `${baseUrl}/post/user?&limit=${postLimit}&page=${page + 1}`
      );
      const postsData = res.data;
      const posts = res.data.posts;
      setLocalPosts({ ...postsData, posts: [...localPosts.posts, ...posts] });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPost = async () => {
    try {
      const res: { data: PostsTS } = await axios.get(
        `${baseUrl}/post/user?page=1&limit=${postLimit}`
      );
      setLocalPosts(res.data);
    } catch (error) {
      return { notFound: true };
    }
  };

  useEffect(() => {
    getUserPost();
  }, []);

  const handleEdit = (postId: string) => {
    const { _id, title, description, thumbnailUrl, category } =
      localPosts.posts.filter((item: any) => item._id === postId)[0];
    setPost({ title, description, thumbnailUrl, category });
    setEditPostId(_id as string);
  };

  const handleDelete = async (postId: string) => {
    await axios.delete(`${baseUrl}/post/${postId}`);
    setLocalPosts({
      ...localPosts,
      posts: localPosts.posts.filter((item: any) => item._id !== postId),
    });
  };

  const handleOnChange = ({ target: { value, name } }: any) => {
    setPost({ ...post, [name]: value });
  };

  const isCategoryPresent = (category: any) => {
    return post.category.findIndex((item: any) => item._id === category._id);
  };

  const handleCategory = ({ target: { value } }: any) => {
    const newCategory = categories.filter((item: any) => item._id === value)[0];
    const tempPost = post;
    const categoryIndex = isCategoryPresent(newCategory);
    if (categoryIndex === -1) {
      tempPost.category.push(newCategory);
    } else {
      tempPost.category.splice(categoryIndex, 1);
    }
    setPost(tempPost);
    setUpdate(!update);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (editPostId) {
        await axios.put(`${baseUrl}/post/${editPostId}`, post);
        setEditPostId(false);
      } else {
        await axios.post(`${baseUrl}/post`, post);
      }
      getUserPost();
      setPost(postInitial);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setPost(postInitial);
    setEditPostId(false);
  };

  return (
    <PrivatePage>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">Manage your Post</h2>
          </div>
          <div className="col-md-8 col-sm-12 mb-5">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="postTitle">Title</label>
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={handleOnChange}
                  className="form-control mb-2"
                  id="postTitle"
                  placeholder="Post title"
                />
                <label htmlFor="postThumbnail">Thumbnail URL</label>
                <input
                  type="text"
                  name="thumbnailUrl"
                  value={post.thumbnailUrl}
                  onChange={handleOnChange}
                  className="form-control mb-2"
                  id="postThumbnail"
                  placeholder="Thumbnail URL"
                />
                <div className="input-group my-3">
                  <div className="input-group-prepend">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01"
                    >
                      Category
                    </label>
                  </div>
                  <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    value=""
                    onChange={handleCategory}
                  >
                    <option value="">Choose...</option>
                    {categories.map((category: any) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  {post.category.map((item: any) => (
                    <div className="categoryTagContainer" key={item._id}>
                      {item.name}
                      <span
                        onClick={() =>
                          handleCategory({ target: { value: item._id } })
                        }
                        style={{
                          cursor: "pointer",
                          fontSize: 20,
                          marginLeft: 10,
                          color: "red",
                        }}
                      >
                        ❌
                      </span>
                    </div>
                  ))}
                </div>
                <label htmlFor="exampleInputPassword1">Description</label>
                <textarea
                  name="description"
                  className="form-control mb-2"
                  placeholder="Enter post content here"
                  onChange={handleOnChange}
                  value={post.description}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {editPostId ? "Update Post" : "Add Post"}
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-3"
                onClick={handleReset}
              >
                Reset
              </button>
            </form>
          </div>
          <div className="col-md-4 col-sm-12 mb-5">
            <h4>Your posts</h4>
            {localPosts && (
              <InfiniteScrollPosts
                next={fetchMorePost}
                postData={localPosts}
                className="col-12 mb-2"
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </PrivatePage>
  );
};

export const getServerSideProps = async () => {
  try {
    const res: { data: Object } = await axios.get(`${baseUrl}/category`);
    return { props: { categories: res.data } };
  } catch (error) {
    return { notFound: true };
  }
};

export default index;
