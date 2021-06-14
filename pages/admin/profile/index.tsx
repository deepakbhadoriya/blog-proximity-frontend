import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import baseUrl from "../../../config/baseUrl";
import { UserTS } from "../../../utils/tsInterfaces";

const PrivatePage = dynamic(
  () => import("../../../authentication/PrivatePage")
);
const AuthorInfo = dynamic(() => import("../../../components/AuthorInfo"));

const index = () => {
  const initialUser = {
    avatar: "",
    name: "",
    email: "",
    bio: "",
  };
  const [user, setUser] = useState(initialUser as UserTS);

  const getUser = async () => {
    const {
      data: { avatar, name, email, bio },
    }: { data: UserTS } = await axios.get(`${baseUrl}/profile`);
    setUser({ avatar, name, email, bio });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put(`${baseUrl}/profile`, user);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ target: { value, name } }: any) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <PrivatePage>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">Manage your Profile</h2>
          </div>
          <div className="col-md-6 col-sm-12 mb-5">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="postTitle"> Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="form-control mb-2"
                  id="postTitle"
                  placeholder="User name"
                />
                <label htmlFor="postTitle">Name</label>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="form-control mb-2"
                  id="postTitle"
                  placeholder="User email"
                />
                <label htmlFor="postTitle">Avatar</label>
                <input
                  type="text"
                  name="avatar"
                  value={user.avatar}
                  onChange={handleChange}
                  className="form-control mb-2"
                  id="postTitle"
                  placeholder="User Avatar"
                />
                <label htmlFor="postTitle">Bio</label>
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  className="form-control mb-2"
                  id="postTitle"
                  placeholder="User Avatar"
                />
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 col-sm-12 mb-5">
            <h4>Your Profile</h4>
            <AuthorInfo user={user} />
            Email : {user.email}
            <br />
            Bio : {user.bio}
          </div>
        </div>
      </div>
    </PrivatePage>
  );
};

export default index;
