import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import baseUrl from "../../config/baseUrl";
import { AuthContext } from "../../authentication/AuthContext";

const SignUp = () => {
  const router = useRouter();
  const { isAuthenticated, setUserLogin } = useContext(AuthContext);
  // already logged in redirect
  if (isAuthenticated) router.push("/admin/post");

  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleOnChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setUser((prevState) => ({ ...prevState, [name]: value }));

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/auth/register`, user);
      setUserLogin(res.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-sm-10 offset-md-3 offset-sm-1">
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="exampleName">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleOnChange}
                className="form-control mb-2"
                id="exampleName"
                placeholder="Enter name"
              />
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleOnChange}
                className="form-control mb-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleOnChange}
                value={user.password}
                className="form-control mb-2"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
