import React, { useEffect, useContext } from "react";
import Link from "next/link";

import { AuthContext } from "../authentication/AuthContext";

const Navbar = () => {
  const { loadUser, isAuthenticated, setUserLogOut }: any =
    useContext(AuthContext);

  useEffect(() => {
    loadUser();
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light px-5 mb-5"
      style={{ zIndex: 100 }}
    >
      <div className="navbar-nav mr-auto d-flex flex-row " align="center">
        <div className="nav-item active">
          <span className="nav-link mx-1">
            <Link href="/">Home</Link>
          </span>
        </div>
        {isAuthenticated ? (
          <>
            <div className="nav-item">
              <span className="nav-link mx-1">
                <Link href="/admin/post"> Manage Post</Link>
              </span>
            </div>
            <div className="nav-item">
              <span className="nav-link mx-1">
                <Link href="/admin/category"> Manage Category</Link>
              </span>
            </div>
            <div className="nav-item">
              <span className="nav-link mx-1" onClick={setUserLogOut}>
                LogOut
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="nav-item">
              <span className="nav-link mx-1">
                <Link href="/auth/signup">SignUp</Link>
              </span>
            </div>
            <div className="nav-item">
              <span className="nav-link mx-1">
                <Link href="/auth/login">Login</Link>
              </span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
