import { http } from '@/utils/http'
import type {
  OrderCreateParams,
  OrderCreateResult,
  OrderPreResult,
  OrderResult,
} from '@/types/order'

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

/**
 * 提交订单
 * @param data
 */
export function postMemberOrderAPI(data: OrderCreateParams) {
  return http<OrderCreateResult>({
    method: 'POST',
    url: '/member/order',
    data,
  })
}

/**
 * 获取订单详情
 * @param id 订单id
 */
export const getMemberOrderByIdAPI = (id: string) => {
  return http<OrderResult>({
    method: 'GET',
    url: `/member/order/${id}`,
  })
}
