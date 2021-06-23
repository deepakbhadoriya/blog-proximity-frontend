import React from "react";
import Head from "next/head";

const Meta = ({
  title,
  keywords,
  description,
}: {
  title: string;
  keywords: string;
  description: string;
}) => {
  return (
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/assets/images/logo.png"></link>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#fff" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} key="title" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Blog build using NEXT, TS, NODE",
  keywords: "Blog, Articles, Loading, Pagination",
  description:
    "This is the blog built using latest technologies like Next, TS, Node",
};

export default Meta;
