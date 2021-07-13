import React, { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import type { AppProps } from "next/app";

import AuthContextProvider from "../authentication/AuthContextProvider";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import "../styles/bootstrap.css";
import Alert from "../components/Alert";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [alerts, setAlerts] = useState([] as any);

  // Axios Interceptor for error handling
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) console.log("log Out");
        if (error.response.status === 400) handleAPIError(error);
        return Promise.reject(error);
      }
    );
  });

  // manage alert display in alert
  const handleAPIError = (error: any) => {
    const id = uuidv4();
    const message = error.response.data.message;
    setAlerts([{ id, className: "danger", message }, ...alerts.slice(0, 2)]);
    setTimeout(() => {
      setAlerts((alert: any) => alert.filter((error: any) => error.id !== id));
    }, 3000);
  };

  return (
    <html lang="en">
      <AuthContextProvider>
        <Head />
        <Fragment>
          <Navbar />
          <Alert alerts={alerts} />
          <Component {...pageProps} />
        </Fragment>
      </AuthContextProvider>
    </html>
  );
};
export default MyApp;
