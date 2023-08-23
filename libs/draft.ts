import axios from 'axios'
import { config } from '~/site.config'
import { DraftResponseType } from '~/types/microCMS'

/**
 * 下書きのブログ情報を取得します。
 *
 * @param id - ブログのID
 * @param draftKey - 下書きのキー
 * @returns 下書きのレスポンスタイプを返します
 */

export const getDraftBlog = async (id: string, draftKey: string): Promise<DraftResponseType> => {
  const response = await axios.get<DraftResponseType>(`${config.baseURL}/api/draft?id=${id}&draftKey=${draftKey}`)
  return response.data
}
