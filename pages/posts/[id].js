import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData ? postData.title : '--'}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData ? postData.title : '--'}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData ? postData.date : null} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData ? postData.contentHtml : null }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}