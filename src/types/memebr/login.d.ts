export type BaseProfile = {
  /** 用户ID */
  id: number
  /** 头像  */
  avatar: string
  /** 账户名  */
  account: string
  /** 昵称 */
  nickname?: string
}

/**
 * 小程序登录 登录用户的信息
 */
export type LoginResult = BaseProfile & {
  //手机号
  mobile: string
  //登录凭证
  token: string
}
