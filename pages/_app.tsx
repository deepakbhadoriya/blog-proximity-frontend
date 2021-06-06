import React, { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

import AuthContextProvider from "../authentication/AuthContextProvider";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      {/* Responsive meta tag */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon.svg"></link>
      <meta name="theme-color" content="#fff" />
      {/* bootstrap CDN */}
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />
      <script
        key="1"
        src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossOrigin="anonymous"
      ></script>
      <script
        key="2"
        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossOrigin="anonymous"
      ></script>
      <script
        key="3"
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossOrigin="anonymous"
      ></script>
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
