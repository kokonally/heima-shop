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

/**
 * 根据skuId修改购物车
 * @param skuId
 * @param data
 */
export function putMemberCartBySkuId(skuId: string, data: { selected?: boolean; count?: number }) {
  http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}

/**
 * 购物车全选/取消全选
 * @param data selected 是否选中
 */
export const putMemberCartSelectedAPI = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
