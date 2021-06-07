import React from "react";
import Image from "next/image";
import styled from "styled-components";

import AuthorInfo from "./AuthorInfo";
import CategoryTags from "./CategoryTags";
import { PostTS } from "../utils/tsInterfaces";

const SinglePost = ({
  post: { _id, title, description, user, createdAt, category, thumbnailUrl },
  className,
}: {
  post: PostTS;
  className: string;
}) => (
  <div className={className}>
    <div className="row px-md-5 mx-md-5 mx-sm-2 px-sm-0 ">
      <div className="col-12 mt-md-5 mt-sm-2" style={{ height: 350 }}>
        {/* @ts-ignore */}
        <ThumbnailImage layout="fill" alt="blogThumb" src={thumbnailUrl} />
      </div>
      <div className="col-12 d-flex flex-column align-items-center">
        <BlogTitle>
          <div>{title}</div>
        </BlogTitle>
        <div className=" my-4 d-inline-block">
          <AuthorInfo user={user} createdAt={createdAt} />
        </div>
        <div className="mb-2">
          <CategoryTags category={category} />
        </div>

        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default SinglePost;

const ThumbnailImage = styled(Image)`
  border-radius: 15px;
  background-color: #efefef;
`;

const BlogTitle = styled.div`
  font-size: 30px;
  color: black;
  text-align: center;
  font-weight: 700;
  padding-bottom: 20px;
`;
