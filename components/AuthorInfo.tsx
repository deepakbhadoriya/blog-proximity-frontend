import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import styled from "styled-components";
import Image from "next/image";
import { UserTS } from "../utils/tsInterfaces";

const AuthorInfo = ({
  user,
  createdAt,
}: {
  user: UserTS;
  createdAt?: string;
}) => {
  return (
    <Link
      href={{
        pathname: "/author/[slug]",
        query: { slug: user.name, authorId: user._id },
      }}
    >
      <div className="d-flex">
        <div className="pr-3">
          <Image
            className="avatarImage"
            alt="userPic"
            src={user.avatar ? user.avatar : "/assets/images/profilePic.png"}
            objectFit="cover"
            height={50}
            width={50}
          />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <AuthorName> {user.name}</AuthorName>
          {createdAt && (
            <Time>{dayjs(createdAt).format("MMM DD, YYYY ")} </Time>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AuthorInfo;

const AuthorName = styled.div`
  font-weight: 800;
  text-transform: capitalize;
  font-size: 18px;
  margin-bottom: 3px;
`;

const Time = styled.div`
  font-size: 14px;
  color: #525252;
  font-weight: 450;
  font-size: 14px;
`;
