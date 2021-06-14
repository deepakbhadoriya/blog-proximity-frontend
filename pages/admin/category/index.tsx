import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import { CategoryTagContainer } from "../../../components/CategoryTags";
import baseUrl from "../../../config/baseUrl";
import { CategoryTS } from "../../../utils/tsInterfaces";

const PrivatePage = dynamic(
  () => import("../../../authentication/PrivatePage")
);

const index = () => {
  const categoryInitial = { name: "", scrollType: "infiniteScroll" };
  const [category, setCategory] = useState(categoryInitial);
  const [editCatId, setEditCatId] = useState(false as Boolean | string);
  const [localCategories, setLocalCategories] = useState([] as CategoryTS[]);

  const handleEdit = (catId: string, catName: string, scrollType: string) => {
    setCategory({ name: catName, scrollType });
    setEditCatId(catId);
  };

  const getCategories = async () => {
    const res: { data: CategoryTS[] } = await axios.get(
      `${baseUrl}/category/user`
    );
    setLocalCategories(res.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleDelete = async (catId: string) => {
    await axios.delete(`${baseUrl}/category/${catId}`);
    setLocalCategories(localCategories.filter(({ _id }) => _id !== catId));
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (editCatId) {
        await axios.put(`${baseUrl}/category/${editCatId}`, category);
      } else {
        await axios.post(`${baseUrl}/category`, category);
      }
      getCategories();
      handleReset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setCategory(categoryInitial);
    setEditCatId(false);
  };

  const handleChange = ({ target: { value, name } }: any) => {
    setCategory({ ...category, [name]: value });
  };

  return (
    <PrivatePage>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">Manage your Post</h2>
          </div>
          <div className="col-md-6 col-sm-12 mb-5">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="postTitle">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={category.name}
                  onChange={handleChange}
                  className="form-control mb-2"
                  id="postTitle"
                  placeholder="Category name"
                />
                <label>Category Scroll type</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="scrollType"
                    value="infiniteScroll"
                    id="flexRadioDefault1"
                    checked={category.scrollType === "infiniteScroll"}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Infinite Scroll
                  </label>
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="scrollType"
                    value="pagination"
                    id="flexRadioDefault2"
                    checked={category.scrollType === "pagination"}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Pagination
                  </label>
                </div>

                <button type="submit" className="btn btn-primary">
                  {editCatId ? "Update Category" : "Add Category"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mx-3"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 col-sm-12 mb-5">
            <h4>Your Categories</h4>
            {localCategories.map(({ _id, name, scrollType }: any) => (
              <div className="mb-3" key={_id}>
                <CategoryTagContainer className="d-flex justify-content-between w-100 ">
                  <div>
                    {name}
                    <br />
                    <small>Scroll type: {scrollType}</small>
                  </div>
                  <div>
                    <span
                      onClick={() => handleEdit(_id, name, scrollType)}
                      style={{
                        cursor: "pointer",
                        fontSize: 20,
                        marginLeft: 10,
                        color: "blue",
                      }}
                    >
                      ✎
                    </span>
                    <span
                      onClick={() => handleDelete(_id)}
                      style={{
                        cursor: "pointer",
                        fontSize: 20,
                        marginLeft: 10,
                        color: "red",
                      }}
                    >
                      ❌
                    </span>
                  </div>
                </CategoryTagContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PrivatePage>
  );
};

export default index;
