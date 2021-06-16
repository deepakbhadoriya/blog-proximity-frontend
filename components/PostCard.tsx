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
  <div
    className={className ? className : "col-lg-4 col-md-6 col-sm-12 mb-2 p-4"}
  >
    <PostCardContainer>
      <div className="row w-100">
        <div className="col-md-12 col-sm-12 mb-3">
          <Link
            href={{
              pathname: "/post/[slug]",
              query: { slug: title, postId: _id },
            }}
          >
            <Image
              className="image"
              alt={title}
              src={thumbnailUrl || "https://placeimg.com/1000/600/any"}
              test-data-py="blogPage"
              layout="responsive"
              objectFit="cover"
              height={200}
              width={200}
            />
          </Link>
        </div>
        <div className="col-md-12 col-sm-12">
          <div className="d-flex justify-content-between flex-column">
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
  width: 100%;
  border-radius: 20px;
  border: 2px solid #f5f4f4;
  padding: 12px 0;
  justify-content: center;
  transition: linear 300ms;
  display: flex;
  :hover {
    box-shadow: 5px 20px 20px #f3f3f3;
  }
`;
