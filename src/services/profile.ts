import { http } from '@/utils/http'
import type { ProfileDetail, ProfileParams } from '@/types/memebr/member'

/**
 * 获取个人信息
 */
export function getMemberProfileAPI() {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}

/**
 * 修改个人信息
 * @param data 请求参数
 */
export function putMemberProfileAPI(data: ProfileParams) {
  return http<ProfileDetail>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
