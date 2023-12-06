import { http } from '@/utils/http'

/**
 * 小程序登录
 * @param data 请求参数
 */
export function postLoginWxMinAPI(data: loginParam) {
  return http({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

interface loginParam {
  code: string
  encryptedData: string
  iv: string
}

/**
 * 小程序内测版
 * @param phoneNumber 模拟手机号
 */
export function postLoginWxMinSimpleAPI(phoneNumber: string) {
  return http({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
