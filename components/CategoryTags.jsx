/* eslint-disable react/prop-types */
import React from "react";
import Link from "next/link";
import styled from "styled-components";

const CategoryTags = ({ category }) => (
  <div className="row">
    {category.map(({ name, _id }) => (
      <CategoryTagContainer key={_id}>
        <Link
          href={{
            pathname: "/category/[slug]",
            query: { slug: name, categoryId: _id },
          }}
        >
          {name}
        </Link>
      </CategoryTagContainer>
    ))}
  </div>
);

export default CategoryTags;

export const CategoryTagContainer = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #525252;
  background-color: #fff;
  border-radius: 8px;
  padding: 5px 10px;
  border: 1px solid #e5e5e5;
  margin: 10px;
  text-transform: capitalize;
`;
