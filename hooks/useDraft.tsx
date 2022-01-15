import { useState, useEffect, useCallback } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { getDraftBlog } from '~/libs/draft'
import { DraftResponseType } from '~/types/microCMS'
import { ParsedUrlQuery } from 'querystring'

export const useDraft = () => {
  const router: NextRouter = useRouter()
  const [data, setData] = useState<DraftResponseType>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  const fetcher = useCallback(async (): Promise<void> => {
    const query: ParsedUrlQuery = router.query
    const data: DraftResponseType = await getDraftBlog(query.id as string, query.draftKey as string)
    setData(data)
    setLoading(false)
  }, [router.query])

  useEffect(() => {
    if (router.isReady) fetcher()
  }, [fetcher, router.isReady])

  return {
    data,
    isLoading,
  }
}
