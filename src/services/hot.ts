import { http } from '@/utils/http'
import type { PageParams, PageResult } from '@/types/global'
import type { HotResult } from '@/types/hot'

/**
 * 获取热门推荐
 * @param url 请求地址
 * @param data 请求参数
 */
export const getHotRecommendAPI = (url: string, data?: PageParams & { subType?: string }) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
