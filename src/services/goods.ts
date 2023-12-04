import { http } from '@/utils/http'

/**
 * 获取商品详情
 * @param id 商品id
 */
export function getGoodsByIdAPI(id: string) {
  return http({
    method: 'GET',
    url: '/goods',
    data: {
      id,
    },
  })
}
