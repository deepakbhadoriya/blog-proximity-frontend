import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import styled from "styled-components";

const Avatar = styled.div`
  height: 50px;
  width: 50px;
  background-image: url(${(props: { src: string }) => props.src});
  background-size: cover;
  background-position: center;
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
          <Avatar src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png" />
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
