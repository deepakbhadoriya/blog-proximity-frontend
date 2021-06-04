import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import { PostsTS } from "../utils/tsInterfaces";

const InfiniteScrollPosts = ({
  postData: { posts, totalPosts },
  next,
}: {
  postData: PostsTS;
  next(): any;
}) => {
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={next}
      hasMore={posts.length !== parseInt(totalPosts)}
      loader={<h4>Loading...</h4>}
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
          posts.map((post) => <PostCard post={post} key={post._id} />)}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollPosts;
