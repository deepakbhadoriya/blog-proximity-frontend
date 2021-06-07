import React from "react";
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
      <div className="col-12 mt-md-5 mt-sm-2">
        <ThumbnailImage src={thumbnailUrl}>
          <BlogTitle>
            <div>{title}</div>
          </BlogTitle>
        </ThumbnailImage>
      </div>
      <div className="col-12 d-flex flex-column align-items-center">
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

const ThumbnailImage = styled.div`
  min-height: 350px;
  border-radius: 15px;
  background-color: #efefef;
  background-image: url(${(props: { src: string }) => props.src});
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const BlogTitle = styled.div`
  font-size: 30px;
  color: #fff;
  min-height: 200px;
  border-radius: 15px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  padding-bottom: 20px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 0, 0, 0.9037990196078431) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
