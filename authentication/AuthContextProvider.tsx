import React, { useState, useMemo, ReactFragment } from "react";
import setAxiosHeader from "../utils/setAxiosHeader";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }: { children: ReactFragment }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const setToken = (token: string | boolean) => {
    if (token) {
      setAxiosHeader(token);
      setIsAuthenticated(true);
    } else {
      setAxiosHeader(false);
      setIsAuthenticated(false);
    }
  };

  const setUserLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const setUserLogOut = () => {
    localStorage.removeItem("token");
    setToken(false);
  };

  const loadUser = () => {
    const token = localStorage.getItem("token") || false;
    setToken(token);
    setLoading(false);
  };

  const isTokenPresent = () => {
    if (localStorage.getItem("token")) return true;
    else false;
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      loading,
      setUserLogin,
      setUserLogOut,
      isTokenPresent,
      loadUser,
    }),
    [
      isAuthenticated,
      loading,
      setUserLogin,
      setUserLogOut,
      isTokenPresent,
      loadUser,
    ]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
