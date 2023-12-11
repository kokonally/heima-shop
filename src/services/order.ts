import { http } from '@/utils/http'
import type { OrderPreResult } from '@/types/order'

/**
 * 获取订单预支付信息
 */
export function getMemberOrderPreAPI() {
  return http<OrderPreResult>({
    url: '/member/order/pre',
    method: 'get',
  })
}
