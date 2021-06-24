import React from "react";
import Link from "next/link";
import { CategoryTS } from "../utils/tsInterfaces";

const CategoryTags = ({ category }: { category: CategoryTS[] }) => (
  <div className="row">
    {category.map(({ name, _id }) => (
      <div className="categoryTagContainer" key={_id}>
        <Link
          href={{
            pathname: "/category/[slug]",
            query: { slug: name, categoryId: _id },
          }}
        >
          {name}
        </Link>
      </div>
    ))}
  </div>
);

export default CategoryTags;
