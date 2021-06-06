import React, { useState } from "react";
import axios from "axios";

import PrivatePage from "../../../authentication/PrivatePage";
import { CategoryTagContainer } from "../../../components/CategoryTags";
import baseUrl from "../../../config/baseUrl";

const index = ({ categories }) => {
  const [name, setName] = useState("");
  const [editCatId, setEditCatId] = useState(false);
  const [localCategories, setLocalCategories] = useState(categories);

  const handleEdit = (catId, catName) => {
    setName(catName);
    setEditCatId(catId);
  };

  const getCategories = async () => {
    const res: { data: Object } = await axios.get(`${baseUrl}/category`);
    setLocalCategories(res.data);
  };

  const handleDelete = async (catId: string) => {
    await axios.delete(`${baseUrl}/category/${catId}`);
    setLocalCategories(localCategories.filter(({ _id }) => _id !== catId));
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (editCatId) {
        await axios.put(`${baseUrl}/category/${editCatId}`, { name });
        setEditCatId(false);
      } else {
        await axios.post(`${baseUrl}/category`, { name });
      }
      getCategories();
      setName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setName("");
    setEditCatId(false);
  };

  return (
    <PrivatePage>
      <div className="container">
        <div className="row">
          <div className="col-12" align="center">
            <h2>Manage your Post</h2>
          </div>
          <div className="col-md-6 col-sm-12 mb-5">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="postTitle">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={({ target: { value } }) => setName(value)}
                  className="form-control mb-2"
                  id="postTitle"
                  placeholder="Post title"
                />
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
            {localCategories.map(({ _id, name }: any) => (
              <div className="mb-3" key={_id}>
                <CategoryTagContainer>
                  {name}
                  <span
                    onClick={() => handleEdit(_id, name)}
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
                    onClick={() => handleDelete(_id, name)}
                    style={{
                      cursor: "pointer",
                      fontSize: 20,
                      marginLeft: 10,
                      color: "red",
                    }}
                  >
                    ❌
                  </span>
                </CategoryTagContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PrivatePage>
  );
};

export const getServerSideProps = async () => {
  try {
    const res: { data: Object } = await axios.get(`${baseUrl}/category`);
    return { props: { categories: res.data } };
  } catch (error) {
    return { notFound: true };
  }
};
export default index;
