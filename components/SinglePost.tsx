import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import styled from "styled-components";

import { PostTS } from "../utils/tsInterfaces";

const AuthorInfo = dynamic(() => import("./AuthorInfo"));
const CategoryTags = dynamic(() => import("./CategoryTags"));

const SinglePost = ({
  post: { _id, title, description, user, createdAt, category, thumbnailUrl },
  className,
}: {
  post: PostTS;
  className: string;
}) => (
  <div className={className}>
    <div className="row px-md-5 mx-md-5 mx-sm-2 px-sm-0 ">
      <div className="col-12 mt-md-2 mt-sm-2">
        {/* @ts-ignore */}
        <Image
          className="image"
          layout="responsive"
          alt={title}
          src={thumbnailUrl}
          height={350}
          width={700}
        />
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

const BlogTitle = styled.div`
  font-size: 30px;
  color: black;
  text-align: center;
  font-weight: 700;
  padding-bottom: 20px;
`;
