import { useState } from 'react'
import { NextRouter, useRouter } from 'next/router'

export const BlogSearchForm: React.VFC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const router: NextRouter = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/blog/search?keyword=${keyword}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <button type="submit">検索</button>
    </form>
  )
}
