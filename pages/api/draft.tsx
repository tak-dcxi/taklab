import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { PostType } from '~/types/microCMS'
import { config } from '../../site.config'

const Draft = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id
  const draftKey = req.query.draftKey

  if (!id || !draftKey) res.status(400).json({ error: `missing queryparamaeter` })

  return axios
    .get<PostType>(`https://${config.serviceId}.microcms.io/api/v1/blog/${id}?draftKey=${draftKey}&depth=2`, {
      headers: { 'X-MICROCMS-API-KEY': config.apiKey },
    })
    .then(({ data }) => {
      res.status(200).json({ post: data })
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}

export default Draft
