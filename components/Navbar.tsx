import React, { useEffect, useContext } from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

import { AuthContext } from "../authentication/AuthContext";

const Navbar = () => {
  const { loadUser, isAuthenticated, setUserLogOut }: any =
    useContext(AuthContext);

  useEffect(() => {
    loadUser();
  });

  return (
    <>
      <NavWrapper>
        <NavContainer className="container">
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
        </NavContainer>
      </NavWrapper>
      <NavHeight />
    </>
  );
};

export default Navbar;

const NavHeight = styled.div`
  height: 100px;
`;

const NavWrapper = styled.nav`
  width: 100%;
  z-index: 101;
  position: fixed;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid #c3c3c3;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
  align-items: center;
  span {
    color: #525252;
    padding: 0px 5px;
    font-weight: 600;
  }
  div {
    a {
      color: #525252;
      padding: 0px 5px;
      font-weight: 600;
    }
  }
`;
