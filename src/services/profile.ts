import { http } from '@/utils/http'
import type { ProfileDetail } from '@/types/memebr/member'

/**
 * 获取个人信息
 */
export function getMemberProfileAPI() {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}
