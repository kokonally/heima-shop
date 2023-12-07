import { http } from '@/utils/http'
import type { AddressItem, AddressParams } from '@/types/address'

/**
 * 新增收货地址
 * @param data 地址信息
 */
export function postMemberAddressAPI(data: AddressParams) {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

/**
 * 获取收货地址
 */
export function getMemberAddressAPI() {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })
}

//根据id查询地址详情
export function getMemberAddressByIdAPI(id: string) {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

/**
 * 修改收货地址
 * @param id 地址id
 * @param data 地址信息
 */
export function putMemberAddressByIdAPI(id: string, data: AddressParams) {
  return http({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}

/**
 * 删除收货地址
 * @param id 地址id
 */
export function deleteMemberAddressByIdAPI(id: string) {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
