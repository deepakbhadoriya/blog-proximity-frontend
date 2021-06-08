import React from "react";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostTS } from "../utils/tsInterfaces";

const PostCard = dynamic(() => import("./PostCard"));

const InfiniteScrollPosts = ({
  postData: { posts, totalPosts },
  next,
  className,
  onEdit,
  onDelete,
}: {
  postData: { posts: PostTS[]; totalPosts: string };
  next: any;
  className?: string;
  onEdit?: any;
  onDelete?: any;
}) => {
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={next}
      hasMore={posts.length !== parseInt(totalPosts)}
      loader={<h2>Loading...</h2>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      // below props only if you need pull down functionality
      // refreshFunction={this.refresh}
      // pullDownToRefresh
      // pullDownToRefreshThreshold={50}
      // pullDownToRefreshContent={
      //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
      // }
      // releaseToRefreshContent={
      //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
      // }
    >
      <div className="row">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <PostCard
              className={className || ""}
              post={post}
              key={post._id}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollPosts;
