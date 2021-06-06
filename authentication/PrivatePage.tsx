import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthContext";

const PrivatePage = ({ children }: any) => {
  const router = useRouter();
  const { isAuthenticated, loading }: any = useContext(AuthContext);

  if (!isAuthenticated && !loading) router.push("/");

  if (isAuthenticated && !loading) return children;

  return (
    <div className="d-flex justify-content-center align-content-center">
      <h3>Loading...</h3>
    </div>
  );
};

export default PrivatePage;
