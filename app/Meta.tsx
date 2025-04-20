import { getPosts } from '@/lib/utils'
import Head from 'next/head'
 
async function Meta() {
  const metaData = await getPosts("meta")

  return (
    <Head>
    <title>{metaData.acf.title}</title>
    <meta name="description" content={metaData.acf.description} />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
  </Head>
  )
}
 
export default Meta