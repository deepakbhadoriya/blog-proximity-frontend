import React, { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

import AuthContextProvider from "../authentication/AuthContextProvider";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Blog build using NEXT, TS, NODE,</title>
      <meta
        property="og:title"
        content="Blog build using NEXT, TS, NODE,"
        key="blog"
      />
      <meta
        name="description"
        content="This is MERN stack blog app fontent is build using NEXTJS, TS and it is also a PWA and Backend is build in NODE, TYPESCRIPT, MONGODB"
      />
      {/* Responsive meta tag */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon.svg"></link>
      <meta name="theme-color" content="#fff" />
    </Head>
    <AuthContextProvider>
      <Fragment>
        <Navbar />
        <Component {...pageProps} />
      </Fragment>
    </AuthContextProvider>
  </>
);
export default MyApp;
