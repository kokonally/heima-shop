import { http } from '@/utils/http'
import type { AddressParams } from '@/types/address'

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
