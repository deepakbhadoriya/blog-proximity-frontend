import React from "react";
import dynamic from "next/dynamic";
import ReactPaginate from "react-paginate";
import { PostTS } from "../utils/tsInterfaces";

const PostCard = dynamic(() => import("./PostCard"));

const PaginationPosts = ({
  postData: { posts, totalPages },
  handlePagination,
  className,
  onEdit,
  onDelete,
}: {
  postData: { posts: PostTS[]; totalPages: string };
  handlePagination: any;
  className?: string;
  onEdit?: any;
  onDelete?: any;
}) => {
  return (
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
      <div className="col-12">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={parseInt(totalPages)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePagination}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          // subContainerClassName={""}
          activeClassName={"active"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          disabledClassName={"disabled"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
        />
      </div>
    </div>
  );
};

export default PaginationPosts;
