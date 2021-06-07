import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import styled from "styled-components";
import Image from "next/image";

const AuthorInfo = ({
  user,
  createdAt,
}: {
  user: { name: string; _id: string };
  createdAt: string;
}) => {
  return (
    <Link
      href={{
        pathname: "/author/[slug]",
        query: { slug: user.name, authorId: user._id },
      }}
    >
      <div className="d-flex">
        <div>
          <Avatar
            alt="userPic"
            src="/assets/images/profilePic.png"
            height={50}
            width={50}
          />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <AuthorName> {user.name}</AuthorName>
          <Time>{dayjs(createdAt).format("MMM DD, YYYY ")} </Time>
        </div>
      </div>
    </Link>
  );
};

export default AuthorInfo;

const Avatar = styled(Image)`
  border-radius: 25px;
  margin-right: 10px;
`;

const AuthorName = styled.div`
  font-weight: 800;
  text-transform: capitalize;
  font-size: 18px;
  margin-bottom: 3px;
`;

const Time = styled.div`
  font-size: 14px;
  color: #a5a5a5;
  font-weight: 450;
  font-size: 14px;
`;
