import React, { useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { AuthContext } from "../authentication/AuthContext";

const Navbar = () => {
  const { loadUser, isAuthenticated, setUserLogOut } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  });

  return (
    <>
      <div className="navWrapper">
        <div className="container navContainer">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="Next blog"
              width={60}
              height={60}
            />
          </Link>
          {isAuthenticated ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="mx-3">
                <Link href="/admin/post"> Post</Link>
                <Link href="/admin/category"> Category</Link>
              </div>
              <div>
                <Link href="/admin/profile"> Profile</Link>
                <a href="#" onClick={setUserLogOut}>
                  LogOut
                </a>
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div></div>
              <div>
                <Link href="/auth/signup">
                  <span test-data-py="visit-signUp">SignUp</span>
                </Link>
                <Link href="/auth/login">
                  <span test-data-py="visit-login">Login</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: 100 }} />
    </>
  );
};

export default Navbar;
