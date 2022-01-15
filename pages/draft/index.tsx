import React from 'react'
import { BlogCommonTemplate } from '~/components/BlogCommonTemplate'
import { BlogDetailsThumbnail } from '~/components/BlogDetailsThumbnail'
import { BreadcrumbsType, SiteBreadcrumbs } from '~/components/SiteBreadcrumbs'
import { SiteHeadTags } from '~/components/SiteHeadTags'
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
      <SiteHeadTags title={data.post.title} image={ogImage} />
      <SiteBreadcrumbs items={breadcrumbs} />
      <BlogDetailsThumbnail src={thumbnail} alt={data.post.title} />
      <BlogCommonTemplate categories={categories}>
        <div
          dangerouslySetInnerHTML={{
            __html: data.post.body,
          }}
        />
      </BlogCommonTemplate>
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
