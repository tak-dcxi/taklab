import axios from 'axios'
import { config } from '~/site.config'
import { DraftResponseType } from '~/types/microCMS'

export const getDraftBlog = async (id: string, draftKey: string): Promise<DraftResponseType> => {
  const response = await axios.get<DraftResponseType>(`${config.baseURL}/api/draft?id=${id}&draftKey=${draftKey}`)
  return response.data
}
