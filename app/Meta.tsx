import { getPosts } from "@/lib/utils";
import Head from "next/head";

async function Meta() {
  const metaData = await getPosts("meta");

  return (
    <Head>
      <title>{metaData.acf.title}</title>
      <meta name="description" content={metaData.acf.description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <script
        defer
        src="https://analytics.local.thimothe-das.fr/script.js"
        data-website-id="037aeef6-ef0d-4940-8288-1ab3da5f5a22"
      />
    </Head>
  );
}

export default Meta;
