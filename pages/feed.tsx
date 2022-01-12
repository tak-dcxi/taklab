import { GetServerSidePropsContext } from 'next'
import generatedRssFeed from '~/libs/feed'

const Feed = () => null

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generatedRssFeed() // フィードのXMLを生成する

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate') // 24時間キャッシュする
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {},
  }
}

export default Feed
