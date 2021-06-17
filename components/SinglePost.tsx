import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { PostTS, UserTS } from "../utils/tsInterfaces";

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
        <Image
          // className="image"
          alt={title}
          src={thumbnailUrl || "https://placeimg.com/1000/600/any"}
          layout="responsive"
          objectFit="contain"
          width={700}
          height={400}
        />
      </div>
      <div className="col-12 d-flex flex-column align-items-center">
        <h1 className="blogTitle">{title}</h1>
        <div className=" my-4 d-inline-block">
          <AuthorInfo user={user as UserTS} createdAt={createdAt} />
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
