import React from "react";
import Head from "next/head";

const fallback = () => (
  <>
    <Head>
      <title>next-pwa example</title>
    </Head>
    <div className="container">
      <h1>This is offline fallback page</h1>
      <h2>When offline, any route will fallback to this page</h2>
    </div>
  </>
);

export default fallback;
