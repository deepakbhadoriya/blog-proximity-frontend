import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import styled from "styled-components";

import { PostTS } from "../utils/tsInterfaces";

const AuthorInfo = dynamic(() => import("./AuthorInfo"));
const CategoryTags = dynamic(() => import("./CategoryTags"));

const PostCard = ({
  post: { _id, title, user, createdAt, category, thumbnailUrl },
  className,
  onEdit,
  onDelete,
}: {
  post: PostTS;
  className: string;
  onEdit: any;
  onDelete: any;
}) => (
  <div className={className ? className : "col-md-6 col-sm-12 mb-2 p-4"}>
    <PostCardContainer>
      <div className="row">
        <div className="col-md-5 col-sm-12">
          <div
            className="h-100 d-flex justify-content-center align-item-center"
            style={{ position: "relative", minHeight: 250 }}
          >
            <Link
              href={{
                pathname: "/post/[slug]",
                query: { slug: title, postId: _id },
              }}
            >
              <Image
                className="image"
                alt={title}
                src={thumbnailUrl}
                layout="fill"
                objectFit="cover"
                // quality={100}
              />
            </Link>
          </div>
        </div>
        <div className="col-md-7 col-sm-12 d-flex justify-content-around flex-column">
          <div>
            <CategoryTags category={category} />
          </div>
          <Link
            href={{
              pathname: "/post/[slug]",
              query: { slug: title, postId: _id },
            }}
          >
            <h2>{title}</h2>
          </Link>
          <AuthorInfo user={user} createdAt={createdAt} />
        </div>
        <div className="col-12 d-flex justify-content-end">
          {onEdit && (
            <button className="btn btn-primary m-2" onClick={() => onEdit(_id)}>
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className="btn btn-danger m-2"
              onClick={() => onDelete(_id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </PostCardContainer>
  </div>
);

export default PostCard;

const PostCardContainer = styled.div`
  height: 100%;
  border-radius: 20px;
  border: 2px solid #f5f4f4;
  padding: 10px;
  transition: linear 300ms;
  display: flex;
  align-items: center;
  :hover {
    box-shadow: 5px 20px 20px #f3f3f3;
  }
`;
