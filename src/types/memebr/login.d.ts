/**
 * 小程序登录 登录用户的信息
 */
export interface LoginResult {
  //账户名
  account: string
  //头像
  avatar: string
  //用户id
  id: number
  //手机号
  mobile: string
  //昵称
  nickname: string
  //登录凭证
  token: string
}
