import React from "react";
import Link from "next/link";
import styled from "styled-components";

const CategoryTagContainer = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #a5a5a5;
  background-color: #f9f9ff;
  border-radius: 8px;
  padding: 5px 10px;
  border: 1px solid #e5e5e5;
  margin-right: 8px;
  text-transform: capitalize;
`;

const CategoryTags = ({ category }) =>
  category.map(({ name, _id }) => (
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
  ));

export default CategoryTags;
