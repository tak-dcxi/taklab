import React from 'react'
import { BlogPageCommonTemplate } from '~/components/BlogPageCommonTemplate'
import { BlogArticlePageThumbnail } from '~/components/BlogArticlePageThumbnail'
import { BreadcrumbsType, SiteBreadcrumbs } from '~/components/SiteBreadcrumbs'
import { SiteHelmet } from '~/components/SiteHelmet'
import { SiteLoader } from '~/components/SiteLoader'
import { useDraft } from '~/hooks/useDraft'
import { generateOgImage } from '~/libs/generateOGP'
import { getContents } from '~/libs/microCMS'
import { CategoriesType, PostType } from '~/types/microCMS'

type PostDetailsPagePropsType = {
  post: PostType
  categories: CategoriesType[]
}

const DraftPage: React.VFC<PostDetailsPagePropsType> = ({ post, categories }) => {
  const { data, isLoading } = useDraft()

  if (isLoading || !data) return <SiteLoader />

  const thumbnail: string = data.post.thumbnail ? data.post.thumbnail.url : data.post.category.image.url

  const ogImage: string = generateOgImage(thumbnail, data.post.title)

  const breadcrumbs: BreadcrumbsType[] = [
    {
      string: 'Blog',
      path: '/blog',
    },
    {
      string: data.post.title,
    },
  ]

  return (
    <>
      <SiteHelmet title={data.post.title} image={ogImage} />
      <SiteBreadcrumbs items={breadcrumbs} />
      <BlogArticlePageThumbnail src={thumbnail} />
      <BlogPageCommonTemplate categories={categories}>
        <div
          dangerouslySetInnerHTML={{
            __html: data.post.body,
          }}
        />
      </BlogPageCommonTemplate>
    </>
  )
}

export const getStaticProps = async () => {
  const { posts, categories } = await getContents()
  return {
    props: {
      posts,
      categories,
    },
  }
}

export default DraftPage
