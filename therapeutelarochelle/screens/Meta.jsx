import React from "react";
import Head from "next/head";

export default function Meta({ metaData }) {
  return (
    <Head>
      <title>{metaData.acf.title}</title>
      <meta name="description" content={metaData.acf.description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
    </Head>
  );
}
