import { http } from '@/utils/http'
import type { GoodsResult } from '@/types/goods'

/**
 * 获取商品详情
 * @param id 商品id
 */
export function getGoodsByIdAPI(id: string) {
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: {
      id,
    },
  })
}
