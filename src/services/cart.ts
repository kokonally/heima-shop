import { http } from '@/utils/http'
import type { CartItem } from '@/types/cart'

/**
 * 添加购物车
 * @param data {skuId: string, count: number}
 */
export function postMemberCartAPI(data: { skuId: string; count: number }) {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

/**
 * 购物车列表
 */
export function getMemberCartAPI() {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}

/**
 * 删除购物车
 * @param data ids为skuid的集合
 */
export function deleteMemberCartAPI(data: { ids: string[] }) {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
}
