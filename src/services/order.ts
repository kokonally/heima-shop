import { http } from '@/utils/http'
import type { OrderPreResult } from '@/types/order'

/**
 * 获取订单预支付信息
 */
export function getMemberOrderPreAPI() {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre',
  })
}

/**
 * 立即购买
 */
export function getMemberOrderPreNowAPI(data: {
  skuId: string
  count: number
  addressId?: string
}) {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data,
  })
}
