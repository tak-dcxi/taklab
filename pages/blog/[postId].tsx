import Head from 'next/head'
import { useRouter } from 'next/router'
import { getBlogs, getBlogById, getContents } from '~/libs/microCMS'
import { BlogPageCommonTemplate } from '~/components/BlogPageCommonTemplate'
import { SiteHelmet } from '~/components/SiteHelmet'
import { SiteBreadcrumbs, BreadcrumbsType } from '~/components/SiteBreadcrumbs'
import ErrorPage from '~/pages/_error'
import { GetStaticPropsContext } from 'next'
import { generateOgImage } from '~/libs/generateOGP'
import { BlogArticlePageThumbnail } from '~/components/BlogArticlePageThumbnail'
import { CategoriesType, PostType } from '~/types/microCMS'
import { BaseCenter } from '~/components/BaseCenter'
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'
import { WysiwygArea } from '~/components/WysiwygArea'
import { HTMLParser } from '~/libs/HTMLParser'

type PostDetailsPagePropsType = {
  post: PostType
  body: string
  categories: CategoriesType[]
}

const BlogArticlePage: React.VFC<PostDetailsPagePropsType> = ({ post, body, categories }) => {
  const router = useRouter()

  if (!router.isFallback && !post?.id) return <ErrorPage statusCode={404} />

  const thumbnail: string = post.thumbnail ? post.thumbnail.url : post.category.image.url

  const ogImage: string = generateOgImage(thumbnail, post.title)

  const breadcrumbs: BreadcrumbsType[] = [
    {
      string: 'Blog',
      path: '/blog',
    },
    {
      string: post.title,
    },
  ]

  return (
    <>
      <Head>
        <script async src="https://platform.twitter.com/widgets.js"></script>
      </Head>
      <SiteHelmet title={post.title} image={ogImage} />
      <SiteBreadcrumbs items={breadcrumbs} />
      <BlogArticlePageThumbnail src={thumbnail} />
      <BlogPageCommonTemplate categories={categories}>
        <BaseCenter maxWidth={'var(--max-width-narrow)'}>
          <WysiwygArea>{body}</WysiwygArea>
        </BaseCenter>
      </BlogPageCommonTemplate>
    </>
  )
}

export async function getStaticPaths() {
  const posts = await getBlogs()
  const ids = posts.contents.map((post: PostType & MicroCMSContentId & MicroCMSDate) => {
    return { params: { postId: post.id } }
  })
  return {
    paths: ids,
    fallback: 'blocking',
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context

  if (!params?.postId) throw new Error('Error: ID not found')

  const id: string = params.postId as string

  let post: {
    body: any
    id?: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
    revisedAt?: string
    title?: string
    summary?: string
    thumbnail?: { url?: string; height?: number; width?: number }
    category?: { id: string; name: string; image: { url: string; height: number; width: number } }
  }
  let body: string
  let categories: (CategoriesType & MicroCMSContentId & MicroCMSDate)[]

  try {
    post = await getBlogById(id)
    body = HTMLParser(post.body)
    const contentData = await getContents()
    categories = contentData.categories
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      body,
      categories,
    },
    revalidate: 1,
  }
}

export default BlogArticlePage
