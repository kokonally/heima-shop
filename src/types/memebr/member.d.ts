import type { BaseProfile } from '@/types/memebr/login'

/**
 * 个人信息 用户详情信息
 */
export type ProfileDetail = BaseProfile & {
  /** 性别 */
  gender?: Gender
  /** 生日 */
  birthday?: string
  /** 省市区 */
  fullLocation?: string
  /** 职业 */
  profession?: string
}
/** 性别 */
export type Gender = '女' | '男'

/**
 * 个人信息 修改的请求体参数
 */

export type ProfileParams = Pick<
  ProfileDetail,
  'nickname' | 'gender' | 'birthday' | 'profession'
> & {
  //省份编码
  provinceCode?: string
  //城市编码
  cityCode?: string
  //区县编码
  countyCode?: string
}

/**
 * 个人信息 修改的响应体参数
 */
export type ProfileResponse = {
  /** 个人信息 */
  profile: ProfileDetail
}

/**
 * 个人信息 头像修改的请求体参数
 */
export type AvatarParams = {
  /** 头像文件 */
  avatar: File
}
