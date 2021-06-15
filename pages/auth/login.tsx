import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import baseUrl from "../../config/baseUrl";
import { AuthContext } from "../../authentication/AuthContext";

const Login = () => {
  const router = useRouter();
  const { isAuthenticated, setUserLogin }: any = useContext(AuthContext);
  // already logged in redirect
  if (isAuthenticated) router.push("/admin/post");

  const [user, setUser] = useState({ email: "", password: "" });

  const handleOnChange = ({ target: { value, name } }: any) =>
    setUser((prevState) => ({ ...prevState, [name]: value }));

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, user);
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
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleOnChange}
                className="form-control"
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
                className="form-control"
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
export default Login;
