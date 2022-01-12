const URL: string = process.env.REST_API

// REST APIの一覧を取得する件数のデフォルト設定は10件なので、URLにパラメータを付与することで取得件数を指定します(最大100)
// @see https://iwb.jp/wordpress-rest-api-json-context-url-param/
export const getPosts = async (perPage: number = 100): Promise<[]> => {
  const postsRes: Response = await fetch(`${URL}/blog?per_page=${perPage}&_embed`)
  const posts: [] = await postsRes.json()
  return posts
}

export const getPost = async (slug: string, perPage?: number): Promise<{}> => {
  const posts: [] = await getPosts(perPage)
  const postArray: string[] = posts.filter((post: { slug: string }) => post.slug === slug)
  const post: {} = postArray.length > 0 ? postArray[0] : null
  return post
}

export const getPages = async (): Promise<[]> => {
  const pagesRes: Response = await fetch(`${URL}/pages`)
  const pages: [] = await pagesRes.json()
  return pages
}

export const getPage = async (slug: string): Promise<{}> => {
  const pages: [] = await getPages()
  const pageArray: string[] = pages.filter((page: { slug: string }) => page.slug === slug)
  const page: {} = pageArray.length > 0 ? pageArray[0] : null
  return page
}

export const getEvents = async (): Promise<[]> => {
  const eventsRes: Response = await fetch(`${URL}/events`)
  const events: [] = await eventsRes.json()
  return events
}

export const getEvent = async (slug: string): Promise<{}> => {
  const events: [] = await getEvents()
  const eventArray: string[] = events.filter((event: { slug: string }) => event.slug === slug)
  const event: {} = eventArray.length > 0 ? eventArray[0] : null
  return event
}

export const getSlugs = async (type: string): Promise<{ params: { [key: string]: string } }[]> => {
  let elements: [] = []

  switch (type) {
    case 'posts':
      elements = await getPosts()
      break
    case 'pages':
      elements = await getPages()
      break
    case 'events':
      elements = await getEvents()
      break
  }

  const elementsIds = elements.map((element: { slug: string }): { params: { [key: string]: string } } => {
    return {
      params: {
        slug: element.slug,
      },
    }
  })

  return elementsIds
}

export const getMedia = async (): Promise<[]> => {
  const mediaRes: Response = await fetch(`${URL}/media`)
  const media: [] = await mediaRes.json()
  return media
}

export const getFeaturedMedia = (media: [], id: number): string => {
  const featuredMediaArray: string[] = media.filter((element: { [id: string]: number }) => element.id === id)
  return featuredMediaArray.length > 0 ? featuredMediaArray[0] : null
}
