import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="container-fluid" style={{ backgroundColor: "#efefef" }}>
      <div className="row">
        <div className="col-12 d-flex flex-row">
          <Link href="/">Home</Link>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/signup">SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
