import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
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
          <div className="authorName"> {user.name}</div>
          {createdAt && (
            <div className="time">
              {dayjs(createdAt).format("MMM DD, YYYY ")}{" "}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AuthorInfo;
